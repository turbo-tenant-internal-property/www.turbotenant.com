// Example serverless handler for /api/create-listing
// Node.js (Vercel/Netlify/Express) — verifies Firebase token, creates HubSpot contact, returns listingId

const { getAuth } = require('firebase-admin/auth');
const admin = require('firebase-admin');
const fetch = require('node-fetch');

// Initialize Firebase Admin SDK (set GOOGLE_APPLICATION_CREDENTIALS env var)
if (!admin.apps.length) {
  admin.initializeApp();
}

// HubSpot API key (set as env var, never commit to repo)
const HUBSPOT_API_KEY = process.env.HUBSPOT_API_KEY;
const HUBSPOT_API_BASE = 'https://api.hubapi.com';

async function verifyFirebaseToken(idToken) {
  try {
    const decoded = await getAuth().verifyIdToken(idToken);
    return decoded;
  } catch (e) {
    throw new Error('Invalid Firebase token');
  }
}

async function createHubSpotContact(payload) {
  // Minimal example: create contact in HubSpot
  const url = `${HUBSPOT_API_BASE}/crm/v3/objects/contacts`;
  const res = await fetch(url + `?hapikey=${HUBSPOT_API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      properties: {
        email: payload.ownerEmail,
        firstname: payload.ownerName,
        phone: payload.phone,
        address: payload.propertyAddress,
        citystatezip: payload.cityStateZip,
        propertytype: payload.propertyType,
        rent: payload.rent,
        availabledate: payload.availableDate
      }
    })
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error('HubSpot error: ' + err);
  }
  const data = await res.json();
  return data.id || data.objectId || 'HS-' + Math.floor(Math.random()*1000000);
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });
  const idToken = req.headers.authorization?.replace('Bearer ', '');
  if (!idToken) return res.status(401).json({ message: 'Missing auth token' });
  let user;
  try {
    user = await verifyFirebaseToken(idToken);
  } catch (e) {
    return res.status(401).json({ message: e.message });
  }
  const payload = req.body;
  if (!payload || !payload.ownerEmail || !payload.ownerName) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  // Create contact in HubSpot
  let listingId;
  try {
    listingId = await createHubSpotContact(payload);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
  // TODO: trigger property.verification_requested webhook here if needed
  return res.status(200).json({ listingId });
};

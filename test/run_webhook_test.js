// Simple test runner to POST a sample webhook event to the local webhook consumer
const http = require('http');

async function run() {
  const payload = JSON.stringify({
    event: 'property.verification_requested',
    property_id: 'PRT-TEST-0001',
    owner_email: 'owner@example.com',
    due_by: new Date(Date.now() + 24 * 3600 * 1000).toISOString()
  });

  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/webhooks/property-events',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(payload)
    }
  };

  const req = http.request(options, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      console.log('Response status:', res.statusCode);
      console.log('Response body:', data);
      process.exit(res.statusCode === 200 ? 0 : 2);
    });
  });

  req.on('error', (err) => {
    console.error('Request error', err);
    process.exit(3);
  });

  req.write(payload);
  req.end();
}

run();

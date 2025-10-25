const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.json());

// Simple in-memory store and persistent log for received events
const STORAGE_DIR = path.join(__dirname, '../../.data');
if (!fs.existsSync(STORAGE_DIR)) fs.mkdirSync(STORAGE_DIR, { recursive: true });
const EVENTS_LOG = path.join(STORAGE_DIR, 'property_events.log');

function logEvent(ev) {
  try {
    const line = `${new Date().toISOString()} ${JSON.stringify(ev)}\n`;
    fs.appendFileSync(EVENTS_LOG, line);
  } catch (e) { console.warn('Failed to log event', e); }
}

app.post('/webhooks/property-events', (req, res) => {
  const ev = req.body;
  if (!ev || !ev.event || !ev.property_id) {
    return res.status(400).json({ error: 'invalid_payload', message: 'event and property_id required' });
  }

  // Basic handler: write to log, optionally enqueue for tasking system
  logEvent(ev);

  // Simulate enqueueing a manager task (placeholder)
  console.log('Enqueued verification task for', ev.property_id, 'event=', ev.event);

  res.json({ received: true, property_id: ev.property_id });
});

// Health and quick debug
app.get('/health', (req, res) => res.json({ status: 'ok', now: new Date().toISOString() }));

app.listen(PORT, () => console.log(`Webhook consumer listening on http://localhost:${PORT}`));

module.exports = app;

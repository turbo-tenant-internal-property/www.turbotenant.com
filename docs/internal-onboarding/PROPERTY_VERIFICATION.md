# Property Verification Workflow — Managers

This document specifies the verification workflow used to validate ownership and activate properties in VivaTurbo’s internal platform. It includes the API contract, webhook examples, and minimal smoke tests for operations.

## High-level flow

1. Owner submits property information through onboarding form.
2. System creates a property record with `onboarding_status: pending`.
3. Platform triggers verification task assigned to a property manager.
4. Manager verifies ownership (document upload / owner confirmation) and marks property as `verified` or `rejected`.
5. When `verified`, system publishes listing and notifies the owner via configured inbox.

## API contract (example)

- Create property / onboarding (POST)

  Endpoint: `/api/properties/onboard`
  Request body (JSON):

  {
    "owner_email": "john@example.com",
    "owner_name": "John Doe",
    "property_address": {
      "street": "123 Main St",
      "city": "Anytown",
      "state": "NY",
      "zip": "10001"
    },
    "documents": [ /* signed docs / proof */ ],
    "source": "onboarding_form"
  }

  Response (201):
  {
    "property_id": "PRT-xxxxx",
    "onboarding_status": "pending",
    "assigned_manager": "mgr-123"
  }

- Verification update (PATCH)

  Endpoint: `/api/properties/{property_id}/verification`
  Request body:
  {
    "status": "verified", // or "rejected"
    "verified_by": "manager@example.com",
    "notes": "Ownership docs verified"
  }

  Response (200):
  { "property_id": "PRT-xxxxx", "onboarding_status": "verified" }

## Webhook (manager notification)

When a property moves to `pending` the platform should generate a webhook event to the manager queue:

Event payload example:

{
  "event": "property.verification_requested",
  "property_id": "PRT-xxxxx",
  "owner_email": "john@example.com",
  "due_by": "2025-10-30T00:00:00Z"
}

Consume this webhook in your tasking/notification system (Slack, email, or manager dashboard) and provide links to the property record and attachments.

## Minimal verification webhook consumer (Node/Express example)

```js
const express = require('express');
const app = express();
app.use(express.json());

app.post('/webhooks/property-events', (req, res) => {
  const ev = req.body;
  if (ev.event === 'property.verification_requested') {
    // Enqueue a task for the assigned manager (pseudo)
    console.log('New verification task for', ev.property_id);
    // TODO: integrate with tasking system or HubSpot owner assignment
  }
  res.sendStatus(200);
});

app.listen(3000);
```

## Smoke tests

1. POST a sample `/api/properties/onboard` payload and verify response contains `onboarding_status: pending`.
2. Trigger a webhook `property.verification_requested` and confirm the manager receives a notification in the manager tasking system.
3. PATCH `/api/properties/{id}/verification` to `verified` and confirm the property becomes public and owner receives an email.

## Edge cases

- Missing documents: mark `onboarding_status: docs_required` and notify owner.
- Duplicate properties: detect via address normalization and surface to managers for merge.

---
Document maintained by Product & Platform. Update API endpoints to match backend router and auth mechanisms.

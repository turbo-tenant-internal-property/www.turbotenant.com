# 🧩 rental-turbotenant-owner-property-create-get-lead-sycn

## 📘 Purpose
This workflow automates lead synchronization between **TurboTenant**, **HubSpot**, and the **VivaTurbo landlord dashboard** whenever a property or lead record is created or updated.

---

## ⚙️ Trigger Events
- `property_created`
- `property_updated`
- `lead_created`

---

## 🧠 Actions

### 1. Fetch Landlord Profile
```http
GET /api/landlords/{landlord_id}
```

### 2. Fetch Property Data
```http
GET /api/properties/{property_id}
```

### 3. Create or Update Contact in HubSpot
```http
POST /hubspot/crm/v3/objects/contacts
```

### 4. Create or Update Deal or Lead Record
```http
POST /hubspot/crm/v3/objects/deals
```

### 5. Sync Metadata to Stripe (optional)
```http
POST /stripe/customers/{id}/metadata
```

---

## 🧾 Data Mapping

| **Field** | **HubSpot Property** | **Source (TurboTenant / VivaTurbo)** |
|------------|----------------------|--------------------------------------|
| email | `email` | landlord.email |
| phone | `phone` | landlord.phone |
| firstName | `firstname` | landlord.first_name |
| lastName | `lastname` | landlord.last_name |
| propertyTitle | `property_title` | property.title |
| propertyType | `property_type` | property.type |
| monthlyRent | `monthly_rent` | property.rent |
| streetAddress | `address` | property.address.street |
| city | `city` | property.address.city |
| state | `state` | property.address.state |
| postalCode | `zip` | property.address.zip |
| source | `lead_source` | metadata.utm_source |
| utm_medium | `utm_medium` | metadata.utm_medium |
| utm_campaign | `utm_campaign` | metadata.utm_campaign |
| created_at | `created_date` | event.timestamp |
| platform_source | `platform_source` | metadata.platform_source |

---

## 🧩 Metadata Block
```json
{
  "hubspot_contact_id": "{{hubspot.contact_id}}",
  "turbotenant_listing_id": "{{property.id}}",
  "platform_source": "viviaturbo.live",
  "utm_source": "connectlinx",
  "utm_medium": "form",
  "utm_campaign": "landlord_property_onboarding",
  "onboarding_stage": "verified"
}
```

---

## ✅ Response / Sync Confirmation

**Success Example:**
```json
{
  "status": "success",
  "hubspot_contact_id": "hs_001a7b23",
  "hubspot_deal_id": "deal_10293",
  "property_id": "PROP_1001",
  "synced_at": "2025-10-12T21:53:00Z"
}
```

**Error Example:**
```json
{
  "status": "error",
  "message": "Missing property ID or invalid HubSpot API key."
}
```

---

## 💡 Best Practices
- Schedule background sync every 15 minutes for redundancy.
- Include `created_by` or `managed_by` fields for property manager attribution.
- Maintain consistent metadata keys across systems.
- Exclude sensitive tenant details from shared metadata for compliance.

---

**Author:** VivaTurbo Rentals and Property Services  
**Version:** 1.0  
**Date:** 2025-10-12

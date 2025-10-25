# 🏠 Landlord Onboarding & Rental Signup  
**Branch:** `landlord-onboard-rental-signup`  
**Repository:** `rental.turbotenant.com`  

This branch introduces the landlord onboarding workflow and rental signup system for VivaTurbo Rentals & Property Services, designed to make listing, verifying, and managing rental properties seamless.

---

## 🚀 Overview

The **Landlord Onboard & Rental Signup** feature enables property owners to:
- Create and verify their landlord accounts.  
- Add rental property details (address, rent, deposit, amenities, etc.).  
- Upload documents (ID, lease agreements, proof of ownership).  
- Sign and submit rental agreements digitally.  
- Manage tenants and applications through a single dashboard.

---

## 🧭 Workflow

### 1. **Account Setup**
- Go to [https://rental.turbotenant.com/home](https://rental.turbotenant.com/home)  
- Select **Landlord Signup** and provide your details:
  - Full Name  
  - Business Email  
  - Property Address  
  - Bank Deposit Info (for rent payouts)

### 2. **Property Listing**
- Enter property information:
  - Street Address, Unit, City, State, ZIP  
  - Rent amount and Security Deposit  
  - Upload property images  
- Preview your listing before publishing.

### 3. **Verification & Activation**
- VivaTurbo team verifies ownership within 24–48 hours.  
- Once approved, your listing goes live across partnered rental platforms.

### 4. **Tenant Management**
- View applications, approve tenants, and generate electronic leases.  
- Accept rent payments and deposits directly from your dashboard.  
- Assign property manager (e.g. David Wright) for communication and maintenance.

---

## 🧩 API Integration

For developers connecting through **Connectlinx** or **HubSpot CRM**, use the following fields:

| Field Name | Description | Example |
|-------------|--------------|----------|
| `landlord_id` | Unique landlord identifier | `LND-10284` |
| `property_id` | Associated property record | `PRT-22170` |
| `onboarding_status` | Verification state | `pending`, `verified`, `rejected` |
| `created_by` | Account email | `john@turbotenant.com` |

---

## 📧 Support

For onboarding or verification assistance, contact:  
**Email:** [support@147061670.eu1.r.hubspot-inbox.com](mailto:support@147061670.eu1.r.hubspot-inbox.com)  
**Website:** [https://rental.turbotenant.com](https://rental.turbotenant.com)

---

## 📜 Commit Info

**Commit Message:**  
`Update README.md for landlord onboarding and rental signup`

**Branch:**  
`landlord-onboard-rental-signup`

---

© 2025 VivaTurbo Rentals and Property Services.  
All rights reserved.

## Internal onboarding and ops

This repository contains the landlord onboarding front-end and supporting guidance for VivaTurbo Rentals. Internal setup artifacts are under `docs/internal-onboarding/` and include:

- `DOMAIN_EMAIL_SETUP.md` — DNS, MX, SPF/DKIM and HubSpot inbox routing steps for `rental.turbotenant.com`.
- `PROPERTY_VERIFICATION.md` — API contract and webhook examples to enable property verification workflows for managers.
- `ANALYTICS_TRACKING.md` — guidance for GTM, HubSpot, and GA4 insertion and consent considerations.

If you're preparing to launch the VivaTurbo internal property onboarding milestone, follow the docs in that folder for DNS changes, email verification, and analytics activation. After DNS propagation and SSL issuance, confirm tracking scripts are present and run the verification smoke tests listed in `PROPERTY_VERIFICATION.md`.

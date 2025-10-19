# TurboTenant Rental Property Advertising

## Overview
This pull request includes updates to the TurboTenant rental property advertising workflow. It ensures seamless onboarding for landlords and property managers, integrates Stripe payments, and updates property listing automation.

## Updates Included
- **Property Listing URLs & Landing Pages**  
  Updated all relevant TurboTenant URLs for property listings and advertising.

- **Stripe Payment Integration**  
  Configured Stripe payment links for property listing activation with metadata mapping for dashboard automation.

- **Metadata Mapping**  
  Added key-value pairs for HubSpot, dashboard, and Stripe integration:
  - `business_name`: VivaTurbo Rentals
  - `dba_name`: VivaTurbo Rentals and Property Services
  - `website_url`: https://rental-turbotenant-147061670.hs-sites-eu1.com/home
  - `support_email`: support@147061670.eu1.r.hubspot-inbox.com
  - `support_phone`: (478) 751-8904
  - `domain`: turbotenant.com
  - `subdomain`: rental.turbotenant.com
  - `hubspot_lead_id`: {{hubspot_lead_id}}
  - `stripe_acct_id`: acct_1SGBQr5X3GiReRgQ
  - `gtm_id`: GTM-NDVJNCT8-MZE1M

- **Onboarding Flow Enhancements**  
  Improved the landlord signup process, property creation, and automated notifications.

- **Bug Fixes & Redirect Updates**  
  Fixed authentication and redirect issues to ensure a smooth property listing experience.

## Usage
1. Verify property listing URLs and payment links.
2. Confirm metadata is correctly feeding into HubSpot and internal dashboards.
3. Test Stripe payment flow for one-off and recurring listing activations.
4. Review email notifications and automated onboarding messages.
5. Ensure redirects post-payment are functioning as expected.

## Links
- [TurboTenant Dashboard](https://rental.turbotenant.com/auth/login)
- [Stripe Onboarding & Dashboard](https://dashboard.stripe.com/acct_1SHfo0CtIteJsqww/account/onboarding)
- [Landing Page Redirect](https://rental-turbotenant-147061670.hs-sites-eu1.r.hubspot-inbox.com)

---

*This file is intended to accompany Pull Request #13: `rental.turbotenant.com` branch merge.*


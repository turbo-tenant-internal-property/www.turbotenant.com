# Analytics & Tracking — Guidance

This file documents where analytics scripts are loaded and how to configure GTM, HubSpot, and GA in the onboarding site.

## Configuration

The site exposes a simple config object at `window.__TT_ONBOARDING` in `index.html`. Values to set:

- `gtmId` — Google Tag Manager container ID (e.g. `GTM-XXXX`)
- `hubspotPortalId` — HubSpot portal/portalId (e.g. `147061670`)
- `gaMeasurementId` — Google Analytics 4 measurement ID (e.g. `G-XXXXXX`)

Edit `index.html` head or set these via your deployment pipeline / runtime config.

## What the loader does

- Loads GTM script asynchronously when hostname contains `rental.turbotenant.com`.
- Loads HubSpot tracking snippet for the configured portal ID.
- Optionally loads GA4 gtag if `gaMeasurementId` is present.

## Consent & privacy

Before loading tracking scripts in production, ensure compliance with user consent policies and GDPR/CCPA where required. Consider implementing a consent banner that toggles `window.__TT_ONBOARDING.allowTracking = true` before invoking the loader.

## Debugging

1. Open the site and confirm the network tab shows requests to `googletagmanager.com` and `js.hs-scripts.com`.
2. In GTM preview mode, confirm tags fire on the onboarding pages.
3. Use HubSpot’s debugging tools to check that the portal ID is receiving events.

## Adding additional trackers

Place any small vendor snippets into the loader in `index.html` and gate them behind the same hostname and consent checks.

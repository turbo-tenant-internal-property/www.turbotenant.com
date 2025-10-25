# Ops & PR Checklist — Prepare changes for deployment

Follow this checklist when creating a branch/PR and preparing Ops to apply DNS, email, and tracking changes for `rental.turbotenant.com`.

## Branch & PR

- Branch name: `feature/internal-onboarding-webhook` (or similar descriptive name)
- Include the following files in the PR:
  - `config/rental.turbotenant.com.json` (DNS template & IDs)
  - `index.html` (analytics loader changes)
  - `docs/internal-onboarding/*` (domain, verification, analytics docs)
  - `services/webhook/*` (webhook consumer)
  - `scripts/import_metadata.js` (import helper)
  - `package.json` (dev scripts)

## PR description (include):
- Purpose of the change and high-level summary.
- DNS records required (CNAME target placeholder must be replaced with hosting target).
- HubSpot portal id and support inbox alias.
- Steps to test in staging and prod (health check, curl POST, tracking verification).

## Ops tasks (to run after PR is merged)

1. Apply DNS CNAME for `rental.turbotenant.com` to the hosting provider target.
2. Configure MX / SPF / DKIM for `turbotenant.com` per `DOMAIN_EMAIL_SETUP.md`.
3. Confirm TLS certificate issuance and that https://rental.turbotenant.com loads.
4. Deploy static site assets (if hosting requires build step) and ensure `index.html` contains the correct GTM & portal IDs or set env substitution.
5. Run smoke tests:
   - Health: GET https://rental.turbotenant.com/health or / (if health exists)
   - Webhook smoke: start webhook consumer (if self-hosted) and run a test POST.

## Rollback
- If DNS changes cause issues, revert DNS entries to previous values and notify stakeholders. Keep a record of previous TTLs and entries.

## Post-deploy verification
- Confirm GTM tags fire in GTM preview mode.
- Confirm HubSpot receives events and inbound email flows to the configured Inbox.
- Confirm property verification webhook events are being created by backend and consumed by the webhook endpoint.

# Domain & Email Routing — rental.turbotenant.com

This document provides the DNS and email-routing steps required to connect VivaTurbo Rentals' subdomain `rental.turbotenant.com` and ensure inbound/outbound email routing for onboarding flows and support inboxes.

> Assumption: Primary domain `turbotenant.com` is managed by DNS admins. Ops/Platform will apply changes and verify propagation.

## Required DNS records

- Subdomain (CNAME)
  - Host: `rental`
  - Type: `CNAME`
  - Value: `hosting-platform.example.net.` (replace with actual hosting provider target — e.g. Netlify/Cloudflare Pages/Amplify)
  - TTL: 3600

- Root / Apex (optional) — if you want `www` or root redirect
  - Host: `www` -> CNAME to same hosting target
  - Or A record(s) for root if provider requires

- SSL: Ensure platform issues an automated TLS certificate (via Let’s Encrypt or provider-managed). Verify HTTPS after DNS propagation.

## Email routing (support & inbox)

We use an inbox address configured in HubSpot: `support@147061670.eu1.r.hubspot-inbox.com` (current value in onboarding form). Typically HubSpot provides an inbound alias; verify in HubSpot > Conversations > Inbox > Inboxes & Routing.

### Recommended MX / SPF / DKIM

1. MX records (set per email provider if you host a domain mailbox):
   - Prefer provider-specified MX entries (e.g., Google Workspace, Microsoft 365)

2. SPF (TXT record)
   - Example: `v=spf1 include:spf.protection.outlook.com include:servers.mcsv.net -all`
   - Adjust includes to match the sending services (HubSpot, SendGrid, Mailgun, etc.)

3. DKIM
   - For HubSpot and other providers, follow vendor instructions to generate DKIM keys and add the TXT record.
   - Example label: `hs._domainkey` with the DKIM public key value the vendor provides.

4. DMARC (optional but recommended)
   - Record: `_dmarc.turbotenant.com` (TXT)
   - Example: `v=DMARC1; p=quarantine; rua=mailto:dmarc-reports@turbotenant.com; pct=100;` (adjust policy as needed)

## HubSpot-specific steps

1. In HubSpot, confirm portal ID and Inbox configuration. Portal ID used by the site: `147061670`.
2. Confirm forwarding addresses (if using an external support inbox) and set routing rules.
3. Verify the tracking script appears on the site after DNS/SSL checks.

## Testing & verification

1. After DNS changes, use `dig` / `nslookup` to confirm CNAME/A and MX propagation.
2. Open the site at `https://rental.turbotenant.com` and confirm TLS certificate is valid.
3. Verify HubSpot inbound emails arrive at expected Inbox (send a test email).
4. Confirm SPF/DKIM pass for a test message via an external mailbox (e.g., Gmail shows authentication results).

## Rollback plan

If an immediate issue occurs after DNS changes, revert the DNS entries to previous values and notify stakeholders. DNS propagation may take up to 48 hours depending on TTLs.

---
Document maintained by Platform & Ops. Update this file if domain targets or inbox aliases change.

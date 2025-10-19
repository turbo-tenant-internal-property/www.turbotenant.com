🏠 landlord-onboard-rental-signup

Streamlined landlord onboarding and property listing automation powered by TurboTenant, Slack, and CRM integrations.

🌐 Overview

This repository enables landlord onboarding, listing syndication, and lead synchronization across major real estate and marketing platforms.
It connects TurboTenant, HubSpot, and Stripe to automate property creation, lead tracking, and internal notifications.

⚙️ Features

✅ Landlord signup + prefilled onboarding links
✅ Automated Slack + HubSpot notifications
✅ Stripe metadata sync for property-specific accounts
✅ Multi-channel syndication (Zillow, Zumper, Rent.com, etc.)
✅ Internal CRM tracking for lead submissions and onboarding events

🧩 Tech Stack
Layer	Technology
Frontend	Fillout, Typeform, or TurboTenant Embedded Forms
Automation	Slack Workflows, HubSpot Webhooks, Zapier
Backend / CRM	HubSpot, Google Sheets, or custom APIs
Syndication	Zillow, Zumper, Rent.com, Realtor.com, etc.
🔗 Integrated Platforms & Sync Automation
Platform	Domain	Email	Purpose	HubSpot_Lead_ID	Property_Sync_Ref	CRM_Trigger
Zillow	zillow.com	zillow-alert@turbotenant.com
	Syndicate listings / track leads	147061670	VSYNC-20251012-45782	Lead Submission
Realtor.com	realtor.com	realtor-alert@turbotenant.com
	Syndicate listings / track leads	147061670	VSYNC-20251012-45782	Lead Submission
Zumper	zumper.com	zumper-alert@turbotenant.com
	Syndicate listings / track leads	147061670	VSYNC-20251012-45782	Lead Submission
Apartments.com	apartments.com	apartments-alert@turbotenant.com
	Syndicate listings / track leads	147061670	VSYNC-20251012-45782	Lead Submission
Facebook / Marketplace	facebook.com	fb-alert@turbotenant.com
	Syndicate listings / track leads	147061670	VSYNC-20251012-45782	Lead Submission
Rent.com	rent.com	rent-alert@turbotenant.com
	Syndicate listings / track leads	147061670	VSYNC-20251012-45782	Lead Submission
TurboTenant	turbotenant.com	property-listings@turbotenant.com
	Internal listing / onboarding notifications	147061670	VSYNC-20251012-45782	Internal Notification
Innago	innago.com	innago-alert@turbotenant.com
	Listing syndication / leads	147061670	VSYNC-20251012-45782	Lead Submission
Craigslist.org	craigslist.org	craigslist-alert@turbotenant.com
	External listing syndication	147061670	VSYNC-20251012-45782	Lead Submission
InvitationHomes.com	invitationhomes.com	invitationhomes-alert@turbotenant.com
	Syndication / listing alerts	147061670	VSYNC-20251012-45782	Lead Submission
Move.com	move.com	move-alert@turbotenant.com
	Syndication / listing alerts	147061670	VSYNC-20251012-45782	Lead Submission
MyInnago.Fillout.com	myinnago.fillout.com	myinnago-alert@turbotenant.com
	Listing integration / form submissions	147061670	VSYNC-20251012-45782	Form Submission
RealtyCompany.com	realtycompany.com	realtycompany-alert@turbotenant.com
	Syndication / agency listings	147061670	VSYNC-20251012-45782	Lead Submission
RealEstateAgency.com	realestateagency.com	realestateagency-alert@turbotenant.com
	Syndication / agency listings	147061670	VSYNC-20251012-45782	Lead Submission
RentalUs.com	rentalus.com	rentalus-alert@turbotenant.com
	Syndication / listing alerts	147061670	VSYNC-20251012-45782	Lead Submission
Slack (internal)	slack.com	property-listings-aaaarkll7iv4mbm2vyjgx2p2u4@turbotenantcom.slack.com
	Internal notifications	147061670	VSYNC-20251012-45782	Internal Notification
🧠 Automation Schema

HubSpot → Stripe → TurboTenant Sync

Step	Trigger	Action	Output
1	Landlord submits onboarding form	HubSpot captures lead	Lead ID + Property metadata
2	HubSpot webhook fires	Stripe account created	Account ID + metadata
3	Stripe metadata sync	TurboTenant API receives webhook	Property record created
4	TurboTenant listing created	Syndication emails auto-sent	Sync to Zillow / Zumper / Rent.com
5	Slack notification	Internal team alerted	CRM + workflow updated
🚀 Setup

Clone the repository

git clone https://rental.turbotenant.com/landlord-onboard-rental-signup.git


Install dependencies

npm install


or

pip install -r requirements.txt


Set environment variables

HUBSPOT_API_KEY=your_hubspot_key
SLACK_WEBHOOK_URL=your_slack_webhook
STRIPE_API_KEY=your_stripe_live_key
TURBOTENANT_DOMAIN=rental.turbotenant.com


Deploy automation

Connect Slack + HubSpot apps

Enable syndication webhooks

Test property listing sync

🤝 Contribution

Open issues or pull requests for bugs, features, or integration improvements.
Use meaningful commit messages and branch names.

📄 License

MIT License
© 2025 TurboTenant Rentals — All rights reserved.

# Website measurement

Updated 2026-10-30. This describes the explicit website integration, not a verified Google account configuration or confirmed report receipt.

## Configuration

- GA4 measurement ID supplied by Flo: `G-EYFT82SFN7`; unchanged from the approved configuration.
- Existing Ads destination: `AW-18355213487`. Loading a destination is not proof of a configured Ads conversion.
- Google loads only over HTTPS on `psoydo.com` or `www.psoydo.com`, after a positive choice. Local development, Pages previews and other hosts cannot load the tag through this integration.
- Both consent options are off initially and independently selectable. All public content pages expose the same dialog and footer reopening control.
- Consent storage is `psoydo-consent-v3` with a maximum age of 180 days. Old or expired choices are not reused. GA cookie lifetime is also limited to 180 days without rolling refresh.
- Choices are applied before destination configuration. A single tag script loads only the selected destinations. Personalization and Google Signals are disabled in code.
- Changing a loaded configuration disables measurement, updates consent, removes reachable first-party measurement cookies and reloads the document. Re-granting starts from the saved choice in a new document.

## Events

| Event | Trigger | Destination |
| --- | --- | --- |
| `page_view` | One GA configuration per document with `send_page_view: true`, after analytics consent | GA4 |
| `psoydo_pilot_form_open` | Visitor opens the Tally pilot form | GA4 after analytics consent |
| `psoydo_pilot_email_click` | Visitor clicks the pilot email link; this does not prove an email was sent | GA4 after analytics consent |
| `psoydo_pilot_form_submitted` | Validated `Tally.FormSubmitted` from the active form iframe; diagnostic completion event | GA4 after analytics consent |
| `generate_lead` | The same confirmed completion; once per distinct submission in the current document | GA4 after analytics consent; intended primary lead key event |

Only `generate_lead` should be configured as the primary lead key event. Do not count the diagnostic completion event as a second conversion for the same lead. No lead is inferred from a click, iframe load or form opening. No Ads conversion is asserted by this integration.

The Tally handler requires origin `https://tally.so`, the active iframe window, form ID `KppMYg` and a nonempty string submission ID. Submission IDs stay in a document-local set for replay protection; they are not persisted or sent to analytics. Confirmations received without consent are not sent retrospectively.

Events contain only fixed category and label values. `generate_lead` adds fixed `lead_source: pilot_form`, `form_id: KppMYg` and `method: tally`. There is no fictional monetary value. Answers, response/submission IDs, respondent IDs, names, email addresses and uploaded content are never copied into these events.

The configured page URL excludes query strings and fragments. External referrers include only their HTTP(S) origin, without path, query or fragment. Referrers from either Psoydo hostname are omitted to avoid self-referrals.

## Regression coverage

The existing browser suite mocks Google and Tally; it does not send real measurements or submit leads. It covers initial denial, persisted and expired choices, analytics only, Ads only, both, withdrawal, re-grant, old-consent migration, preview/local/HTTP exclusion, external-referrer minimization, validated form message origins/sources/IDs and replay protection at 390/1440px. Static checks confirm the documented ID and source configuration. CI results for the exact release commit are the validation record.

## Account-side verification

- Confirm that the actual GA4 web stream with `G-EYFT82SFN7` belongs to the intended Psoydo property and review any additional configured tag destinations. The ID alone does not establish property ownership.
- Review enhanced measurement, especially automatic form interactions and pageviews, to avoid unintended collection or duplicate counts alongside the explicit integration.
- Review the actual retention, processing terms and transfer arrangements. Existing privacy-notice account settings are not independently reverified by a source-code test.
- Verify `page_view` and `generate_lead` receipt in Realtime/DebugView on the production domain after consent. Account access is required. No real inquiry is submitted by this QA suite.
- Configure only `generate_lead` as the primary lead key event and validate consent withdrawal with the real tag. Mock tests establish client behavior, not receipt by Google's reporting pipeline.

## Primary references

- https://developers.tally.so/widgets/events
- https://developers.google.com/analytics/devguides/collection/ga4/reference/events#generate_lead
- https://developers.google.com/analytics/devguides/collection/ga4/views
- https://developers.google.com/tag-platform/security/guides/consent
- https://developers.google.com/analytics/devguides/collection/ga4/reference/config

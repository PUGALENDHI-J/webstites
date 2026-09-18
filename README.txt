ABASS COMPLETE WEBSITE

Static multi-page website generated from the supplied ABASS landing page.

Pages:
- index.html — Home / complete landing page
- about.html — About ABASS
- objects.html — Objects of the Trust
- events.html — Events & Pooja
- devotional.html — Pooja & Devotional Library
- donations.html — Donations & Causes
- media.html — Media
- transparency.html — Board of Trustees & Trust Records
- contact.html — Connect + WhatsApp enquiry form

Shared assets:
- assets/styles.css
- assets/script.js

The English/Tamil switch is retained from the source page. The contact enquiry form opens WhatsApp using the configured ABASS contact number.

Run locally by opening index.html or serving this folder with any static web server.

================================================================
DEVOTIONAL UPDATE — September 2026
================================================================

WHAT CHANGED

1. Mobile hero badge fixed
   The "Temple Service, Food & Education for All" badge was a fixed
   104px circle (78px on phones) holding a full sentence, with an
   inline font-size override. The text spilled outside the ring.
   It is now a self-sizing gold ribbon centred under the image.

2. Lord Ayyappa image now leads the mobile hero
   On phones the darshan panel moves above the headline text, goes
   near full-width (was a 260px thumbnail), and carries a caption
   overlay: "Divine Darshan / Lord Ayyappa - devotion carried
   forward through every generation". The caption follows the
   slideshow and switches with the EN/TA language toggle.

3. New "Seva Sankalpam" sponsor dropdown section
   Added to index.html (immediately after the hero, so it is the
   second section on mobile) and to donations.html.
   - Grouped dropdown of 11 sevas, bilingual
   - Live detail card: amount, description, what the sponsor receives
   - Quick amount chips plus an "other amount" field
   - Sankalpam fields, sends a formatted WhatsApp message
   To edit the seva list, amounts or perks, see the SEVAS array
   near the top of assets/_devotional.js.

4. Devotional styling across all 10 pages
   - Google Fonts (Cinzel / Work Sans / Noto Tamil) were referenced
     in the CSS but never actually loaded. Now linked on every page.
   - Scrolling "Swamiye Saranam Ayyappa" chant strip under the header
   - Kolam dot texture, gold ornamental dividers, garland-gradient
     image frames, breathing lamp icons, halo glows

NEW FILES
   assets/_devotional.css   all new styling and mobile fixes
   assets/_devotional.js    hero caption + seva sponsor dropdown
Both load after the originals, so styles.css and script.js are
untouched and the changes can be removed by deleting the two
<link>/<script> tags.

CONTACT NUMBER
   The WhatsApp number 919841820668 appears in assets/script.js and
   assets/_devotional.js (PHONE constant). Change it in both places.

TESTED
   Chromium at 360px, 390px, 768px and 1440px across all 10 pages:
   no horizontal overflow, no JavaScript errors, EN/TA switching
   verified on the new dropdown and hero caption.

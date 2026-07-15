The Divine Get Down

A Christ-centered faith-based media platform dedicated to helping people slow down, reconnect with God, and find peace through Scripture, reflection, teaching, and meaningful digital experiences.

Mission

To create a sacred rhythm for the weary soul, a place to breathe, remember, and rest in God’s presence.

⸻

Features

* Peaceful, Scripture-centered website
* Guided Reset Experience
* Free Stillness Scroll
* Scroll Vault
* Faith-based video content
* Speaking and collaboration information
* Mobile-responsive design
* SEO optimization
* React Router navigation
* Netlify deployment

⸻

Tech Stack

* React
* React Router
* React Helmet Async
* Netlify
* GitHub
* Stripe Payment Links
* YouTube (Unlisted Video Delivery)

⸻

Project Structure

src/
 ├── components/
 ├── pages/
 ├── utils/
 ├── Home.jsx
 └── App.jsx
public/
 ├── _redirects
 ├── divine_logo.png
 ├── divine_logo.webp
 ├── stillness-scroll.pdf
 └── reset-companion.pdf

⸻

Routes

Route	Description
/	Home
/stillness	Free Stillness Scroll
/reset-experience	Reset Experience landing page
/experience-access	Paid experience access
/journey	Journey page
/community	Community page
/vault	Scroll Vault
/thank-you	Thank You page

⸻

Local Development

Install dependencies:

npm install

Run locally:

npm start

Create a production build:

npm run build

⸻

Deployment

The site is automatically deployed through Netlify whenever changes are pushed to the main branch.

Required Netlify Environment Variable

REACT_APP_RESET_EXPERIENCE_CHECKOUT_URL

This variable should contain the Stripe Payment Link URL.

⸻

Netlify Redirects

React Router requires the following file:

public/_redirects

Contents:

/*    /index.html    200

⸻

Stripe Integration

The Reset Experience uses Stripe Payment Links.

After a successful purchase, customers are redirected to:

/experience-access

The access page includes:

* Unlisted YouTube experience
* Reset Companion PDF

⸻

Static Resources

Public assets are served from the public folder.

Examples:

* /stillness-scroll.pdf
* /reset-companion.pdf
* /divine_logo.png

⸻

Development Guidelines

* Keep changes minimal and intentional.
* Preserve the Christ-centered mission and peaceful design.
* Test with npm run build before deploying.
* Avoid unnecessary dependencies.
* Keep routing compatible with Netlify.

⸻

Contributing

1. Create a feature branch.
2. Make your changes.
3. Test locally.
4. Run a production build.
5. Open a pull request.

⸻

License

All original branding, written content, videos, PDFs, artwork, and digital experiences are the intellectual property of The Divine Get Down unless otherwise noted.

⸻

Website

https://thedivinegetdown.com

⸻

Contact

thedivinegetdown@gmail.com

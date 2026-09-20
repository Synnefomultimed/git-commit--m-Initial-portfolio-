# Saad Ullah Khan — Portfolio

Premium Next.js portfolio for Saad Ullah Khan.

## Add portfolio work without editing code

Put work inside `public/portfolio/` using this structure:

```text
public/portfolio/
  yum-sweets-bakers/
    social-media/
      01.jpg
      02.jpg
    flyers/
      01.jpg
    menus/
      01.jpg
```

Company folders already included:

- stenov
- yum-sweets-bakers
- paces
- 1real-estate
- zueusa
- pentago-food-group
- millennium-opportunities
- freelance

You can create a new category folder at any time. The scanner automatically turns `social-media` into `Social Media`, `lcd-screens` into `LCD Screens`, etc.

Supported media: `.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`, `.svg`, `.mp4`, `.webm`.

## Important

The folder scanner runs before `dev` and `build`. After adding/removing images or folders, restart the dev server or run a new build so the generated portfolio data is refreshed. On Vercel, adding files to the repository and deploying a new build will update the portfolio.

Company name, role, and professional description are kept in `scripts/scan-portfolio.mjs`. Individual artwork does not need to be registered there.

## Commands

```bash
npm install
npm run dev
npm run build
npm start
```

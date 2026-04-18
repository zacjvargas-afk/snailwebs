# GameVault: No-Build Edition

I have simplified your project into a standard **Vanilla HTML, JS, and CSS** stack.

## 1. Why the change?
The previous version used React/JSX, which required a "compiler" to turn JSX into JavaScript. This was causing the **MIME type error** (`text/jsx`) because browsers cannot read JSX directly. By switching to Vanilla JS, your site now works **natively** in all browsers without any complex setup.

## 2. GitHub Pages (Perfect Compatibility)
Your site is now 100% compatible with GitHub Pages.
- **Official URL**: https://sleepynight/snailwebs/
- **No Build Step**: You don't need to run `npm run build`.
- **Just Push**: Upload the `index.html`, `style.css`, `script.js`, and the `src/` folder to your GitHub repo.
- **It Just Works**: GitHub Pages will serve it perfectly as a static site.

## 3. Project Structure
- `index.html`: The structure and UI markers.
- `style.css`: Custom game-themed styling.
- `script.js`: All the logic (filtering, search, modal popups).
- `src/data/games.json`: Your game database.

---
**GameVault Terminal** // v1.1.0-VANILLA

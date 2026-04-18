# GameVault Deployment Guide

If you are seeing a **blank page** after deploying to GitHub Pages, here is why and how to fix it:

## 1. The "Blank Page" Issue
GitHub Pages serves **static files**. It does not automatically run the React/Vite code you see in this editor. Browsers cannot read `.jsx` files directly. You must "build" the project into standard HTML/JS first.

## 2. How to Deploy Correctly

### Method A: Manual Build (Simple)
1. Run `npm run build` in your terminal.
2. This creates a `dist/` folder.
3. Upload **only the contents** of the `dist/` folder to your GitHub repository (or the branch you use for GitHub Pages).

### Method B: Configure Vite Base Path
I have already updated your `vite.config.js` to use `base: './'`. This ensures that your assets (CSS, JS) load correctly even if your site is hosted at `username.github.io/your-repo-name/`.

## 3. Recommended GitHub Actions Setup
For the best experience, you should use a GitHub Action to automatically build and deploy. 
Create a file at `.github/workflows/deploy.yml` in your repository with a "Vite GitHub Pages" template.

---
**GameVault Terminal** // v1.0.4-STABLE

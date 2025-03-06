# Project Library Client

This repository provides a **React + TypeScript** application that manages and displays a set of projects or devices. It is built with **Vite** for modern, fast development and bundling. The application is intended to be embedded within a Webflow-based site, with production build files hosted on a Supabase Storage CDN.

---

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Project Structure](#project-structure)
4. [Local Development](#local-development)
5. [Deployment](#deployment)
6. [Embedding in Webflow](#embedding-in-webflow)
7. [Additional Notes](#additional-notes)

---

## Overview

The **Project Library Client** is a React-powered SPA (Single Page Application) built with TypeScript. It showcases a list of projects, devices, or other content. The core architecture uses [Vite](https://vitejs.dev/) to provide:

- Fast module bundling and hot-module reloading.
- A streamlined, minimal configuration setup for React + TypeScript.
- Easy integration of external libraries.

This project highlights modular design through custom hooks, modular components, and JSON-based data sources.

---

## Features

- **React + TypeScript**: Type-safe, modern React code.
- **Custom Hooks** for handling data (e.g., useProjects, useSkills, etc.).
- **JSON-based data** for pre-seeded or local data usage (see `/data` folder).
- **Filter and Sort** functionality for categorizing and searching project items.
- **Build Output** optimized via Vite for production deployment.
- **Supabase Storage** used for hosting the final build output.
- **Webflow Embedding** for integrating this app with a Webflow site.

---

### Key Folders

1. **src/components** – Reusable UI components.
2. **src/pages** – Page-level components for routing purposes.
3. **src/hooks** – Custom hooks for data retrieval, state management, and side-effects.
4. **data** – JSON files storing sample data.
5. **public** – Static assets served at root.

---

## Local Development

1. **Install Dependencies**:
   ```bash
   npm install
   ```
2. **Start Development Server**:
   ```bash
   npm run dev
   ```
   This will launch the Vite development server, typically at `http://localhost:5173`. Hot-module reloading (HMR) minimzes refresh time during development.
3. **Lint & Format**:
   ```bash
   npm run lint
   ```
   Adjust your configuration in `eslint.config.js` (or `.eslintrc.js`) if needed.

---

## Deployment

When ready to deploy:

1. **Build for Production**:
   ```bash
   npm run deploy
   ```
   This will run the build command and upload the single JS
   bundle to Supabase Storage and output a import tag to use in Webflow.

2. **Update home page in Webflow**

Go into the settings for the home page in Webflow. in the `Before </body> tag`

---

## Additional Notes

- **Integration with Webflow-API**: The `webflow-api` package is present in `package.json`, which could be used to programmatically manage your Webflow CMS content if needed.
- **Data Sources**: Demo data (skills, tools) are loaded from JSON files in the `/data` directory. In a real production environment, hooking the app to an external API or a backend is recommended.
- **Testing**: Basic tests in `src/tests` can be extended with your own.
- **Environment Variables**: If you require environment-specific configuration (keys, endpoints, etc.), set them with `.env` files or other secure solutions. Vite will expose those starting with `VITE_`.

---

### Thank You

Thank you for choosing this Project Library Client to embed into your Webflow site! If you have any issues, feel free to open an issue or contribute.

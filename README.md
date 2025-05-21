# Project Library Client

This repository provides a **React + TypeScript** application that manages and displays a set of projects or devices. It is designed to be embedded in a Webflow site and uses Supabase for data storage and hosting. I works in conjunction with the Webflow CMS.

---

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
2. [Bug Reporting](#bug-reporting)
4. [Project Structure](#project-structure)
5. [Local Development](#local-development)
6. [Deployment](#deployment)
7. [Embedding in Webflow](#embedding-in-webflow)
8. [Additional Notes](#additional-notes)

---

## Overview

The **Project Library Client** is a React-powered SPA (Single Page Application) built Vite and TypeScript. It showcases a list of projects and research categories The core architecture uses [Vite](https://vitejs.dev/) to provide:

- Fast module bundling and hot-module reloading.
- A streamlined, minimal configuration setup for React + TypeScript.
- Easy integration of external libraries.

This project applies modular design through custom hooks, modular components, and JSON-based data sources.

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

## Bug Reporting

Bug Report Standard Operating Procedure:
1. Project Library Client GitHub page --> Projects tab
1. For each new bug reported, create an issue in this project under the bugs tab (look for the 🐛 emoji)
2. As needed for task segmentation clarity, create bug-specific sub issues, as opposed to new top-level issues if work on a single bug needs to be carved off into separate dev branches.

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

The application depends on Node.js and npm. You will need to install these first.

   ```bash
   npm install
   ```

2. **Run Mock Service Worker**

The client can be run with a mock service worker to simulate the API calls. This allows you to develop without the Supabase API credentials.

   ```bash
   npm run dev:msw
   ```

See the [Mock Service Worker](https://mswjs.io/docs/) documentation for more details on how to set up and use the mock service worker. The mocks are implemented in the `src/mocks` directory. The mock service worker intercepts network requests and returns the appropriate mock data.


3. **Set environment variables**

The application depends a few environment variables to run. You can create a `.env` file in the root of the project with the following variables:

```Shell
# Base URL for Supabase Function API Endpoints
VITE_API_URL=""
# Supabase API Key (Anonymous Key)
VITE_SUPABASE_API_KEY=""
# Used for uploading assets to Supabase Storage
SUPABASE_SERVICE_KEY=""
```

If you are testing against the production DB and API you will need to be invited to the Supabase project to get the API keys.
If you are running the Supabase app locally, you can use the `supabase status` command to get the local credentials.

4. **Start Development Server**:
   ```bash
   npm run dev
   ```
   This will launch the Vite development server, typically at `http://localhost:5173`. Hot-module reloading (HMR) minimzes refresh time during development.

4. **Lint & Format**:
   ```bash
   npm run lint
   ```
   Adjust your configuration in `eslint.config.js` (or `.eslintrc.js`) if needed.

---

## Deployment

Deployment depends on having the the production credentials for Supabase. Assuming you've set up the environment variables and run `supabase login` you can run the deploy command to upload the entry JS file to Supabase Storage.

1. **Build for Production**:
   ```bash
   npm run deploy
   ```
   This will run the build command and upload the single JS
   bundle to Supabase Storage and output a import tag to use in Webflow.

2. **Update home page in Webflow**

Go into the settings for the home page in Webflow. in the `Before </body> tag`

Note: There may be a programmatic way to upload this tag using a Webflow Application. https://developers.webflow.com/v2.0.0/data/docs/custom-code

### Contributing

Thank you for your interest in the Open Source Medical Supplies Project Library! If you are interested in contributing please send an email to info@opensourcemedicalsupplies.org.

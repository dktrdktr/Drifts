Drifts
=========

Drifts is a note-taking app for organizing and taking notes in the markdown format. 

This is a learning project for the purposes of practising and showcasing PERN stack skills. First built as a graduation project at the Lighthouse Labs bootcamp, together with [Clifford Tse](https://github.com/TseClifford) and [Alparslan Bahadir Usta](https://github.com/alparslanustaa). Since April 2022, I've forked the project and have been developing it individually.

## Features

Current highlighted features:
- Live markdown preview mode (with beautiful typography) right in the browser. 
- Minimal responsive design with accessibility features
- CRUD operations for notebooks and notes

Features in development:
- Sorting operations and search functionality for notes
- Web socket connection to auto-save notes as you write (à la Google Docs)
- Share-able links for each note with custom permissions control

## Live Preview
https://markthatdown.netlify.app/ \
(Please use `dotubutis@gmail.com` as login email for demo, password authentication is disabled)

[![Netlify Status](https://api.netlify.com/api/v1/badges/92537b8d-d0c6-4052-8a44-bf68427f0f86/deploy-status)](https://app.netlify.com/sites/markthatdown/deploys)

## Screenshots

### Desktop
!["Desktop"](./frontend/public/screenshots/desktop-demo.gif)
### Mobile
!["Mobile"](./frontend/public/screenshots/mobile-demo.gif)

## Setup

### Backend - Running Express Server

1. Enter backend subdirectory `cd backend`
2. Create `.env` based on `.env.example` with database credentials
3. Install dependencies with `npm install`.
4. Reset database schema and seed data with `npm run db:reset`
5. Start server `npm start`

### Frontend - Running React Client

1. Enter frontend subdirectory `cd frontend`
2. Install dependencies with `npm install`.
3. Start client `npm start`

## Dependencies

- Node 14.x or above
- NPM 5.x or above

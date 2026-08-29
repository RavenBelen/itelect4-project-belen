# Betta Manager

A responsive aquarium-management application built for ITELECT4. It lets an authenticated user manage betta fish, aquarium tanks, and aquatic plants from one dashboard.

## Features

- Login-protected dashboard and management pages
- Light and dark mode
- Live dashboard counts for fish, tanks, and plants
- Add forms for bettas, tanks, and plants
- Client-side validation with React Hook Form and Zod
- Clear validation feedback for every form field
- Add and delete actions backed by the local JSON API
- Automatic list and dashboard refreshes using TanStack Query
- Sticker-style fish, tank, and plant visuals instead of external card images
- Responsive layout for desktop and mobile

## Tech Stack

- React 19 and TypeScript
- Vite and Tailwind CSS
- React Router
- TanStack Query
- Zustand
- React Hook Form, Zod, and `@hookform/resolvers`
- Shadcn UI components (`Button`, `Input`, and `Label`)
- json-server

## Getting Started

Install the dependencies:

```bash
npm install
```

Start both the Vite app and the local API:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). The local API runs at [http://localhost:3001](http://localhost:3001).

To run them separately:

```bash
npm run api
npm run dev:client
```

## Using the App

1. Open the app and sign in from the Login page.
2. Use the Betta Fish, Aquarium Tank, or Aquatic Plants tab to add an item.
3. Complete the form fields; invalid values show an error and are not sent to the API.
4. Select **Delete** on an item and confirm the prompt to remove it.
5. Lists and dashboard totals refresh automatically after every successful add or delete.

The demo login is local only; enter a display name and continue. Authentication is saved in browser storage until you use Logout.

## Available Commands

```bash
npm run dev        # Start the API and Vite development server
npm run dev:client # Start only Vite
npm run api        # Start only json-server on port 3001
npm run lint       # Check code with ESLint
npm run build      # Type-check and create a production build
npm run preview    # Preview the production build
```

## Project Structure

```text
src/
├── api/           # JSON API requests and mutations
├── components/    # Layout, cards, protected routes, and UI components
├── pages/         # Dashboard, login, and management screens
├── schemas/       # Zod schemas and derived form value types
├── store/         # Authentication and UI state
├── types/         # Shared TypeScript models
├── App.tsx        # Routes and route protection
└── main.tsx       # Application entry point
```

## Verification

```bash
npm run lint
npm run build
```

## Author

Raven Joseph Belen  
BS Information Technology, De La Salle Lipa

## Course

ITELECT4 — Advanced Web Development with React and TypeScript

## License

This project was created for educational purposes as part of the ITELECT4 course requirements.

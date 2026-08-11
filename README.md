# Fullstack Auth App - React + NestJS

A simple authentication application with a React and TypeScript frontend and a NestJS API.

## Project structure

- `client/` - React frontend powered by Vite
- `server/` - NestJS API backed by MongoDB

## Prerequisites

- Node.js and npm
- MongoDB or a MongoDB connection string

## Setup

Clone the repository and enter its directory:

```bash
git clone <repository-url>
cd auth-app-react-nest
```

### Client

```bash
cd client
npm install
```

Create `client/.env` using `client/.env.example`. The API URL must use Vite's `VITE_` prefix:

```env
VITE_API_BASE_URL=http://localhost:3000
```

Start the development server:

```bash
npm run dev
```

Useful client commands:

```bash
npm run typecheck
npm run test
npm run build
```

### Server

In a second terminal:

```bash
cd server
npm install
```

Create `server/.env` using `server/.env.example` and configure these variables:

```env
PORT=3000
DB_URL=<mongodb-connection-string>
FRONTEND_URL=http://localhost:5173
JWT_SECRET=<strong-random-secret>
```

Start the API in watch mode:

```bash
npm run dev
```

The API documentation is available at `http://localhost:3000/api-docs`.

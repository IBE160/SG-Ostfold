# NestJS Backend Project

This directory contains the NestJS backend application for the Shift & KPI Reporting Solution.

## Getting Started

Follow these instructions to set up and run the backend locally.

### Prerequisites

*   Node.js (LTS recommended)
*   pnpm (package manager)

### Installation

Navigate to the `backend` directory and install the dependencies:

```bash
cd backend
pnpm install
```

### Environment Variables

Create a `.env` file in the `backend` directory. This file will contain sensitive information and environment-specific configurations.

Example `.env` file:

```
# Supabase Configuration (placeholders for future integration)
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key

# NestJS Application Port
PORT=3000
```

### Available Scripts

In the project directory, you can run:

*   **`pnpm run start`**: Starts the application in production mode.
*   **`pnpm run start:dev`**: Starts the application in watch mode for development.
*   **`pnpm run build`**: Builds the application for production to the `dist` folder.
*   **`pnpm run lint`**: Lints the project files and fixes issues where possible.
*   **`pnpm run test`**: Runs the unit tests.
*   **`pnpm run format`**: Formats the code using Prettier.

### Running the Application

To run the application in development mode:

```bash
cd backend
pnpm run start:dev
```

The application will typically run on `http://localhost:3000`.

### Health Check

Access the `/health` endpoint to check the application's status:

`GET http://localhost:3000/health`

Expected response:
```json
{
  "status": "ok"
}
```
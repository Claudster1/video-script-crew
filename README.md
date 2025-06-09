# Video Script Crew

A Node.js application for managing and generating video scripts.

## Features

- File upload support
- Supabase integration
- RESTful API endpoints
- CORS enabled
- Production-ready configuration

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with your environment variables
4. Start the server:
   ```bash
   npm start
   ```

## Development

- Run in development mode: `npm run dev`
- Run in production mode: `npm run prod`
- Stop the server: `npm run stop`
- Restart the server: `npm run restart`

## Environment Variables

Create a `.env` file with the following variables:
- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment (development/production)
- `SUPABASE_URL`: Your Supabase URL
- `SUPABASE_KEY`: Your Supabase API key 
# Video Script Crew

This is a Node.js application for managing and generating video scripts.

## Features

- File upload support for various document types (PDF, Word, TXT, PPT, images).
- Supabase integration for backend storage and authentication.
- RESTful API endpoints for managing scripts, users, and content.
- Chunked file uploads for large files.

## Installation

To get started with the project, follow these steps:

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/Claudster1/video-script-crew.git
    cd video-script-crew
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Create a `.env` file** in the root directory and add the following environment variables:
    ```
    PORT=3000
    NODE_ENV=development
    SUPABASE_URL=https://jmyjdnigxbrntsvkdwxp.supabase.co
    SUPABASE_KEY=YOUR_SUPABASE_ANON_KEY
    ```
    **Important**: Replace `YOUR_SUPABASE_ANON_KEY` with your actual Supabase public `anon` key.

4.  **Start the server**:
    ```bash
    npm start
    ```

## Development

- To run in development mode with `nodemon`:
    ```bash
    npm run dev
    ```

- To start the server in production mode with `pm2`:
    ```bash
    npm run prod
    ```

- To stop the `pm2` process:
    ```bash
    npm run stop
    ```

- To restart the `pm2` process:
    ```bash
    npm run restart
    ```

## Environment Variables

- `PORT`: The port on which the server will listen (e.g., `3000`).
- `NODE_ENV`: The environment mode (e.g., `development`, `production`).
- `SUPABASE_URL`: Your Supabase project URL.
- `SUPABASE_KEY`: Your Supabase public `anon` key. 
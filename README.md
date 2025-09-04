# Coding Game Backend

A fun learning tool for people who want to improve their JavaScript skills. Practice coding by  targeting specific topics like objects or arrays, solve katas, run code, and get immediate feedback!

## Features

- Solve JavaScript katas in a range of difficulties from easy to hard
- See solutions and shown where to find more info about a topic
- Run your code and get instant feedback

## Tech Stack

- **Backend:** Node.js, Express, Supabase, Axios, DotEnv, PostgreSQL
- **Frontend:** React, Tailwind CSS, CodeMirror

## Getting Started

1. **Clone the repository**  
   Download or clone the project files to your local machine.

2. **Install dependencies**  
   Run `npm install` in the project directory.

3. **Set up environment variables**  
   Create a `.env.development` or `.env.test` file in the project root and add:
   ```
   PGDATABASE=coding_game
   PGDATABASE=coding_game_test
   ```

4. **Seed the database (optional for dev data)**  
   Run `npm run seed-dev` to populate the database with test data.

5. **Start the backend server**  
   Run `npm run dev` to start the server.

## APIs Guide

- GET /api
- GET /api/katas
- GET /api/katas/:kata_id
- GET /api/katas/:kata_id/hint
- GET /api/katas/:kata_id/note
- GET /api/katas/:kata_id/tags
- POST /api/katas
- GET /api/users
- GET /api/users/profile
- POST /api/submission

## Deployment

The project will be hosted on [Supabase](https://supabase.com/).

## Contributing & Licensing

This is a personal/portfolio project and not open for contributions or licenses at this time. For personal and educational use only.

---

*Frontend built with React and Tailwind CSS. Backend powered by Node.js and Express.*

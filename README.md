# MERN Authentication System

A full-stack authentication system built with the MERN stack (MongoDB, Express.js, React, Node.js). It features secure user registration, login, email verification, password reset, and protected dashboard access.

## Features

- User registration with email verification
- Secure login/logout using JWT and HTTP-only cookies
- Password reset via email link
- Protected dashboard for authenticated and verified users
- Responsive UI with Tailwind CSS and Framer Motion
- Toast notifications and loading spinners for feedback

## Project Structure

```
.env
.gitignore
package.json
backend/
  index.js
  controllers/
  db/
  mailtrap/
  middleware/
  models/
  routes/
  utils/
frontend/
  src/
  public/
  ...
```

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Setup

1. Clone the repository.
2. Create a `.env` file in the root and add your environment variables (see `.env.example` if available).
3. Install dependencies:

   ```sh
   npm install
   npm install --prefix frontend
   ```

4. Start the backend server (development):

   ```sh
   npm run dev
   ```

5. Start the frontend (in another terminal):

   ```sh
   cd frontend
   npm run dev
   ```

### Build for Production

```sh
npm run build
npm start
```

## Environment Variables

- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret for JWT signing
- `CLIENT_URL` - Frontend URL (e.g., http://localhost:5173)
- `GMAIL_USER` and `GMAIL_APP_PASSWORD` - For sending emails via Gmail

## License

ISC

---

## Author

- [Mohammad Umar Al Hejazi](https://github.com/hejazi-zarkawi)

---

## Live Website Link

- [MernAuthentication.com](https://mern-auth-5k0z.onrender.com/)

# Mini E-commerce Store

MERN starter project for the mini e-commerce API and storefront.

## Setup

Requirements: Node.js 20 or newer and a MongoDB Atlas cluster.

1. Install server dependencies:

   ```bash
   cd server
   npm install
   ```

2. Install client dependencies:

   ```bash
   cd ../client
   npm install
   ```

3. Copy `server/.env.example` to `server/.env` and replace the Atlas placeholders with your connection string. Copy `client/.env.example` to `client/.env` if you need a different API URL.

## Run

Start the API in one terminal:

```bash
cd server
npm run dev
```

Start the React app in another:

```bash
cd client
npm run dev
```

The API health check is available at `http://localhost:5000/api/health`. The Vite client runs at `http://localhost:5173`.

## Phase 7: testing and deployment

### Postman API pass

Import `postman/mini-ecommerce.postman_collection.json` and `postman/local.postman_environment.json` into Postman. Set `adminToken` in the environment to a JWT for a user whose MongoDB `role` is `admin`; the collection generates a temporary user and chains its token, product ID, order ID, and cart item ID automatically. Run the collection in this order so the dependent IDs are available.

The collection covers all 17 documented endpoints. A real pass requires the API to be running with a reachable MongoDB database and an admin token.

### MongoDB Atlas

1. Create a free Atlas cluster and database user.
2. In Atlas Network Access, allow the IP address that will run the API. For local testing, use your current IP rather than opening access broadly.
3. Copy the Node.js connection string into `server/.env` as `MONGODB_URI`, replacing its placeholders. Set a long random `JWT_SECRET`.
4. Start the API with `cd server` and `npm start`, then run the Postman collection against `http://localhost:5000/api`.

### Render API

Create a Render Web Service from this repository. The included `render.yaml` uses `server/` as the root directory, `npm install` as the build command, and `npm start` as the start command. Add `MONGODB_URI`, `JWT_SECRET`, and `CLIENT_URL` in Render environment variables. Set `CLIENT_URL` to the final Vercel URL after deploying the frontend.

### Vercel frontend

Import the repository into Vercel. The included `vercel.json` installs and builds the `client/` app, publishes `client/dist`, and rewrites client-side routes to `index.html`. Set `VITE_API_URL` to the Render API URL plus `/api`, for example `https://your-api.onrender.com/api`, then redeploy. Update Render’s `CLIENT_URL` to the Vercel URL.

## Phase 1-6 status

- `server/`: Express, CORS, dotenv, Mongoose Atlas connection, and health endpoint
- `client/`: Vite React app with React Router and starter routes
- Authentication, products, orders, cart, and the React integration are implemented
- Phase 7 test collection and deployment configuration are included

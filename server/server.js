import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import cartRoutes from './routes/cartRoutes.js';
import { connectDatabase } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import productRoutes from './routes/productRoutes.js';
import { migrateLegacyProductCategories } from './migrations/productCategoryMigrations.js';

const app = express();
const port = Number(process.env.PORT) || 5000;
const allowedOrigins = new Set([
  process.env.CLIENT_URL,
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:5174',
  'http://127.0.0.1:5174',
  'http://localhost:3000',
].filter(Boolean));

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.has(origin)) {
      return callback(null, true);
    }

    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));
app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' });
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/cart', cartRoutes);

app.use((_request, response) => {
  response.status(404).json({ message: 'Route not found' });
});

const databaseConnected = await connectDatabase();
if (databaseConnected) await migrateLegacyProductCategories();

const startServer = (nextPort) => {
  const server = app.listen(nextPort, () => {
    console.log(`API running at http://localhost:${nextPort}`);
  });

  server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      console.warn(`Port ${nextPort} is busy, retrying on ${nextPort + 1}`);
      startServer(nextPort + 1);
      return;
    }

    throw error;
  });
};

startServer(port);

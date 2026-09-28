import mongoose from 'mongoose';

export async function connectDatabase() {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    console.warn('MONGODB_URI is not configured. Starting without a database connection.');
    return false;
  }

  try {
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected');
    return true;
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    console.warn('The server will continue to run, but database-backed APIs will return 503 until the database is available.');
    return false;
  }
}

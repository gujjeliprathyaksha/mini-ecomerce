import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from '../models/User.js';

function createToken(userId) {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not configured');
  }

  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

function normalizeEmail(email) {
  return typeof email === 'string' ? email.trim().toLowerCase() : '';
}

export async function register(request, response) {
  if (mongoose.connection.readyState !== 1) {
    return response.status(503).json({ message: 'Database is not connected. Set MONGODB_URI in server/.env.' });
  }

  const { name, password } = request.body;
  const email = normalizeEmail(request.body.email);

  if (!name?.trim() || !email || !password) {
    return response.status(400).json({ message: 'Name, email, and password are required' });
  }

  if (password.length < 6) {
    return response.status(400).json({ message: 'Password must be at least 6 characters' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return response.status(400).json({ message: 'Email is already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({ name: name.trim(), email, password: hashedPassword });

    return response.status(201).json({ user: user.toSafeObject(), token: createToken(user.id) });
  } catch (error) {
    if (error.code === 11000) {
      return response.status(400).json({ message: 'Email is already registered' });
    }
    return response.status(500).json({ message: 'Unable to register user' });
  }
}

export async function login(request, response) {
  if (mongoose.connection.readyState !== 1) {
    return response.status(503).json({ message: 'Database is not connected. Set MONGODB_URI in server/.env.' });
  }

  const email = normalizeEmail(request.body.email);
  const { password } = request.body;

  if (!email || !password) {
    return response.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ email }).select('+password');
    const passwordMatches = user && await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      return response.status(401).json({ message: 'Invalid email or password' });
    }

    return response.json({ user: user.toSafeObject(), token: createToken(user.id) });
  } catch (_error) {
    return response.status(500).json({ message: 'Unable to log in' });
  }
}

export function me(request, response) {
  return response.json(request.user.toSafeObject());
}

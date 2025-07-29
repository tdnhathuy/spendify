// lib/mongoose.ts
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!; // nên set trong .env.local
const MONGODB_DB = process.env.MONGODB_DB!;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cached = (globalThis as any).mongoose || { conn: null, promise: null };

export async function dbConnect() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      dbName: MONGODB_DB,
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

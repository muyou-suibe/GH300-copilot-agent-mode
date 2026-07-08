import mongoose from 'mongoose';

const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_tracker';

export async function connectDatabase() {
  await mongoose.connect(connectionString);
  console.log('Connected to MongoDB at', connectionString);
  return mongoose.connection;
}

export default mongoose.connection;

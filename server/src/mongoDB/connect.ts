import mongoose from 'mongoose';

export const connectDB = (url: string) => {
  mongoose.set('strictQuery', true);
  mongoose.connect(url)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => {
      console.error('Failed to connect with MongoDB');
      console.error(err);
    });
};


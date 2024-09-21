import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import Admin from './Models/admin.js'; // Path to your User model
import dotenv from 'dotenv';

dotenv.config();


console.log(process.env.JWT_SECRET,process.env.mongodbURL);
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/TTE', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const createUser = async (username, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password,10);

    const newUser = new Admin({
      username,
      password: hashedPassword
    });
    await newUser.save();
    console.log('User created successfully.');
  } catch (error) {
    console.error('Error creating user:', error);
  } finally {
    mongoose.connection.close();
  }
};

// Example usage
createUser('admin', 'admin@TTE');

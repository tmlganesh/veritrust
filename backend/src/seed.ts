import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db';
import User from './models/User';
import VerificationCase from './models/VerificationCase';
import ActivityLog from './models/ActivityLog';

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await VerificationCase.deleteMany();
    await ActivityLog.deleteMany();

    const createdUsers = await User.insertMany([
      {
        name: 'Admin User',
        email: 'admin@mploychek.ai',
        password: 'admin123',
        role: 'admin',
        department: 'Operations',
      },
      {
        name: 'General User',
        email: 'user@mploychek.ai',
        password: 'user123',
        role: 'user',
        department: 'Verification',
      }
    ]);

    const adminUser = createdUsers[0]._id;
    const generalUser = createdUsers[1]._id;

    const cases = Array.from({ length: 15 }).map((_, i) => {
      const statuses = ['Verified', 'Pending', 'Escalated', 'Rejected'];
      const types = ['Employment Verification', 'Education Check', 'Identity Validation', 'Criminal Background Check', 'Address Verification'];
      return {
        candidateName: `Candidate ${i + 1}`,
        verificationType: types[i % types.length],
        riskScore: Math.floor(Math.random() * 100),
        status: statuses[Math.floor(Math.random() * statuses.length)],
        assignedOfficer: i % 2 === 0 ? adminUser : generalUser,
      };
    });

    await VerificationCase.insertMany(cases);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

importData();

import mongoose from 'mongoose';

const verificationCaseSchema = new mongoose.Schema({
  candidateName: { type: String, required: true },
  verificationType: { 
    type: String, 
    enum: ['Employment Verification', 'Education Check', 'Identity Validation', 'Criminal Background Check', 'Address Verification'], 
    required: true 
  },
  riskScore: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['Verified', 'Pending', 'Escalated', 'Rejected'], 
    default: 'Pending' 
  },
  assignedOfficer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

export default mongoose.model('VerificationCase', verificationCaseSchema);

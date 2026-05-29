import { Request, Response } from 'express';
import VerificationCase from '../models/VerificationCase';
import ActivityLog from '../models/ActivityLog';

export const getVerificationCases = async (req: Request, res: Response) => {
  try {
    const cases = await VerificationCase.find({}).populate('assignedOfficer', 'name email').sort({ createdAt: -1 });
    res.json(cases);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createVerificationCase = async (req: Request, res: Response) => {
  try {
    const { candidateName, verificationType } = req.body;
    
    const newCase = await VerificationCase.create({
      candidateName,
      verificationType,
      riskScore: Math.floor(Math.random() * 30), // Initial low risk score for new records
      status: 'Pending',
      assignedOfficer: req.user._id,
    });

    await ActivityLog.create({
      user: req.user._id,
      action: 'CREATE_CASE',
      details: `Created new verification case for ${candidateName}`,
    });

    res.status(201).json(newCase);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getVerificationCaseById = async (req: Request, res: Response) => {
  try {
    const vCase = await VerificationCase.findById(req.params.id).populate('assignedOfficer', 'name email');
    if (vCase) {
      res.json(vCase);
    } else {
      res.status(404).json({ message: 'Verification case not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateVerificationStatus = async (req: Request, res: Response) => {
  const { status } = req.body;
  try {
    const vCase = await VerificationCase.findById(req.params.id);
    if (vCase) {
      vCase.status = status;
      const updatedCase = await vCase.save();
      
      await ActivityLog.create({
        user: req.user._id,
        action: 'UPDATE_CASE_STATUS',
        details: `Updated case ${vCase._id} status to ${status}`,
      });

      res.json(updatedCase);
    } else {
      res.status(404).json({ message: 'Verification case not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAnalytics = async (req: Request, res: Response) => {
  try {
    const totalCases = await VerificationCase.countDocuments();
    const verifiedCases = await VerificationCase.countDocuments({ status: 'Verified' });
    const pendingCases = await VerificationCase.countDocuments({ status: 'Pending' });
    const escalatedCases = await VerificationCase.countDocuments({ status: 'Escalated' });
    const highRiskCases = await VerificationCase.countDocuments({ riskScore: { $gt: 75 } });

    res.json({
      totalCases,
      verifiedCases,
      pendingCases,
      escalatedCases,
      highRiskCases,
      completionRate: totalCases > 0 ? ((verifiedCases / totalCases) * 100).toFixed(1) : 0,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

import express from 'express';
import { getVerificationCases, createVerificationCase, getVerificationCaseById, updateVerificationStatus, getAnalytics } from '../controllers/verificationController';
import { protect, admin } from '../middlewares/authMiddleware';
import delayMiddleware from '../middlewares/delayMiddleware';

const router = express.Router();

router.route('/')
  .get(protect, delayMiddleware, getVerificationCases)
  .post(protect, delayMiddleware, createVerificationCase);

router.route('/analytics')
  .get(protect, delayMiddleware, getAnalytics);

router.route('/:id')
  .get(protect, delayMiddleware, getVerificationCaseById)
  .put(protect, delayMiddleware, updateVerificationStatus);

export default router;

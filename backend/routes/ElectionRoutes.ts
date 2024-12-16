import { Router } from 'express';
import { createElection, getElections, getElectionById, updateElection, deleteElection, getElectionsByFilter
  } from '../controllers/ElectionController';
import authenticateJWT from '../middleware/auth';

const router = Router();

router.post('/elections', authenticateJWT, createElection);
router.get('/elections', getElections);
router.get('/elections/:id', getElectionById);
router.put('/elections/:id', authenticateJWT, updateElection);
router.delete('/elections/:id', authenticateJWT, deleteElection);
router.get('/elections-filter', getElectionsByFilter);

export default router;
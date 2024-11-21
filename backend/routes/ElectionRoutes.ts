import { Router } from 'express';
import { createElection, getElections, getElectionById, updateElection, deleteElection, getCandidatesByElectionId,  } from '../controllers/ElectionController';

const router = Router();

router.post('/elections', createElection);
router.get('/elections', getElections);
router.get('/elections/:id', getElectionById);
router.put('/elections/:id', updateElection);
router.delete('/elections/:id', deleteElection);
router.get('/elections/:id/candidates', getCandidatesByElectionId);

export default router;
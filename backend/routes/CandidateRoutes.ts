import { Router } from 'express';
import { createCandidate, getCandidatesByElectionId, getDetailCandidate, updateCandidate, deleteCandidate } from '../controllers/CandidateController';

const router = Router();

router.post('/candidates', createCandidate);
router.get('/candidates:electionId', getCandidatesByElectionId);
router.get('/candidates/:id:electionId', getDetailCandidate);
router.put('/candidates/:id:electionId', updateCandidate);
router.delete('/candidates/:id:electionId', deleteCandidate);

export default router;
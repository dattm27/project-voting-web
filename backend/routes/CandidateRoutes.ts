import { Router } from 'express';
import { createCandidate, getCandidates, getCandidateById, updateCandidate, deleteCandidate } from '../controllers/CandidateController';

const router = Router();

router.post('/candidates', createCandidate);
router.get('/candidates', getCandidates);
router.get('/candidates/:id', getCandidateById);
router.put('/candidates/:id', updateCandidate);
router.delete('/candidates/:id', deleteCandidate);

export default router;
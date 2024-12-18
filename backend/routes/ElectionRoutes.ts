import { Router } from 'express';
import { createElection, getElections, getElectionById, updateElection, deleteElection, getElectionsByFilter
  } from '../controllers/ElectionController';

const router = Router();

router.post('/elections', createElection);
router.get('/elections', getElections);
router.get('/elections/:id', getElectionById);
router.put('/elections/:id', updateElection);
router.delete('/elections/:id', deleteElection);
router.get('/elections-filter', getElectionsByFilter);

export default router;
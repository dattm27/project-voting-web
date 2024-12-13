import express from "express";
import authenticateJWT from "../middleware/auth";
import {
    createCandidate,
    getCandidatesByElectionId,
    getDetailCandidate,
    updateCandidate,
    deleteCandidate,
} from "../controllers/CandidateController";

const router = express.Router();

router.post("/candidates", authenticateJWT, createCandidate);
router.get("/candidates/:electionId", authenticateJWT, getCandidatesByElectionId);
router.get("/candidates/:id/:electionId", authenticateJWT, getDetailCandidate);
router.put("/candidates/:id/:electionId", authenticateJWT, updateCandidate);
router.delete("/candidates/:id/:electionId", authenticateJWT, deleteCandidate);

export default router;

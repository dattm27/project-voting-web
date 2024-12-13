import { Request, Response } from 'express';
import { Candidate } from '../models/Candidate';
import AppDataSource from '../config/database';
import { CloudinaryServices } from '../services/CloudinaryServices';
import {CustomRequest} from '../middleware/auth';

const candidateRepository = AppDataSource.getRepository(Candidate);

// Create a new candidate
export const createCandidate = async (req: Request, res: Response) : Promise<void> => {
    try {
        const {id, name, birthDay, description, roll, votes, electionId, photoLink} = req.body;
        const candidate = new Candidate(id, name, new Date(birthDay), description, roll, votes, electionId, photoLink);
        const savedCandidate = await candidateRepository.save(candidate);
        res.status(201).json(savedCandidate);
    } catch (error) {
        console.error('ERROR creating candidate', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get all candidates
export const getCandidatesByElectionId = async (req: Request, res: Response) => {
    try {
        const a = (req as CustomRequest).user;
        if(!a){
            res.status(401).json({ message: 'Access token is missing or invalid' });
            return;
        }
        const electionId = req.params.electionId;
        const candidates = await candidateRepository.find(
            { where: { electionId: parseInt(electionId, 10) } },
        );
        res.status(200).json(candidates);
    } catch (error) {
        console.error('ERROR getting candidates', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get a candidate by ID
export const getDetailCandidate = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const electionId = req.params.electionId;
        const candidate = await candidateRepository.findOne({
            where: { id: parseInt(id, 10) , electionId: parseInt(electionId, 10) },
        });
        if (!candidate) {
            res.status(404).json({ error: 'Candidate not found' });
        } else {
            res.status(200).json(candidate);
        }
    } catch (error) {
        console.error('ERROR getting candidate', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Update a candidate by ID
export const updateCandidate = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id;
        const electionId = req.params.electionId;
        const candidate = await candidateRepository.findOne({ 
            where: { id: parseInt(id), electionId: parseInt(electionId) },
        });
        if (!candidate) {
            res.status(404).json({ error: 'Candidate not found' });
            return;
        }

        // Update other fields of Candidate
        candidateRepository.merge(candidate, req.body);
        const updatedCandidate = await candidateRepository.save(candidate);
        res.status(200).json(updatedCandidate);
    } catch (error) {
        console.error('ERROR updating candidate', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Delete a candidate by ID
export const deleteCandidate = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id;
        const electionId = req.params.electionId;
        const candidate = await candidateRepository.findOne({ 
            where: { id: parseInt( id) , electionId: parseInt(electionId)},  
        });
        if (!candidate) {
            res.status(404).json({ error: 'Candidate not found' });
            return;
        }
        const photoLink = candidate.photoLink;
        await CloudinaryServices.getInstance().deleteImageByUrl(photoLink);
        // Delete Candidate
        await candidateRepository.remove(candidate);
        res.status(204).end();
    } catch (error) {
        console.error('ERROR deleting candidate', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
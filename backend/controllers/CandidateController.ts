import { Request, Response } from 'express';
import { Candidate } from '../models/Candidate';
import AppDataSource from '../config/database';
import { CloudinaryServices } from '../services/CloudinaryServices';

const candidateRepository = AppDataSource.getRepository(Candidate);

// Create a new candidate
export const createCandidate = async (req: Request, res: Response) : Promise<void> => {
    try {
        const {name, birthDay, avatarId, description, roll, votes, electionId, photoLink} = req.body;
        const candidate = new Candidate(name, avatarId, new Date(birthDay), description, roll, votes, electionId, photoLink);
        const savedCandidate = await candidateRepository.save(candidate);
        res.status(201).json(savedCandidate);
    } catch (error) {
        console.error('ERROR creating candidate', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get all candidates
export const getCandidates = async (req: Request, res: Response) => {
    try {
        const candidates = await candidateRepository.find();
        res.status(200).json(candidates);
    } catch (error) {
        console.error('ERROR getting candidates', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get a candidate by ID
export const getCandidateById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const candidate = await candidateRepository.findOne({
            where: { id: parseInt(id, 10) },
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
        const candidate = await candidateRepository.findOne({ where: { id: req.body.id }});
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
        const candidate = await candidateRepository.findOne({ where: { id: parseInt( req.params.id) }, relations: ['photo'] });
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
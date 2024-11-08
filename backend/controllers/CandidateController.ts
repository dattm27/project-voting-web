import { Request, Response } from 'express';
import { Candidate } from '../models/Candidate';
import AppDataSource from '../config/database';

const candidateRepository = AppDataSource.getRepository(Candidate);

// Create a new candidate
export const createCandidate = async (req: Request, res: Response) : Promise<void> => {
    try {
        const {name, birthDay, avatarId, description, roll, votes, electionId} = req.body;
        const candidate = new Candidate(name, avatarId, new Date(birthDay), description, roll, votes, electionId);
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
        const candidate = await candidateRepository.findOne(req.body.id);
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
export const updateCandidate = async (req: Request, res: Response) => {
    try {
        const candidate = await candidateRepository.findOne(req.body.id);
        if (!candidate) {
            res.status(404).json({ error: 'Candidate not found' });
        } else {
            candidateRepository.merge(candidate, req.body);
            await candidateRepository.save(candidate);
            res.status(200).json(candidate);
        }
    } catch (error) {
        console.error('ERROR updating candidate', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Delete a candidate by ID
export const deleteCandidate = async (req: Request, res: Response) => {
    try {
        const candidate = await candidateRepository.findOne(req.body.id);
        if (!candidate) {
            res.status(404).json({ error: 'Candidate not found' });
        } else {
            await candidateRepository.delete(candidate);
            res.status(204).end();
        }
    } catch (error) {
        console.error('ERROR deleting candidate', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getCandidateAvatar = async (req: Request, res: Response) => {
    const {id} = req.params;
    try {
        const candidate = await candidateRepository.findOne({
            where: { id: parseInt(id, 10) },
            relations: ['photo'],
        });
        if (!candidate) {
            res.status(404).json({ error: 'Candidate not found' });
        } else {
            res.status(200).json(candidate.photo);
        }
    } catch (error) {
        console.error('ERROR getting candidate avatar', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
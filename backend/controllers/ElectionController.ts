import { Request, Response } from 'express';
import { Election } from '../models/Election';
import AppDataSource from '../config/database';

const electionRepository = AppDataSource.getRepository(Election);

// Create a new election
export const createElection = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, startDate, endDate, description, status } = req.body;
        const election = new Election(name, new Date(startDate), new Date(endDate), description, status);
        const savedElection = await electionRepository.save(election);
        res.status(201).json(savedElection);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all elections
export const getElections = async (req: Request, res: Response) => {
    try {
        const elections = await electionRepository.find();
        res.status(200).json(elections);
    } catch (error) {
        console.error('ERROR getting elections', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get an election by ID
export const getElectionById = async (req: Request, res: Response) => {
    try {
        const election = await electionRepository.findOne(req.body.id);
        if (!election) {
            res.status(404).json({ error: 'Election not found' });
        } else {
            res.status(200).json(election);
        }
    } catch (error) {
        console.error('ERROR getting election', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Update an election by ID
export const updateElection = async (req: Request, res: Response) => {
    try {
        const election = await electionRepository.findOne(req.body.id);
        if (!election) {
            res.status(404).json({ error: 'Election not found' });
        } else {
            electionRepository.merge(election, req.body);
            await electionRepository.save(election);
            res.status(200).json(election);
        }
    } catch (error) {
        console.error('ERROR updating election', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Delete an election by ID
export const deleteElection = async (req: Request, res: Response) => {
    try {
        const election = await electionRepository.findOne(req.body.id);
        if (!election) {
            res.status(404).json({ error: 'Election not found' });
        } else {
            await electionRepository.delete(election);
            res.status(204).end();
        }
    } catch (error) {
        console.error('ERROR deleting election', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getCandidatesByElectionId = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const election = await electionRepository.findOne({
            where: { id: parseInt(id, 10) },
            relations: ['candidates'],
        });

        if (!election) {
            res.status(404).json({ message: 'Election not found' });
        }

        res.status(200).json(election.candidates);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
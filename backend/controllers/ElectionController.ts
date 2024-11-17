import { Request, Response } from 'express';
import { Election } from '../models/Election';
import { DropBoxServices } from '../services/DropboxServices';
import AppDataSource from '../config/database';
import Photo from '../models/Photo';
import Candidate from '../models/Candidate';

const electionRepository = AppDataSource.getRepository(Election);
const candidateRepository = AppDataSource.getRepository(Candidate);
const photoRepository = AppDataSource.getRepository(Photo);
const dropBoxServices = new DropBoxServices();

// Create a new election
export const createElection = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, startDate, endDate, description, status, photoBase64 } = req.body;
        const {photoLink, photoDescription} = await dropBoxServices.convertBase64ToFile(photoBase64);
        const photo = new Photo(photoLink, photoDescription);
        await photoRepository.save(photo);
        const election = new Election(name, new Date(startDate), new Date(endDate), description, status, photo);
        const savedElection = await electionRepository.save(election);
        res.status(201).json(savedElection);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all elections
export const getElections = async (req: Request, res: Response) => {
    try {
        const elections = await electionRepository.find({relations: ['photo']});
        res.status(200).json(elections);
    } catch (error) {
        console.error('ERROR getting elections', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get an election by ID
export const getElectionById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const election = await electionRepository.findOne({
            where: { id: parseInt(id, 10) },
            relations: ['candidates', 'candidates.photo', 'photo'],
        })
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
export const updateElection = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id;
        const { name, startDate, endDate, description, status, photoLink, photoDescription } = req.body;

        const election = await electionRepository.findOne({ where: { id: parseInt(id, 10) } });
        if (!election) {
            res.status(404).json({ error: 'Election not found' });
            return;
        }

        // Update the election fields
        election.name = name;
        election.startDate = new Date(startDate);
        election.endDate = new Date(endDate);
        election.description = description;
        election.status = status;

        // Update the photo if provided
        if (photoLink && photoDescription) {
            if (!election.photo) {
                election.photo = new Photo(photoLink, photoDescription);
            }
            election.photo.link = photoLink;
            election.photo.description = photoDescription;
        }

        const updatedElection = await electionRepository.save(election);
        res.status(200).json(updatedElection);
    } catch (error) {
        console.error('ERROR updating election', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Delete an election by ID
export const deleteElection = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id;
        const election = await electionRepository.findOne({
            where: { id: parseInt(id, 10) },
            relations: ['candidates', 'photo'],
        });

        if (!election) {
            res.status(404).json({ error: 'Election not found' });
            return;
        }

        // Xóa các đối tượng liên quan (candidates và photos)
        if (election.candidates && election.candidates.length > 0) {
            for (const candidate of election.candidates) {
                if (candidate.photo) {
                    await photoRepository.remove(candidate.photo);
                }
                await candidateRepository.remove(candidate);
            }
        }

        if (election.photo) {
            await photoRepository.remove(election.photo);
        }

        // Xóa election
        await electionRepository.remove(election);
        res.status(204).json({ message: 'Election deleted with id ' + id });
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
import e, { Request, Response } from 'express';
import { Election } from '../models/Election';
import { DropBoxServices } from '../services/DropboxServices';
import AppDataSource from '../config/database';
import Candidate from '../models/Candidate';
import { CloudinaryServices } from '../services/CloudinaryServices';

const electionRepository = AppDataSource.getRepository(Election);
const candidateRepository = AppDataSource.getRepository(Candidate);

// Create a new election
export const createElection = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id, name, startDate, endDate, description, status, photoLink } = req.body;
        const election = new Election(id, name, new Date(startDate), new Date(endDate), description, status, photoLink);
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
        const id = req.params.id;
        const election = await electionRepository.findOne({
            where: { id: parseInt(id, 10) },
            relations: ['candidates'],
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

export const getElectionsByFilter = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, isEnd, minVotes, maxVotes } = req.query;
        console.log('title', title);
        console.log('isEnd', isEnd);
        console.log('minVotes', minVotes);
        console.log('maxVotes', maxVotes);

        const queryBuilder = electionRepository.createQueryBuilder('election');

        if (title) {
            queryBuilder.andWhere('election.name LIKE :title', { title: `%${title}%` });
        }

        if (isEnd !== undefined) {
            const now = new Date();
            if (isEnd === 'true') {
                queryBuilder.andWhere('election.endDate < :now', { now });
            } else {
                queryBuilder.andWhere('election.endDate >= :now', { now });
            }
        }

        // if (minVotes !== undefined || maxVotes !== undefined) {
        //     queryBuilder.leftJoinAndSelect('election.candidates', 'candidate');
        //     if (minVotes !== undefined) {
        //         const minVotesInt = parseInt(minVotes as string, 10);
        //         if (!isNaN(minVotesInt)) {
        //             queryBuilder.andWhere('candidate.votes >= :minVotes', { minVotes: minVotesInt });
        //         }
        //     }
        //     if (maxVotes !== undefined) {
        //         const maxVotesInt = parseInt(maxVotes as string, 10);
        //         if (!isNaN(maxVotesInt)) {
        //             queryBuilder.andWhere('candidate.votes <= :maxVotes', { maxVotes: maxVotesInt });
        //         }
        //     }
        // }

        const elections = await queryBuilder.getMany();

        res.status(200).json(elections);
    } catch (error) {
        console.error('LỖI khi lấy các election theo filter', error);
        res.status(500).json({ error: 'Lỗi máy chủ nội bộ' });
    }
};

// Update an election by ID
export const updateElection = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id;
        const election = await electionRepository.findOne({ where: { id: parseInt(id, 10) } });
        if (!election) {
            res.status(404).json({ error: 'Election not found' });
            return;
        }

        // Update the election fields
        electionRepository.merge(election, req.body);
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
            relations: ['candidates'],
        });

        if (!election) {
            res.status(404).json({ error: 'Election not found' });
            return;
        }

        // Xóa các đối tượng liên quan (candidates và photos)
        if (election.candidates && election.candidates.length > 0) {
            for (const candidate of election.candidates) {
                if (candidate.photoLink) {
                    await CloudinaryServices.getInstance().deleteImageByUrl(candidate.photoLink);
                }
                await candidateRepository.remove(candidate);
            }
        }

        if (election.photoLink) {
            await CloudinaryServices.getInstance().deleteImageByUrl(election.photoLink);
        }

        // Xóa election
        await electionRepository.remove(election);
        res.status(204).json({ message: 'Election deleted with id ' + id });
    } catch (error) {
        console.error('ERROR deleting election', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
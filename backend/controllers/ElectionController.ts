import e, { Request, Response } from 'express';
import { Election } from '../models/Election';
import { DropBoxServices } from '../services/DropboxServices';
import { decodeJWT } from 'thirdweb/utils';
import AppDataSource from '../config/database';
import Candidate from '../models/Candidate';
import { CloudinaryServices } from '../services/CloudinaryServices';

const electionRepository = AppDataSource.getRepository(Election);
const candidateRepository = AppDataSource.getRepository(Candidate);

// Create a new election
export const createElection = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id, name, startDate, endDate, description, status, photoLink, walletAddress } = req.body;
        if (!id || !walletAddress) {
            res.status(400).json({ error: 'Missing required fields' });
            return;
        }
        const election = new Election(id, name, new Date(startDate), new Date(endDate), description, status, photoLink, walletAddress);
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
        const { title, isEnd, sortByCandidates, sortByVotes } = req.query;
        console.log('title', title);
        console.log('isEnd', isEnd);
        console.log('sortByCandidates', sortByCandidates);
        console.log('sortByVotes', sortByVotes);

        const queryBuilder = electionRepository.createQueryBuilder('election');

        queryBuilder.leftJoinAndSelect('election.candidates', 'candidate');

        if (title) {
            // Convert title to lowercase for case-insensitive search
            const lowerCaseTitle = title.toString().toLowerCase();
            queryBuilder.andWhere('LOWER(election.name) LIKE :title', { title: `%${lowerCaseTitle}%` });
        }


        if (isEnd !== undefined) {
            const now = new Date();
            if (isEnd === 'true') {
                queryBuilder.andWhere('election.endDate < :now', { now });
            } else {
                queryBuilder.andWhere('election.endDate >= :now', { now });
            }
        }

        const elections = await queryBuilder.getMany();

        if (sortByCandidates === 'true') {
            elections.sort((a, b) => b.candidates.length - a.candidates.length);
        }

        if (sortByVotes === 'true') {
            elections.sort((a, b) => {
                const totalVotesA = a.candidates.reduce((total, candidate) => total + candidate.votes, 0);
                const totalVotesB = b.candidates.reduce((total, candidate) => total + candidate.votes, 0);
                return totalVotesA - totalVotesB;
            });

            elections.map((election) => {
                console.log('Election ' + election.name + ' has total votes: ' + election.candidates.reduce((total, candidate) => total + candidate.votes, 0));
            });
        }

        res.status(200).json(elections);
    } catch (error) {
        console.error('LỖI khi lấy các election theo filter', error);
        res.status(500).json({ error: 'Lỗi máy chủ nội bộ' });
    }
};

// Update an election by ID
export const updateElection = async (req: Request, res: Response): Promise<void> => {
    try {
        const jwt = req.cookies?.jwt;
        if (!jwt) {
            console.log('jwt not exist');
            res.status(401).json({ error: 'Unauthorized because of jwt not exist' });
            return;
        }

        const user = decodeJWT(jwt).payload.sub;
        if (!user) {
            console.log('user not exist');
            res.status(401).json({ error: 'Unauthorized because of user not match' });
            return;
        }

        const id = req.params.id;
        const election = await electionRepository.findOne({ where: { id: parseInt(id, 10) } });
        if (!election) {
            res.status(404).json({ error: 'Election not found' });
            return;
        }

        if (election.walletAddress !== user) {
            res.status(403).json({ error: 'Forbidden' });
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
        const jwt = req.cookies?.jwt;
        if (!jwt) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }

        const user = decodeJWT(jwt).payload.sub;
        if (!user) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }

        const id = req.params.id;
        const election = await electionRepository.findOne({
            where: { id: parseInt(id, 10) },
            relations: ['candidates'],
        });

        if (!election) {
            res.status(404).json({ error: 'Election not found' });
            return;
        }

        if (election.walletAddress !== user) {
            res.status(403).json({ error: 'Forbidden' });
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
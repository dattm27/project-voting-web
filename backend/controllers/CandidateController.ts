import { Request, Response } from 'express';
import { Candidate } from '../models/Candidate';
import Photo from '../models/Photo';
import AppDataSource from '../config/database';
import { CloudinaryServices } from '../services/CloudinaryServices';

const candidateRepository = AppDataSource.getRepository(Candidate);
const photoRepository = AppDataSource.getRepository(Photo);
const cloudinaryServices = new CloudinaryServices

// Create a new candidate
export const createCandidate = async (req: Request, res: Response) : Promise<void> => {
    try {
        const {name, birthDay, avatarId, description, roll, votes, electionId, photoBase64} = req.body;
        const {photoLink, public_id} = await cloudinaryServices.uploadImage(photoBase64);
        const photoDescription = 'Candidate photo';
        const photo = new Photo(photoLink, photoDescription, public_id);
        await photoRepository.save(photo);
        const candidate = new Candidate(name, avatarId, new Date(birthDay), description, roll, votes, electionId, photo);
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
        const candidates = await candidateRepository.find({
            relations: ['photo'],
        });
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
            relations: ['photo'],
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
        const candidate = await candidateRepository.findOne({ where: { id: req.body.id }, relations: ['photo'] });
        if (!candidate) {
            res.status(404).json({ error: 'Candidate not found' });
            return;
        }

        // Check if there is new Photo information in the request
        const { photoBase64 } = req.body;
        const { photoLink, public_id } = photoBase64 ? await cloudinaryServices.uploadImage(photoBase64) : {};
        const photoDescription = 'Candidate photo';
        if (photoLink && photoDescription) {
            // Delete old Photo if exists
            if (candidate.photo) {
                cloudinaryServices.deleteImage(candidate.photo.public_id);
                candidate.photo.link = photoLink;
                candidate.photo.description = photoDescription;
                candidate.photo.public_id = public_id;
                await photoRepository.save(candidate.photo);
            } else {
                // Create and save new Photo if no current Photo
                const newPhoto = new Photo(photoLink, photoDescription, public_id);
                const savedPhoto = await photoRepository.save(newPhoto);
                candidate.photo = savedPhoto;
            }
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

        // Delete Candidate
        await candidateRepository.remove(candidate);

        // Delete Photo if exists
        if (candidate.photo) {
            await photoRepository.remove(candidate.photo);
        }
        res.status(204).end();
    } catch (error) {
        console.error('ERROR deleting candidate', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getCandidateAvatar = async (req: Request, res: Response) => {
    const { id } = req.params;
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
};
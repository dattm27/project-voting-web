import { Request, Response } from 'express';
import { Candidate } from '../models/Candidate';
import Photo from '../models/Photo';
import AppDataSource from '../config/database';
import { DropBoxServices } from '../services/DropboxServices';

const candidateRepository = AppDataSource.getRepository(Candidate);
const photoRepository = AppDataSource.getRepository(Photo);
const dropBoxServices = new DropBoxServices();

// Create a new candidate
export const createCandidate = async (req: Request, res: Response) : Promise<void> => {
    try {
        const {name, birthDay, avatarId, description, roll, votes, electionId, photoBase64} = req.body;
        const {photoLink, photoDescription} = await dropBoxServices.convertBase64ToFile(photoBase64);
        const photo = new Photo(photoLink, photoDescription);
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
        const candidates = await candidateRepository.find(
            {
                relations: ['photo'],
            }
        );
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
        const candidate = await candidateRepository.findOne(
            {
                where: { id: parseInt(id, 10) },
                relations: ['photo'],
            }
        );
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
export const updateCandidate = async (req: Request, res: Response) : Promise<void> => {
    try {
        const candidate = await candidateRepository.findOne({ where: { id: req.body.id }, relations: ['photo'] });
        if (!candidate) {
            res.status(404).json({ error: 'Candidate not found' });
        }

        // Kiểm tra xem có thông tin Photo mới trong yêu cầu hay không
        const { photoBase64 } = req.body;
        const { photoLink, photoDescription } = photoBase64 ? await dropBoxServices.convertBase64ToFile(photoBase64) : {};
        if (photoLink && photoDescription) {
            // Xóa Photo cũ nếu có
            if (candidate.photo) {
                candidate.photo.link = photoLink;
                candidate.photo.description = photoDescription;
                await photoRepository.save(candidate.photo);
            } else {
                // Tạo và lưu Photo mới nếu không có Photo hiện tại
                const newPhoto = new Photo(photoLink, photoDescription);
                const savedPhoto = await photoRepository.save(newPhoto);
                candidate.photo = savedPhoto;
            }
        }

        // Cập nhật các trường khác của Candidate
        candidateRepository.merge(candidate, req.body);
        const updatedCandidate = await candidateRepository.save(candidate);
        res.status(200).json(updatedCandidate);
    } catch (error) {
        console.error('ERROR updating candidate', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
// Delete a candidate by ID
export const deleteCandidate = async (req: Request, res: Response) : Promise<void> => {
    try {
        const candidate = await candidateRepository.findOne({ where: { id: req.body.id }, relations: ['photo'] });
        if (!candidate) {
            res.status(404).json({ error: 'Candidate not found' });
        }

        // Xóa Photo nếu có
        if (candidate.photo) {
            await photoRepository.remove(candidate.photo);
        }

        // Xóa Candidate
        await candidateRepository.remove(candidate);
        res.status(204).end();
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
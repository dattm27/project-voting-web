import AppDataSource from '../config/database';
import { Photo } from '../models/Photo';

const photoRepository = AppDataSource.getRepository(Photo);

const createPhoto = async (req, res) => {
    try {
        const { link, description, public_id } = req.body;
        const photo = new Photo(link, description, public_id);
        console.log('photo', photo);
        const savedPhoto = await photoRepository.save(photo);
        res.status(201).json(savedPhoto);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getPhotos = async (req, res) => {
    try {
        const photos = await photoRepository.find();
        res.status(200).json(photos);
    }
    catch (err) {
        console.error('ERROR getting photos', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getPhotoById = async (req, res) => {
    try {
        const photo = await photoRepository.findOne(req.params.id);
        if (!photo) {
            res.status(404).json({ error: 'Photo not found' });
        }
        res.status(200).json(photo);
    }
    catch (err) {
        console.error('ERROR getting photo', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const updatePhoto = async (req, res) => {
    try {
        const photo = await photoRepository.findOne(req.params.id);
        if (!photo) {
            res.status(404).json({ error: 'Photo not found' });
        } else {
            photoRepository.merge(photo, req.body);
            await photoRepository.save(photo);
            res.status(200).json(photo);
        }
        res.status(200).json(photo);
    }
    catch (err) {
        console.error('ERROR updating photo', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const deletePhoto = async (req, res) => {
    try {
        const photo = await photoRepository.findOne(req.params.id);
        if (!photo) {
            res.status(404).json({ error: 'Photo not found' });
        }
        else {
            await photoRepository.delete(photo);
            res.status(204).end();
        }
    }
    catch (err) {
        console.error('ERROR deleting photo', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export { createPhoto, getPhotos, getPhotoById, updatePhoto, deletePhoto };
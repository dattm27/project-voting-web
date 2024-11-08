import { Router } from 'express';
import { createPhoto, getPhotos, getPhotoById, updatePhoto, deletePhoto } from '../controllers/PhotoController';

const router = Router();

router.post('/photos', createPhoto);
router.get('/photos', getPhotos);
router.get('/photos/:id', getPhotoById);
router.put('/photos/:id', updatePhoto);
router.delete('/photos/:id', deletePhoto);

export default router;
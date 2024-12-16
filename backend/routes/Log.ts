import express from 'express';
import LoginController from '../controllers/Login';
const router = express.Router();

router.get('/isLoggedIn', LoginController.isLogin);
router.get('/logout', LoginController.logout);

export default router;
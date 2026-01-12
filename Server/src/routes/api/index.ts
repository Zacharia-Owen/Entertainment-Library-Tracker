import { Router } from 'express';
import authRoutes from './auth-routes';
import bookRoutes from './books-routes';
import gamesRoutes from './games-routes';
import moviesRoutes from './movies-routes';
import showsRoutes from './shows-routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/books', bookRoutes);
router.use('/games', gamesRoutes);
router.use('/movies', moviesRoutes);
router.use('/shows', showsRoutes);

export default router;
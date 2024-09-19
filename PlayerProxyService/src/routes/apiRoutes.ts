import { Router } from 'express';
import * as playersController from '../controllers/playersController';

const router = Router();

router.get('/players', playersController.getPlayersWithPagination);
router.get('/players/:player_id', playersController.getPlayerById);

export default router;
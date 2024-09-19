import { Request, Response, NextFunction } from 'express';
import { ERROR_INVALID_QUERY_PARAMS, ERROR_PLAYER_NOT_FOUND } from '../utils/constants';
import { createAppError } from '../utils/errorUtils';
import { Player } from '../types/Player';
import * as playersService from '../services/playersService';

const getPlayersWithPagination = async (req: Request, res: Response, next: NextFunction) => {
    
    const page = parseInt(req.query.page as string);
    const limit = parseInt(req.query.limit as string);
    const searchQuery = req.query.search ? (req.query.search as string).trim() : '';
    const position = req.query.position ? (req.query.position as string).trim() : '';
    
    if (isNaN(page) || isNaN(limit) || page <= 0 || limit <= 0) {
        return next(createAppError(ERROR_INVALID_QUERY_PARAMS, 400));
    }
    try {
        const result = await playersService.getPlayers(page, limit, searchQuery, position);
        return res.json(result);
    } catch (error) {
         next(error);
    }
};

const getPlayerById = async (req: Request, res: Response, next: NextFunction) => {
    const playerId = req.params.player_id;

    if (!playerId) {
        return next(createAppError(ERROR_INVALID_QUERY_PARAMS, 400));
    }

    try {
        const player = await playersService.getPlayerById(playerId);
        
        if (!player) {
            return next(createAppError(ERROR_PLAYER_NOT_FOUND(playerId), 404));
        }

        return res.json(player);
    } catch (error) {
        next(error);
    }
};

export { getPlayersWithPagination, getPlayerById };
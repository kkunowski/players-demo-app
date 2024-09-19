import axios from 'axios';
import { paginateArray } from '../utils/arrayUtils';
import { config } from '../config/config';
import { Player } from '../types/Player';
import { PaginatedItems } from '../types/PaginatedItems';

const fetchAllPlayers = async (): Promise<Player[]> => {
  const { data } = await axios.get(config.apiBaseUrl, {
    timeout: config.apiTimeout
  });
  return Object.values(data) as Player[];
};

const getPlayers = async (page: number, limit: number, searchQuery: string, position: string): Promise<PaginatedItems<Player>> => {
    const players = await fetchAllPlayers();
    const filteredPlayers = players.searchByFullName(searchQuery).filterByPosition(position);
    return paginateArray(filteredPlayers, page, limit);
};

const getPlayerById = async (playerId: string): Promise<Player | null> => {
    const players = await fetchAllPlayers();
    const player = players.findPlayerById(playerId);
    return player ? player : null;
};

export { getPlayers, getPlayerById };
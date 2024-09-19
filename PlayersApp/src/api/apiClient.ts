import axios from 'axios';
import { apiConfig } from '../config/config';
import { PaginatedItems } from '../types/Player';

const apiClient = axios.create({
  baseURL: apiConfig.baseURL,
  timeout: apiConfig.timeout,
});

export const getPlayers = async (
  page: number,
  limit: number,
  searchQuery: string,
  selectedPosition: string
): Promise<PaginatedItems<Player>> => {
  const { data } = await apiClient.get(`/players`, {
    params: {
      page,
      limit,
      search: searchQuery,
      position: selectedPosition,
    },
  });
  return data;
};

export default apiClient;
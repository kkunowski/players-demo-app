export const ERROR_INVALID_QUERY_PARAMS = 'Invalid or missing query parameters: page and limit must be positive numbers';
export const ERROR_INTERNAL_SERVER = 'Internal Server Error';
export const ERROR_PLAYER_NOT_FOUND = (playerId: string) => `Player with id ${playerId} not found`;
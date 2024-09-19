import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';
import { getPlayers as fetchPlayersApi } from '../../api/apiClient';
import { Player, PaginatedItems } from '../../types/Player';
import { RootState } from '../store';

export const FETCH_PLAYERS_REQUEST = 'FETCH_PLAYERS_REQUEST';
export const FETCH_PLAYERS_SUCCESS = 'FETCH_PLAYERS_SUCCESS';
export const FETCH_PLAYERS_FAILURE = 'FETCH_PLAYERS_FAILURE';

const fetchPlayersRequest = () => ({
  type: FETCH_PLAYERS_REQUEST,
});

const fetchPlayersSuccess = (data: PaginatedItems<Player>, reset: boolean) => ({
  type: FETCH_PLAYERS_SUCCESS,
  payload: data,
  reset,
});

const fetchPlayersFailure = (error: string) => ({
  type: FETCH_PLAYERS_FAILURE,
  payload: error,
});

export const fetchPlayers = (
  page: number,
  limit: number,
  searchQuery: string,
  selectedPosition: string,
  reset: boolean = false
): ThunkAction<void, RootState, null, AnyAction> => {
  return async (dispatch) => {
    dispatch(fetchPlayersRequest());
    try {
      const data = await fetchPlayersApi(page, limit, searchQuery, selectedPosition);
      dispatch(fetchPlayersSuccess(data, reset));
    } catch (error) {
      dispatch(fetchPlayersFailure(error.message || 'Failed to fetch players'));
    }
  };
};

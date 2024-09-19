import {
  FETCH_PLAYERS_REQUEST,
  FETCH_PLAYERS_SUCCESS,
  FETCH_PLAYERS_FAILURE,
} from '../actions/playersActions';
import { Player } from '../../types/Player';

interface PlayersState {
  data: Player[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  page: number;
}

const initialState: PlayersState = {
  data: [],
  loading: false,
  error: null,
  hasMore: true,
  page: 1,
};

export const playersReducer = (state = initialState, action: any): PlayersState => {
  switch (action.type) {
    case FETCH_PLAYERS_REQUEST:
      return { ...state, loading: true };
    case FETCH_PLAYERS_SUCCESS:
      return {
        ...state,
        data: action.reset ? action.payload.items : [...state.data, ...action.payload.items],
        loading: false,
        hasMore: action.payload.items.length > 0 && action.payload.currentPage < action.payload.totalPages,
        page: action.reset ? 2 : state.page + 1,
        error: null
      };
    case FETCH_PLAYERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
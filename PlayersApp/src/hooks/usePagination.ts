import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlayers } from '../store/actions/playersActions';
import { RootState } from '../store/store';

export const usePagination = (filters: { searchQuery: string; selectedPosition: string }) => {
  const dispatch = useDispatch();
  const { data, loading, hasMore, page, error } = useSelector((state: RootState) => state.players);

  useEffect(() => {
    if (!loading) {
      dispatch(fetchPlayers(1, 10, filters.searchQuery, filters.selectedPosition, true));
    }
  }, [filters, dispatch, error]);

  const loadMore = useCallback(() => {
    if (hasMore && !loading && !error) {
      dispatch(fetchPlayers(page, 10, filters.searchQuery, filters.selectedPosition));
    }
  }, [hasMore, loading, page, filters, error, dispatch]);

  return { data, loading, hasMore, loadMore, error };
};

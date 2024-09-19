import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import PlayersView from '../src/views/PlayersView';
import { usePagination } from '../src/hooks/usePagination';
import { Player } from '../src/types/Player';

jest.mock('../src/hooks/usePagination');
const mockUsePagination = usePagination as jest.Mock;

const players: Player[] = [
  { player_id: '1', full_name: 'John Doe 1', position: 'RB' },
  { player_id: '2', full_name: 'Jane Doe 2', position: 'QB' },
  { player_id: '3', full_name: 'David Smith', position: 'WR' },
  { player_id: '4', full_name: 'Peter Johnson', position: 'TE' },
  { player_id: '5', full_name: 'John Brown', position: 'RB' }
];

describe('PlayersView', () => {
  beforeEach(() => {
    mockUsePagination.mockReturnValue({
      data: players,
      loading: false,
      hasMore: true,
      loadMore: jest.fn(),
      error: null,
    });
  });

  it('should render players list correctly', () => {
    const { getByText } = render(
      <NavigationContainer>
        <PlayersView />
      </NavigationContainer>
    );
    expect(getByText('John Doe 1 - RB')).toBeTruthy();
    expect(getByText('Jane Doe 2 - QB')).toBeTruthy();
    expect(getByText('David Smith - WR')).toBeTruthy();
    expect(getByText('Peter Johnson - TE')).toBeTruthy();
    expect(getByText('John Brown - RB')).toBeTruthy();
  });

  it('should filter players based on search query', async () => {
    const { getByPlaceholderText, getByText, queryByText } = render(
      <NavigationContainer>
        <PlayersView />
      </NavigationContainer>
    );

    const searchInput = getByPlaceholderText('Search by full name');

    expect(getByText('John Doe 1 - RB')).toBeTruthy();
    expect(getByText('Jane Doe 2 - QB')).toBeTruthy();
    expect(getByText('David Smith - WR')).toBeTruthy();
    expect(getByText('Peter Johnson - TE')).toBeTruthy();
    expect(getByText('John Brown - RB')).toBeTruthy();

    mockUsePagination.mockReturnValueOnce({
      data: [
        { player_id: '1', full_name: 'John Doe 1', position: 'RB' },
        { player_id: '3', full_name: 'David Smith', position: 'WR' }
      ],
      loading: false,
      hasMore: true,
      loadMore: jest.fn(),
      error: null,
    });

    fireEvent.changeText(searchInput, 'd');

    await waitFor(() => {
      expect(getByText('John Doe 1 - RB')).toBeTruthy();
      expect(getByText('David Smith - WR')).toBeTruthy();
      expect(queryByText('Jane Doe 2 - QB')).toBeNull();
      expect(queryByText('Peter Johnson - TE')).toBeNull();
      expect(queryByText('John Brown - RB')).toBeNull();
    });
  });
});

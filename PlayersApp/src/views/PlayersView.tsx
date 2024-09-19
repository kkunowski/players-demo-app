import React, { useState, useEffect, useCallback } from 'react';
import { FlatList, View, Text, TextInput, TouchableOpacity, ActivityIndicator, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { usePagination } from '../hooks/usePagination';
import { Player } from '../types/Player';
import commonStyles from '../styles/commonStyles';

const positionOptions = ["K", "G", "TE", "RB", "QB", "RW", "P"];

const PlayersView: React.FC = () => {
  const [filters, setFilters] = useState({ searchQuery: '', selectedPosition: '' });
  const [debouncedFilters, setDebouncedFilters] = useState(filters);

  const navigation = useNavigation();
  const { data, loading, hasMore, loadMore, error } = usePagination(debouncedFilters);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedFilters(filters);
    }, 500);
    return () => {
      clearTimeout(handler);
    };
  }, [filters]);

  const handleSearchChange = (text: string) => {
    setFilters((prev) => ({ ...prev, searchQuery: text }));
  };

  const handleSelectPosition = (position: string) => {
    setFilters((prev) => ({
      ...prev,
      selectedPosition: prev.selectedPosition === position ? '' : position,
    }));
  };

  const renderPlayerItem = useCallback(
    ({ item }: { item: Player }) => (
      <TouchableOpacity onPress={() => navigation.navigate('PlayerDetailsView', { player: item })}>
        <View style={commonStyles.playerItem}>
          <Text style={commonStyles.subtitleText}>{item.full_name} - {item.position}</Text>
        </View>
      </TouchableOpacity>
    ),
    [navigation]
  );

  const renderFooter = () => {
    return loading ? <ActivityIndicator style={{ marginVertical: 20 }} /> : null;
  };

  const renderEmptyComponent = () => (
    <View style={commonStyles.emptyContainer}>
      <Text style={commonStyles.bodyText}>No players found.</Text>
    </View>
  );

  const renderErrorComponent = () => {
    return error ? (
      <View style={commonStyles.errorContainer}>
        <Text style={commonStyles.errorText}>Error: {error}</Text>
      </View>
    ) : null;
  };

  const renderPositionFilters = () => (
    <View style={commonStyles.positionFilterContainer}>
      {positionOptions.map((position) => (
        <Button
          key={position}
          title={position}
          onPress={() => handleSelectPosition(position)}
          color={filters.selectedPosition === position ? 'blue' : 'gray'}
        />
      ))}
    </View>
  );

  return (
    <View style={commonStyles.container}>
      {/* Search Input */}
      <TextInput
        style={commonStyles.searchInput}
        placeholder="Search by full name"
        value={filters.searchQuery}
        onChangeText={handleSearchChange}
      />

      {renderPositionFilters()}

      {renderErrorComponent()}

      <FlatList
        data={data}
        renderItem={renderPlayerItem}
        keyExtractor={(player) => player.player_id}
        ListEmptyComponent={renderEmptyComponent}
        ListFooterComponent={renderFooter}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

export default PlayersView;
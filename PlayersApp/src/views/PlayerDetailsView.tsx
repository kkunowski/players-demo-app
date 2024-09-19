import React from 'react';
import { View, Text } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import { Player } from '../types/Player';
import commonStyles from '../styles/commonStyles';

type PlayerDetailsViewProps = {
  route: RouteProp<RootStackParamList, 'PlayerDetailsView'>;
};

const PlayerDetailsView: React.FC<PlayerDetailsViewProps> = ({ route }) => {
  const { player } = route.params;

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.titleText}>ID: {player.player_id}</Text>
      <Text style={commonStyles.subtitleText}>Name: {player.full_name}</Text>
      <Text style={commonStyles.subtitleText}>Position: {player.position}</Text>
    </View>
  );
};

export default PlayerDetailsView;
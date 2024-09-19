import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PlayersView from './views/PlayersView';
import PlayerDetailsView from './views/PlayerDetailsView';
import { Player } from './types/Player';
import { Provider } from 'react-redux';
import { store } from './store/store';

export type RootStackParamList = {
  PlayersView: undefined;
  PlayerDetailsView: { player: Player };
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="PlayersView">
          <Stack.Screen name="PlayersView" component={PlayersView} options={{ title: 'Players' }} />
          <Stack.Screen name="PlayerDetailsView" component={PlayerDetailsView} options={{ title: 'Player Details' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
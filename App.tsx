import { StyleSheet, Text, View, ImageBackground, Image } from 'react-native'
import React, { useEffect } from 'react';
import Welcome from './src/screens/Welcome';
import Game from './src/screens/Game';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { hideNavigationBar } from 'react-native-navigation-bar-color';

type RootStackParamList = {
  Welcome: undefined;
  Game: undefined;
};

const App = () => {


  const Stack = createNativeStackNavigator<RootStackParamList>();
  const hideBottomNav = () => {
    hideNavigationBar();
  };
  useEffect(() => {
    hideBottomNav();
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Game" component={Game} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({

})
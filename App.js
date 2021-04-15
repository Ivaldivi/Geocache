//import * as React from 'react';
import React, { useState, useEffect } from 'react';
import { Text, Button, View, StyleSheet, Dimensions, Image, TouchableOpacity, DeviceEventEmitter } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import UserMap from './components/UserMap';
import GoalMap from './components/GoalMap';
import Compass from './components/Compass';

const { width, height } = Dimensions.get('window');

const Stack = createStackNavigator();

function App() {
  return (
    <NavigateStack />
  )
}

const NavigateStack = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='home'
          component={HomeScreen}
          options={{ title: 'Home' }} />
        <Stack.Screen
          name='map'
          component={MapScreen}
          options={{ title: 'Map' }} />
        <Stack.Screen
          name='compass'
          component={CompassScreen}
          options={{ title: 'Compass' }} />
        <Stack.Screen
          name = 'victory'
          component = {VictoryScreen}
          options = {{title: 'Victory'}} />
        <Stack.Screen
          name = 'goals'
          component = {GoalsScreen}
          options = {{title: 'Goals'}} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const MapScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <UserMap/>
      <Button
        title="Switch to Home Screen"
        onPress={() =>
          navigation.navigate('home')} />
    </View>
  )
}

const GoalsScreen  = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <GoalMap/>
      <Button
        title="Switch to Home Screen"
        onPress={() =>
          navigation.navigate('home')} />
    </View>
  )
}

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Button
        title="Switch to Compass Screen"
        onPress={() =>
          navigation.navigate('compass')} />
      <Button
        title="Switch to Map Screen"
        onPress={() =>
          navigation.navigate('map')} />
      <Button
        title="Switch to Goals Screen"
        onPress={() =>
          navigation.navigate('goals')} />
    </View>

  )
}

const VictoryScreen = ({navigation}) => {

  const [subscription, setSubscription] = useState(null);
  const [magnetometer, setMagnetometer] = useState(0);
  return (
  <View>
    <Button
    title = "Congratulations! You spotted Scot! Press here to return to the home screen"
    onPress={() =>
      navigation.navigate('home')} />
  </View>
    )
}
const CompassScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Compass style={styles.compass}/>
    </View>
      )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  bubble: {
    backgroundColor: 'rgba(0, 0, 255, 0.3)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  centeredText: { textAlign: 'center' },

  compass: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.8
  }
});

export default App;

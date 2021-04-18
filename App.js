//import * as React from 'react';
import React, { useState, useEffect, useRef } from 'react';
import { Text, Button, View, StyleSheet, Dimensions, Image, TouchableOpacity, DeviceEventEmitter } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as geolib from 'geolib';
import UserMap from './components/UserMap';
import GoalMap from './components/GoalMap';
import Compass from './components/Compass';
import { Component } from 'react';
import UserMap2 from './components/UserMap2';
import GoalCoords from './components/GoalCoords';


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

  //Code used for how to find coordinates: https://dev-yakuza.posstree.com/en/react-native/react-native-geolocation-service/#how-to-get-current-geolocation
  const [location, setLocation] = useState(0);


  //Constantly checks user position and sees if within distance of goal coordinates. 
  //If close enough, changes to victory screen. 
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        if(geolib.getDistance(position.coords,position.coords) <= 0){
          navigation.navigate('victory');
        }
      }
    )
  }
  );

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
  //TODO: eventually use victory component with goal coordinates as a prop
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
  //Constantly checks user position and sees if within distance of goal coordinates. 
  //If close enough, changes to victory screen. 
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        if(geolib.getDistance(position.coords,position.coords) <= 0){
          navigation.navigate('victory');
        }
      }
    )
  }
  );
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

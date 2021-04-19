//import * as React from 'react';
import React, { useState, useEffect, useRef } from 'react';
import { Text, Button, View, StyleSheet, Dimensions, Image, TouchableOpacity, DeviceEventEmitter } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as geolib from 'geolib';
import UserMap from './components/UserMap';
import Compass from './components/Compass';
import { Component } from 'react';
import UserMap2 from './components/UserMap2';
import Victory from './components/Victory';
import MapView, {Marker} from 'react-native-maps';


const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const Stack = createStackNavigator();

function App() {
  global.goalCache = 0; 
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
        if(geolib.getDistance(position.coords,global.goalCache) <= 0){
          navigation.navigate('victory');
        }
      }
    )
  }
  );

  return (
    <View style={styles.container}>
      <UserMap/>
      {/* <Button
        title="Switch to Home Screen"
        onPress={() =>
          navigation.navigate('home')} /> */}
      <Button
        title="Switch to Compass Screen"
        onPress={() =>
          navigation.navigate('compass')} />
    </View>
  )
}

const GoalsScreen  = ({ navigation }) => {
  const ScottMarker = props =>{
    return(
        <MapView.Marker 
            coordinate={props.coordinates}
            title={props.title}
            key={Marker.snellAndGrand}
            image={require("./components/images/scot.png")}
            onPress={()=> {global.goalCache = props.coordinates; navigation.navigate('map');}}
          />
    )
  }
  return (
      <View style = {styles.mapContainer}>
        <MapView
                initialRegion={{
                    latitude: (44.94000),
                    longitude: (-93.1746),
                    latitudeDelta: 0.0922,
                    longitudeDelta:  0.0922 * ASPECT_RATIO,
                  }}
                showsUserLocation = {true}
                style ={styles.map}>
                <ScottMarker coordinates = {{latitude: 44.9379, longitude: -93.168869019}} title = "Snelling and Grand Cache"/>
                <ScottMarker coordinates = {{latitude: 44.9416, longitude: -93.1974}} title = "River Cache"/>
                <ScottMarker coordinates = {{latitude:44.934412433560745, longitude: -93.1777188451171}} title = "The Tap Cache"/>
                <ScottMarker coordinates = {{latitude:44.94031596574141, longitude: -93.16657303880767}} title = "BreadSmith Cache"/>                  
                <ScottMarker coordinates = {{latitude:44.941529947250395, longitude: -93.18443394690537}} title = "The Rest Cache" />                  
                    {/* Takes the user to a bench on summit : ) */}

                </MapView>
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
      {/* <Button
        title="Switch to Compass Screen"
        onPress={() =>
          navigation.navigate('compass')} /> */}
      {/* <Button
        title="Switch to Map Screen"
        onPress={() =>
          navigation.navigate('map')} /> */}
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
    <Victory/>
  </View>
    )
}
const CompassScreen = ({ navigation }) => {
  //Constantly checks user position and sees if within distance of goal coordinates. 
  //If close enough, changes to victory screen. 
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        //must take into account if global.goalcache is not coordinates.... 
        if(geolib.getDistance(position.coords,global.goalCache) <= 0){
          navigation.navigate('victory');
        }
      }
    )
  }
  );
  return (
    <View style={styles.container}>
      <Compass style={styles.compass}/>
      <Button
        title="Switch to Map Screen"
        onPress={() =>
          navigation.navigate('map')} />
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
    mapContainer: {
        width: 350,
        height: 600, 
        alignSelf: 'center', 
        marginBottom: 20,
        marginTop: 20
    }, 
    map: {
        width: '100%', 
        height: '100%', 
        marginBottom: 0, 
        alignSelf: 'center'
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

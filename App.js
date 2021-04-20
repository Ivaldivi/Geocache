//import * as React from 'react';
import React, { useState, useEffect, useRef } from 'react';
import { Text, Button, View, StyleSheet, Dimensions, Image, TouchableOpacity, DeviceEventEmitter, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as geolib from 'geolib';
import UserMap from './components/UserMap';
import Compass from './components/Compass';
import { Component } from 'react';
import UserMap2 from './components/UserMap2';
import Victory from './components/Victory';
import About from './components/About';
import MapView, {Marker} from 'react-native-maps';
import { apisAreAvailable } from 'expo';
import { Grid, Col, Row } from "react-native-easy-grid";


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
          component={WelcomeScreen}
          options={{ title: 'Mac Cache' }} />
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
          <Stack.Screen
          name='AboutPage'
          component={AboutPage}
          options={{ title: 'About' }} />
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
      <View style={{alignContent: 'center', flexDirection:"row" }}>
        <TouchableOpacity activeOpacity={0.5} onPress={() =>
          navigation.navigate('home')}>
          <Image
            source={require('./components/images/home.png')}
            style={styles.ImageIconStyle}
            backgroundColor= 'orange'
            borderRadius = {5}
            height= {25}
            width = {25}
            justifyContent= 'left'
            marginTop = {15}
            marginRight = {10}
          />
          </TouchableOpacity>
          </View>
      <UserMap/>
      <View style = {styles.otherB}>
        <Button 
          style = {styles.otherB}
          title="Compass"
          color = '#fff'
          onPress={() =>
            navigation.navigate('compass')} />
      </View>
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
    <View style = {styles.container}>
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
    </View>
     <View style = {styles.otherB}>
      <Button 
        style = {styles.otherB}
        title="Home"
        color = '#fff'
        onPress={() =>
          navigation.navigate('home')} />
      </View>
  </View>
  )
}

const WelcomeScreen = ({ navigation }) => {
  return (

    <View style = {styles.welcomePg}>
      <View style={styles.imgz}>
          <Image source={require('./components/images/macCache.png')}/>
      </View>
      <View style = {styles.welcomeB}>
          <Button 
            style = {styles.welcomeB}
            title = "Start"
            color = '#fff'
            onPress={() =>
              navigation.navigate('goals')}/>
        </View>
        <View style = {styles.welcomeB}>
          <Button 
            style = {styles.welcomeB}
            title="About"
            color = '#fff'
            onPress={() =>
              navigation.navigate('AboutPage')} />
        </View>
          
      
      
    </View>
  )
}


const AboutPage = ({ navigation }) => {
  return (
 <View>
    <About/>
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
      <View style = {styles.otherB}>
        <Button 
          style = {styles.otherB}
          title="Map"
          color = '#fff'
          onPress={() =>
            navigation.navigate('map')} />
      </View>
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

  centeredText: { textAlign: 'center' },

  compass: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.8,
    backgroundColor: 'orange', 
  }, 
  imgz: {
    width: 375,
    height: 375,
    alignContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#214683', 
    marginBottom: -10
  },
  welcomePg: {
    alignItems: 'center',
    backgroundColor: `#214683`,
    height: Dimensions.get('window').height,
    flex: 1,
    justifyContent: 'flex-start',
    
  },
  welcomeB: {
      backgroundColor: 'rgba(223, 108, 22, .9)',
      paddingHorizontal: 18,
      paddingVertical: 10,
      borderRadius: 20,
      alignContent: 'center', 
      color: 'white',
      marginBottom: 45,
      display: 'flex'
    }, 
  otherB: {
      backgroundColor: 'orange',
      paddingHorizontal: 18,
      paddingVertical: 5,
      borderRadius: 20,
      color: 'white',
      width: '50%', 
      bottom: 0, 
      top: 0, 
      alignItems: 'center',
    }, 
    AboutPageP: {
      fontSize: 15, 
      fontWeight: 'normal', 
      backgroundColor: 'rgba(223, 108, 22, 1)', 
      textAlign: 'justify', 
      marginRight: 5,
      marginLeft: 5, 
      lineHeight: 25, 
      color: 'white'
    }
});

export default App;

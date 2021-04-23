//import * as React from 'react';
import React, { useState, useEffect} from 'react';
import { Text, Button, View, StyleSheet, Dimensions, Image, TouchableOpacity, DeviceEventEmitter, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as geolib from 'geolib';
import UserMap from './components/UserMap';
import Compass from './components/Compass';
import Victory from './components/Victory';
import About from './components/About';
import MapView, { Marker } from 'react-native-maps';


const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const Stack = createStackNavigator();

function App() {
  global.goalCache = 0; //Global variable containing goal coordinates
  return (
    <NavigateStack />
  )
}


//Handles navigation between different screens
const NavigateStack = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator   
      screenOptions={{headerShown: false}}>
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
          name='victory'
          component={VictoryScreen}
          options={{ title: 'Victory' }} />
          
        <Stack.Screen
          name='goals'
          component={GoalsScreen}
          options={{ title: 'Goals' }} />
        <Stack.Screen
          name='AboutPage'
          component={AboutPage}
          options={{ title: 'About' }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

//Uses Map component visual and allows to switch to compass screen
const MapScreen = ({ navigation }) => {
  //Code used for how to find coordinates: https://dev-yakuza.posstree.com/en/react-native/react-native-geolocation-service/#how-to-get-current-geolocation

  //Constantly checks user position and sees if within distance of goal coordinates. 
  //If close enough, changes to victory screen. 
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (geolib.getDistance(position.coords, global.goalCache) <= 0) {
          navigation.navigate('victory');
        }
      }
    )
  }
  );

  return (
    <View style={styles.mapContainer} backgroundColor = {'orange'}>
      <UserMap style={styles.map, StyleSheet.absoluteFillObject} />
      <View style={{ position: 'absolute', top: 100, left: 50 }}/>
      <View style={styles.otherB}> 
        <Button
          style={styles.otherB}
          title="Compass"
          color='#fff'
          onPress={() =>
            navigation.navigate('compass')} />
       </View>
    </View>
  )
}

//Uses Compass component and allows to switch to Map Screen. 
const CompassScreen = ({ navigation }) => {
  //Constantly checks user position and sees if within distance of goal coordinates. 
  //If close enough, changes to victory screen. 
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        //must take into account if global.goalcache is not coordinates.... 
        if (geolib.getDistance(position.coords, global.goalCache) >= 0) {
          navigation.navigate('victory');
        }
      }
    )
  }
  );

  return (
    <View style={styles.compassContainer}>
      <Compass style={styles.compass, StyleSheet.absoluteFillObject} />
      <View style={{ position: 'absolute', top: 100, left: 50 }}/>
      <View style={styles.otherB}>
        <Button
          style={styles.otherB}
          title="Map"
          color='#fff'
          onPress={() =>
            navigation.navigate('map')} />
      </View>
    </View>
  )
}

//A google-maps styled screen displaying goal markers as Mac the Scot. 
//Users can view their location and goals, and select a goal by pressing on one of the Mac the Scot goal markers.
const GoalsScreen = ({ navigation }) => {
  const ScottMarker = props => {
    return (
      <MapView.Marker
        coordinate={props.coordinates}
        title={props.title}
        key={Marker.snellAndGrand}
        image={require("./components/images/scot.png")}
        onPress={() => { global.goalCache = props.coordinates; navigation.navigate('map'); }}
      />
    )
  }
  return (
    <View style={styles.container} backgroundColor = {'orange'}>
      <TouchableOpacity onPress={()=>navigation.navigate('home')}>
      <Image
        style={styles.homelogo}
        source={require('./components/images/home.png')}
      />
      </TouchableOpacity>
         <Text style={styles.baseText} color= {"white"}>
        {"CLICK ON THE GOAL YOU WANT TO FIND!"}
      </Text>
      <View style={styles.map}>
        <MapView
          initialRegion={{
            latitude: (44.94000),
            longitude: (-93.1746),
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0922 * ASPECT_RATIO,
          }}
          showsUserLocation={true}
          style={styles.map}>
          <ScottMarker coordinates={{ latitude: 44.9379, longitude: -93.168869019 }} title="Snelling and Grand Cache" />
          <ScottMarker coordinates={{ latitude: 44.9416, longitude: -93.1974 }} title="River Cache" />
          <ScottMarker coordinates={{ latitude: 44.934412433560745, longitude: -93.1777188451171 }} title="The Tap Cache" />
          <ScottMarker coordinates={{ latitude: 44.94031596574141, longitude: -93.16657303880767 }} title="BreadSmith Cache" />
          <ScottMarker coordinates={{ latitude: 44.2212723, longitude: -92.0000204 }} title="Camping Cache" />
          <ScottMarker coordinates={{ latitude: 44.941529947250395, longitude: -93.18443394690537 }} title="The Rest Cache" />
          {/* Takes the user to a bench on summit : ) */}
        </MapView>
      </View>
    </View>
  )
}

//Simple home screen to switch to About Screen or Goal Map.
const WelcomeScreen = ({ navigation }) => {
  return (

    <View style={styles.welcomePg}>
      <View style={styles.imgz}>
        <Image source={require('./components/images/macCache.png')} />
      </View>
      <View style={styles.welcomeB}>
      {/* <Image style = {{width:150, height: 150}} source={require('./components/images/titleScott.png')} /> */}
        <Button
          title="Start"
          color='#fff'
          onPress={() =>
            navigation.navigate('goals')} />
      </View>
      <View style={styles.welcomeB}>
        <Button
          style={styles.welcomeB}
          title="About"
          color='#fff'
          onPress={() =>
            navigation.navigate('AboutPage')} />
      </View>
    </View>
  )
}

//Uses Victory component to show comments and congrats!
const VictoryScreen = ({ navigation }) => {
  return (
    <View  backgroundColor="lightblue">
      <TouchableOpacity onPress={()=>navigation.navigate('home')}>
      <Image
        style={styles.homelogo}
        source={require('./components/images/home.png')}
      />
      </TouchableOpacity>
      <Victory location={global.goalCache}/>
    </View>
  )
}

//Simple page that shows instructions, rules, and credits for the app. 
const AboutPage = ({ navigation }) => {
  return (
    //View style={styles.container}>
    <View style = {styles.container}>
        <View style = {styles.aboutContainer}>
        <TouchableOpacity onPress={()=>navigation.navigate('home')}>
      <Image
        style={styles.homelogo}
        source={require('./components/images/home.png')}
      />
      </TouchableOpacity>
      <About />
      </View>
    </View>
   
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: '#fff',
    alignItems: 'center', 
    alignContent: 'center', 
    justifyContent: 'center'
  },
  compassContainer: {
    flex: 1,
    backgroundColor: 'orange',
    alignItems: 'center'

  },
  mapContainer: {
    flex: 1,
    backgroundColor: 'whitesmoke',
    alignItems: 'center',
    justifyContent: 'center'

  },

  baseText: {
    fontFamily: "Futura",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: 'center',
    color: 'white',

  },

  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.80,
  },

  centeredText: { textAlign: 'center' },

  compass: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.75,
    backgroundColor: 'rgba(223, 108, 22, 1)',
  },
  imgz: {
    width: 375,
    height: 375,
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: '#214683',
    marginBottom: -15, 
    marginTop: Dimensions.get('window').height*0.1
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
    backgroundColor: 'skyblue',
    paddingHorizontal: 18,
    paddingVertical: 5,
    borderRadius: 20,
    color: 'white',
    width: '50%',
    alignItems: 'center',
    alignSelf: 'center',

  },
  homelogo: {
    width: 45,
    height: 45,
    marginTop: 25,    
  },
  aboutContainer: {
    backgroundColor: 'rgba(223, 108, 22, 1)'
  },
});

export default App;

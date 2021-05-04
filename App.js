//App.js contains the navigation and logic required to go between screens.

import React, { useEffect } from 'react';
import { Alert, Text, Button, View, StyleSheet, Dimensions, Image, TouchableOpacity, Platform } from 'react-native';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
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
  global.goalCache = 0; //Global variable containing goal coordinates (creatd by Julia, so all screens can acess the goal)
  return (
    <NavigateStack />
  )
}


//Handles navigation between different screens
const NavigateStack = () => {

  return (
    <NavigationContainer>

      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name='home'
          component={WelcomeScreen}
          options={{
            title: 'Mac Cache',
            gestureEnabled: false
          }} />

        <Stack.Screen
          name='about'
          component={AboutPage}
          options={{ title: 'About' }} />

        <Stack.Screen
          name='goals'
          component={GoalsScreen}
          options={{ title: 'Goals' }} />

        <Stack.Screen
          name='map'
          component={MapScreen}
          options={{
            title: 'Map',
            gestureEnabled: false
          }} />

        <Stack.Screen
          name='compass'
          component={CompassScreen}
          options={{
            title: 'Compass',
            gestureEnabled: false
          }} />

        <Stack.Screen
          name='victory'
          component={VictoryScreen}
          options={{
            title: 'Victory',
            gestureEnabled: false
          }} />



      </Stack.Navigator>
    </NavigationContainer>
  )
}


//Simple home screen to switch to About Screen or Goal Map.
//Created by Izzy, scot Image edited by Izzy (Julia assisted James with adjusting buttons to properly appear on andriods and IOS )
const WelcomeScreen = ({ navigation }) => {

  return (
    <View style={styles.welcomePg}>
      <View style={styles.imgz}>
        <Image source={require('./components/images/macCache.png')} />
      </View>
      <View style={styles.welcomeScotts}>
        <Image style={{ transform: [{ rotate: '15deg' }], width: 100, height: 100, position: 'absolute', right: 110, bottom: 30 }} source={require('./components/images/rotated.png')} />
        <Image style={{ transform: [{ rotate: '295deg' }], width: 100, height: 100, position: 'absolute', right: 90, top: 25 }} source={require('./components/images/rotated.png')} />
        <Image style={{ transform: [{ rotate: '350deg' }], width: 100, height: 100, position: 'absolute', left: 110, bottom: 10 }} source={require('./components/images/titleScott.png')} />
        <Image style={{ transform: [{ rotate: '220deg' }], width: 100, height: 100, position: 'absolute', top: 100, left: 110 }} source={require('./components/images/titleScott.png')} />
        <Image style={{ transform: [{ rotate: '60deg' }], width: 100, height: 100, position: 'absolute', top: 165, right: 135 }} source={require('./components/images/titleScott.png')} />
        <Image style={{ transform: [{ rotate: '30deg' }], width: 100, height: 100, position: 'absolute', top: 245, left: 120 }} source={require('./components/images/titleScott.png')} />
        <Image style={{ transform: [{ rotate: '160deg' }], width: 100, height: 100, position: 'absolute', top: 186 }} source={require('./components/images/titleScott.png')} />
        <Image style={{ transform: [{ rotate: '270deg' }], width: 100, height: 100, position: 'absolute', top: 265, right: 75 }} source={require('./components/images/titleScott.png')} />
        <Image style={{ transform: [{ rotate: '200deg' }], width: 100, height: 100, position: 'absolute', right: 140, bottom: 360 }} source={require('./components/images/titleScott.png')} />
        <Image style={{ transform: [{ rotate: '350deg' }], width: 100, height: 100, position: 'absolute', left: 140, bottom: 330 }} source={require('./components/images/titleScott.png')} />
        <Image style={{ transform: [{ rotate: '50deg' }], width: 100, height: 100, position: 'absolute', left: 135, bottom: 230 }} source={require('./components/images/titleScott.png')} />
        <Image style={{ transform: [{ rotate: '360deg' }], width: 100, height: 100, position: 'absolute', right: 155, bottom: 215 }} source={require('./components/images/titleScott.png')} />
      </View>
      <View style={styles.welcomeB}>
        <TouchableOpacity onPress={() =>
          navigation.navigate('goals')}>
          <Text style={styles.welcomeText}>Start</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.welcomeB}>
        <TouchableOpacity onPress={() =>
          navigation.navigate('about')}>
          <Text style={styles.welcomeText}>About</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}


//Simple page that shows instructions, rules, and credits for the app. 
//Content by Izzy and Julia, style by Izzy
const AboutPage = ({ navigation }) => {
  return (
    //View style={styles.container}>
    <View style={styles.container}>
      <View style={styles.aboutContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('home')}>
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



//A google-maps styled screen displaying goal markers as Mac the Scot. 
//Users can view their location and goals, and select a goal by pressing on one of the Mac the Scot goal markers. (created by Julia and Izzy)
const GoalsScreen = ({ navigation }) => {

  const ScottMarker = props => {

    return (
      <MapView.Marker
        coordinate={props.coordinates}
        title={props.title}
        key={Marker.snellAndGrand}
        onPress={() => { global.goalCache = props.coordinates; navigation.navigate('map'); }}
        image={Platform.OS === 'android' ? require("./components/images/scot.png") : undefined}>
        {Platform.OS === 'ios' ? <Image source={require("./components/images/scot.png")}
            style={{
              width: 60,
              height: 100,
            }}
          />
          : null}
      </MapView.Marker>
    )
  }

  return (
    <View style={styles.container} backgroundColor={'orange'}>
      <TouchableOpacity onPress={() => navigation.navigate('home')}>
        <Image
          style={styles.homelogo}
          source={require('./components/images/home.png')}
        />
      </TouchableOpacity>
      <Text style={styles.baseText} color={"white"}> {"CLICK ON THE GOAL YOU WANT TO FIND!"} </Text>
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
          <ScottMarker coordinates={{ latitude: 44.93783562821608, longitude: -93.16884756088258 }} title="Macalester Cache" />
          <ScottMarker coordinates={{ latitude: 44.95639299656109, longitude: -93.16680466351086 }} title="Delicious Food Cache" />
          <ScottMarker coordinates={{ latitude: 44.98285915765575, longitude: -93.1540443668212 }} title="Como Cache" />
          <ScottMarker coordinates={{ latitude: 44.94134442410231, longitude: -93.14290723211685 }} title="Governor's Cache" />
          <ScottMarker coordinates={{ latitude: 44.93988856080435, longitude: -93.13788269499263 }} title="Shopping Cache" />
          <ScottMarker coordinates={{ latitude: 44.92660058013187, longitude: -93.15679485958243 }} title="Bowling Cache" />
          <ScottMarker coordinates={{ latitude: 44.91188129719778, longitude: -93.24247817220277 }} title="Nokomis Cache" />
          <ScottMarker coordinates={{ latitude: 44.90490950335187, longitude: -93.19192998071587 }} title="Scenic Route Cache" />
          <ScottMarker coordinates={{ latitude: 44.93625192995378, longitude:  -93.16806031032465 }} title="Turbine Cache" />
          <ScottMarker coordinates={{ latitude: 44.93943898067451, longitude: -93.16792952281267 }} title="Campus Center Cache" />          
          <ScottMarker coordinates={{ latitude: 44.93558615867223, longitude: -93.17030280866367 }} title="Language Cache" />          
          <ScottMarker coordinates={{ latitude: 44.92780772281948, longitude: -93.16681856438859 }} title="Nelson's Cache" />          
          <ScottMarker coordinates={{ latitude: 44.93743843844827, longitude: -93.16811487885501 }} title="Swings Cache" />          
          <ScottMarker coordinates={{ latitude: 44.94178471526371, longitude: -93.19863080978394 }} title="River Cache" />
          <ScottMarker coordinates={{ latitude: 44.934412433560745, longitude: -93.1777188451171 }} title="The Tap Cache" />
          <ScottMarker coordinates={{ latitude: 44.94031596574141, longitude: -93.16657303880767 }} title="BreadSmith Dumpster Cache" />
          <ScottMarker coordinates={{ latitude: 44.2212723, longitude: -92.0000204 }} title="Camping Cache" />
          <ScottMarker coordinates={{ latitude: 44.941529947250395, longitude: -93.18443394690537 }} title="The Rest Cache" />
          {/* Takes the user to a bench on summit : ) */}
        </MapView>
      </View>
    </View>
  )
}



//Created by Julia, uses Map component visual and allows to switch to compass screen
const MapScreen = ({ navigation }) => {
  //Code used for how to find coordinates: https://dev-yakuza.posstree.com/en/react-native/react-native-geolocation-service/#how-to-get-current-geolocation

  //Constantly checks user position and sees if within distance of goal coordinates. 
  //If close enough, changes to victory screen. 
  //Used: https://reactnavigation.org/docs/use-focus-effect/
  useFocusEffect(
    React.useCallback(() => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          if (geolib.getDistance(position.coords, global.goalCache) <= 7) {
            navigation.navigate('victory');
          }
        }
      )
    }, [])
  )

  return (
    <View style={styles.mapContainer} backgroundColor={'orange'}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            Alert.alert(
              "Want To Return To Home Page?",
              "If you return home you will have to restart your journey.",
              [{
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "Ok", onPress: () => navigation.navigate('home') }]
            )
          }}>
          <Image
            style={styles.homelogo}
            source={require('./components/images/home.png')}
          />
        </TouchableOpacity>
        <Text style={styles.topText} color={"white"}> {"MAKE THE JOURNEY TO THE SCOTT"} </Text>
      </View>

      <UserMap style={styles.map, StyleSheet.absoluteFillObject} />
      <View style={{ position: 'absolute', top: 100, left: 50 }} />
      <View style={styles.otherB}>
        <TouchableOpacity onPress={() => navigation.navigate('compass')}>
          <Text style={styles.otherText}>Compass</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}



//Uses Compass component and allows to switch to Map Screen. 
const CompassScreen = ({ navigation }) => {

  //Constantly checks user position and sees if within distance of goal coordinates. 
  //If close enough, changes to victory screen. 
  useFocusEffect(
    React.useCallback(() => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          if (geolib.getDistance(position.coords, global.goalCache) <= 7) {
            navigation.navigate('victory');
          }
        }
      )
    }, [])
  )

  return (
    <View style={styles.compassContainer}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => {
          Alert.alert(
            "Want To Return To Home Page?",
            "If you return home you will have to restart your journey.",
            [{
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            { text: "Ok", onPress: () => navigation.navigate('home') }]
          )
        }}>
          <Image
            style={styles.homelogo}
            source={require('./components/images/home.png')}
          />
        </TouchableOpacity>
        <Text style={styles.topText} color={"white"}>
          {"FOLLOW THE ARROW TO FIND THE SCOT"}
        </Text>
      </View>

      <Compass style={styles.compass, StyleSheet.absoluteFillObject} />
      <View style={{ position: 'absolute', top: 0, left: 50 }} />
      <View style={styles.otherB}>
        <TouchableOpacity onPress={() => navigation.navigate('map')}>
          <Text style={styles.otherText}>Map</Text>
        </TouchableOpacity> 
    </View>
    </View>
  )
}



//Uses Victory component to show comments and congrats!
//Created by A'di
const VictoryScreen = ({ navigation }) => {

  return (
    <View backgroundColor="lightblue">
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => {
          Alert.alert(
            "Want To Return To Home Page?",
            "If you return home you will have to restart your journey.",
            [{
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            { text: "Ok", onPress: () => navigation.navigate('home') }]
          )
        }}>
          <Image
            style={styles.homelogo}
            source={require('./components/images/home.png')}
          />
        </TouchableOpacity>
      </View>
      <Victory location={global.goalCache} />
    </View>
  )
}





//Style by Julia and Izzy
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
  },

  mapContainer: {
    flex: 1,
    backgroundColor: 'whitesmoke',
    justifyContent: 'center',
  },

  baseText: {
    ...Platform.select({
      ios: {
        fontFamily: 'Futura'
      },
      android: {
        fontFamily: 'normal'
      }
    }),
    fontSize: 20,
    fontWeight: "bold",
    textAlign: 'center',
    color: 'white',
  },
  
  topText: {
    ...Platform.select({
      ios: {
        fontFamily: 'Futura'
      },
      android: {
        fontFamily: 'normal'
      }
    }),
    fontSize: 15,
    fontWeight: "bold",
    textAlign: 'center',
    color: 'white',
    alignSelf: 'center',
    alignContent: 'center',
    marginTop: 30,
    marginLeft: 20,
    marginRight: 35
  },

  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.80,
  },

  centeredText: {
    textAlign: 'center'
  },

  compass: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.75,
    backgroundColor: 'rgba(223, 108, 22, 1)',
  },

  imgz: {
    width: 370,
    height: 370,
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: '#214683',
    marginBottom: -15,
    marginTop: Dimensions.get('window').height * 0.1
  },

  welcomePg: {
    alignItems: 'center',
    backgroundColor: `#214683`,
    height: Dimensions.get('window').height,
    flex: 1,
    justifyContent: 'flex-start',
  },

  welcomeScotts: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 20,
    alignContent: 'center',
    ...Platform.select({
      ios: {
        color: 'white'
      },
      android: {
        color: 'rgba(223, 108, 22, 1)'
      }
    }),
    display: 'flex',
    marginBottom: 45,
  },

  welcomeB: {
    backgroundColor: "rgba(223, 108, 22, 1)",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 20,
    alignContent: 'center',
    display: 'flex',
    marginBottom: 45,
    width: 90, 
    alignItems: 'center',

  },

  welcomeText: {
    borderRadius: 20,
    alignContent: 'center',
    fontWeight: "bold",
    paddingHorizontal: 12,
    paddingVertical: 10,
    ...Platform.select({
      ios: {
        color: 'white'
      },
      android: {
        color: 'rgba(223, 108, 22, 1)'
      }
    }),
    display: 'flex'
  },

  otherB: {
    backgroundColor: 'skyblue',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    ...Platform.select({
      ios: {
        color: '#fff'
      },
      android: {
        color: 'rgba(223, 108, 22, 1)'
      }
    }),
    alignItems: 'center',
    alignSelf: 'center',
    top: 0,
    width: 200,
  },

  otherText: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    alignContent: 'center',
    alignSelf: 'center',
    fontWeight: "bold",
    ...Platform.select({
      ios: {
        color: 'white',
        fontFamily: 'Futura'
      },
      android: {
        color: 'rgba(223, 108, 22, 1)',
        fontFamily: 'normal'
      }
    }),
  },

  homelogo: {
    width: 45,
    height: 45,
    marginTop: 25,
    right: 0,
  },

  aboutlogo: {
    width: 45,
    height: 45,
    marginTop: -5,
    left: Dimensions.get('window').width - 100,
  },

  aboutContainer: {
    backgroundColor: 'rgba(223, 108, 22, 1)',
  },

  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  }
});



export default App;

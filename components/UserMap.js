//import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Alert,
  Platform, 
  ImageStore
} from 'react-native';
import MapView, { MAP_TYPES, Marker } from 'react-native-maps';
import React, { useState } from 'react';
import { useEffect } from 'react/cjs/react.production.min';


function userMap(props) {

  const { width, height } = Dimensions.get('window');

  const ASPECT_RATIO = width / height;
  const GOAL_LATITUDE = global.goalCache.latitude;
  const GOAL_LONGITUDE = global.goalCache.longitude;
  const LATITUDE_DELTA = 0.0922;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


  const [userLocation,setUserLocation] = useState("- - - - -");

  const region = useState({
    latitude: GOAL_LATITUDE,
    longitude: GOAL_LONGITUDE,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });
  

  const findUserCoordinates = () => {
      navigator.geolocation.getCurrentPosition(
        position => {
          const loc=position.coords.latitude.toPrecision(6) + ", " + position.coords.longitude.toPrecision(6);
          setUserLocation(loc);
        },
        error => Alert.alert(error.message),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
    
    };

    const GoalMarker = props =>{
      if(props.coordinate==0 && props.coordinate==0){
        Alert.alert(
          "Error",
          "Return to Map of All Mac Caches To Pick Your Goal",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ]
        );
      }
      return(
        <MapView.Marker 
            coordinate={props.coordinates}
            title={props.title}
            key={Marker.goal}
            image={require("./images/scot.png")}
          />
      );
    }
     

    return(
      <View style ={styles.container}>
        <View style = {styles.mapContainer}>
        <View style={[styles.bubble, styles.latlng]}>
             <TouchableOpacity onPress={findUserCoordinates}>
                 <Text style={styles.text}>Click to Find Your Coordinates: </Text>
                 <Text style={styles.text}>{userLocation}</Text>
               </TouchableOpacity>
           </View>
            <MapView
                initialRegion={{  
                    latitude: GOAL_LATITUDE,
                    longitude: GOAL_LONGITUDE,
                    latitudeDelta: 0.0725,
                    longitudeDelta: 0.0420,
                  }}
                region={props.userLocation}
                showsUserLocation = {true}
                style ={styles.map}>
                <GoalMarker coordinates = {{latitude: GOAL_LATITUDE, longitude: GOAL_LONGITUDE}} title = "Goal Cache"/>
              </MapView>
      
          </View>
       
        </View>
                        
    );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
   // justifyContent: 'flex-start',
  },
  map: {
    width: 350,
    height: 555, 
    alignSelf: 'center', 
    marginBottom: 20,
    marginTop: 20,
    alignItems:'center', 
  },

  bubble: {
    backgroundColor: 'deepskyblue',
    paddingHorizontal: 18,
    paddingVertical: 5,
    alignItems: 'center',
    borderRadius: 20,
    top: 0, 
      marginRight : 20, 
      alignSelf: 'center',
  },
  text: { 
    color: 'black', 
    fontWeight: 'bold',
    fontFamily: 'Futura',
    alignSelf: 'center',
    alignItems:'center',

    },
});
export default userMap;

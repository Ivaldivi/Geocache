//Created by Julia (with help of Izzy for style) A component with a Google Maps style map that shows the user location and the location
//of the selected goal marker. 

import {Image, StyleSheet, View, Dimensions, Alert, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import React, { useState } from 'react';

function userMap () {

  const { width, height } = Dimensions.get('window');

  //Instance variables to set region for Map screen to focus on when it initally opens. 
  //Also Sets the goal coordinates to the global coordinates variable which is set in App.js in goalscreen.  
  const ASPECT_RATIO = width / height;
  const GOAL_LATITUDE = global.goalCache.latitude;
  const GOAL_LONGITUDE = global.goalCache.longitude;
  const LATITUDE_DELTA = 0.0922;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  const region = useState({
    latitude: GOAL_LATITUDE,
    longitude: GOAL_LONGITUDE,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  //Sets and creates goal marker based on goal coordinates selected by the user goal.
  // Also handles default condition if user does not select goal location. 
  const GoalMarker = props => {
    if (GOAL_LATITUDE == 0 && GOAL_LONGITUDE == 0) {
      Alert.alert(
        "Error",
        "Return to Map of All Mac Caches To Pick Your Goal",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          {
            text: "OK",
            onPress: () => console.log("OK Pressed")
          }
        ]
      );

      GOAL_LATITUDE = 44.9379;
      GOAL_LONGITUDE = -93.68869019; //snelling and grand cache are default if no goal coordinates chosen 
    }

    return (
      <MapView.Marker
        coordinate={props.coordinates}
        title={props.title}
        key={Marker.goal}
        image={Platform.OS === 'android' ? require("./images/scot.png") : undefined}>
        {Platform.OS === 'ios'
          ? <Image
            source={require("./images/scot.png")}
            style={{
              width: 60,
              height: 100,
            }}
          />
          : null}
      </MapView.Marker>
    );
  }


  return (
    <View style={[styles.map]}>
      {/*Sets intial region shows on screen to be centered on the goal location*/}
      <MapView
        initialRegion={{
          latitude: GOAL_LATITUDE,
          longitude: GOAL_LONGITUDE,
          latitudeDelta: 0.0725,
          longitudeDelta: 0.0420,
        }}
        showsUserLocation={true}
        style={styles.map}>
      <GoalMarker
        coordinates={{ latitude: GOAL_LATITUDE, longitude: GOAL_LONGITUDE }}
        title="Goal Cache" />
      </MapView>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.7,
    marginBottom: 35,
    marginTop: 10,
  },
  bubble: {
    backgroundColor: 'orange',
    paddingHorizontal: 18,
    paddingVertical: 5,
    alignItems: 'center',
    borderRadius: 20,
    marginRight: 20,
    alignSelf: 'center',
  },
  text: {
    ...Platform.select({
      android: {
        fontFamily: 'normal'
      },
      ios: {
        fontFamily: 'Futura'
      }
    }),
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center',
    alignItems: 'center',

  },
});


export default userMap;
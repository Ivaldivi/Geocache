//import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Alert,
  Platform
} from 'react-native';
import MapView, { MAP_TYPES, Marker} from 'react-native-maps';
import React, { useState } from 'react';

function userMap(props) {

  const { width, height } = Dimensions.get('window');

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


  //Sets the goal marker coordinates according to user goal selection
  //(snelling and grand is the default coordinates). Creates a Mapview.Marker component with correct coordinates.
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
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );
      GOAL_LATITUDE = 44.9379;
      GOAL_LONGITUDE = -93.68869019; //snelling and grand cache if no marker
    }
    return (
      <MapView.Marker
        coordinate={props.coordinates}
        title={props.title}
        key={Marker.goal}
        image={require("./images/scot.png")}
      />
    );
  }


  return (
    <View style={[styles.map]}>
      <MapView
        initialRegion={{
          latitude: GOAL_LATITUDE,
          longitude: GOAL_LONGITUDE,
          latitudeDelta: 0.0725,
          longitudeDelta: 0.0420,
        }}
        region={props.userLocation}
        showsUserLocation={true}
        style={styles.map}>
        <GoalMarker coordinates={{ latitude: GOAL_LATITUDE, longitude: GOAL_LONGITUDE }} title="Goal Cache" />
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
        fontFamily: 'normal'},
      ios: {
        fontFamily: 'Futura'}
      }),
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center',
    alignItems: 'center',

  },
});
export default userMap;

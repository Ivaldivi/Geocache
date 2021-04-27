//Created by A'di with help from other group members (Subscription and angle from Julia)
//
//This component creates an arrow that uses the bearing between location and goal
//and compass heading in order to rotate a picture of an arrow that directs user to 
//goal location (the Scot).


import * as React from 'react';
import { Alert, Image, View, Text, StyleSheet, Dimensions, Platform} from 'react-native';
import * as geolib from 'geolib';
import { Magnetometer } from 'expo-sensors';
import { useEffect, useState } from 'react';



const Compass = () => {

  const { width, height } = Dimensions.get('window');
  const GOAL_LATITUDE = global.goalCache.latitude;
  const GOAL_LONGITUDE = global.goalCache.longitude;

  const [userLatitude, setUserLatitude] = useState(0);
  const [userLongitude, setUserLongitude] = useState(0);
  const [bearing, setBearing] = useState(0);
  const [distance, setDistance] = useState(-1);



  //finds user coordinates and updates user latitude and longitude states
  //Code by Julia and modified for compass by A'di
  const findCoordinates = () => {
    if(subscription){
    navigator.geolocation.getCurrentPosition(
      position => {
        const lat = position.coords.latitude;
        setUserLatitude(lat);
        const long = position.coords.longitude;
        setUserLongitude(long);
      },
    );
    }

  };

  //Updates bearing based on current user coordinates
  const changeBearing = () => {
    findCoordinates();
    //Explanation/docs here: https://www.npmjs.com/package/geolib
    //Gets bearing as angle (bearing is the cardinal angle between one coordinate
    //point and another. In this case from user to goal)
    if (GOAL_LATITUDE != 0) {
      const userBear = geolib.getGreatCircleBearing(
        { latitude: userLatitude, longitude: userLongitude }, //user location
        { latitude: GOAL_LATITUDE, longitude: GOAL_LONGITUDE }); //goal
      setBearing(userBear);
    } else {
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
  }

  //magnetometer returns the cardinal angle in degrees east of north the user is facing
  //Aka Heading
  const [subscription, setSubscription] = useState(null);
  const [magnetometer, setMagnetometer] = useState(0);

  //Turns compass and runs toggle methods
  useEffect(() => {
    _toggle();
    return () => {
      _unsubscribe();
    };
  }, []);

  //Shows if the app(specifically the compass screen) is subscribed (it is on and running).
  const _toggle = () => {
    if (subscription) {
      _unsubscribe();
    } else {
      _subscribe();
    }
  };

  //Turns Magnetometer on and sends angle of phone
  const _subscribe = () => {
    setSubscription(
      Magnetometer.addListener((data) => {
        setMagnetometer(_angle(data));
        changeBearing();
      },
      changeDistance())
    );
  };

  //removes subscription and should stop the whole screen
  const _unsubscribe = () => {
    subscription && subscription.remove();
    Magnetometer.removeAllListeners(); 
    setSubscription(null);
    navigator.doNotTrack;
  };



  //Uses magnetometer to find the angle of which the phone is at.
  //Based off of this stack overflow: https://stackoverflow.com/questions/57308560/smooth-orientation-compass-using-react-native-sensorss-magnetometer
  const _angle = (magnetometer) => {
    if (magnetometer) {
      let { x, y, z } = magnetometer;
      if (Math.atan2(y, x) >= 0) {
        angle = Math.atan2(y, x) * (180 / Math.PI);
      }
      else {
        angle = (Math.atan2(y, x) + 2 * Math.PI) * (180 / Math.PI);
      }
    }
    return angle;
  };

  //Adjusts magnetometer to be in correct degrees for rotation
  const _normalizeCompassDirection = (magnetometer) => {
    return magnetometer - 90 >= 0 ? magnetometer - 90 : magnetometer + 271;
  };

  //Mathematical Reasoning (A'di's): If the bearing is less than the heading then we need to 
  //rotate counter clockwise (negative angle), and if the bearing is greater than the heading
  //we need to rotate clockwise (positive angle). This function finds the angle of arrow rotation. 
  const _finalAngle = () => {
    if (bearing >= _normalizeCompassDirection(magnetometer)) {
      return 360 - bearing - _normalizeCompassDirection(magnetometer);
    }
    else {
      return 360 - bearing + (_normalizeCompassDirection(magnetometer - bearing));
    }
  }

  //Finds distance between user and goal coordinates and updates distance text component appropriately.
  const changeDistance = () => {
    //must write check here as well for if goal cache is null 
    if (GOAL_LATITUDE != 0) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          let dis = geolib.getDistance(
            { latitude: position.coords.latitude, longitude: position.coords.longitude },
            { latitude: GOAL_LATITUDE, longitude: GOAL_LONGITUDE }
          );
          setDistance(dis);
        });
    } else {
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

  }
  // style done by Julia to make it look better for testing.
  return (
    <View style={[styles.compass]}>
      <Image
        style={{
          height: height / 2,
          width: width / 2,
          resizeMode: 'contain',
          transform: [{ rotate: _finalAngle() + 'deg' }]
        }}
        source={require('./images/arrow.png')}

      />
      <Text style={styles.text}> Distance to Goal:  </Text>
      <Text style={styles.text}> {distance} m </Text>
    </View>
  );

}
const styles = StyleSheet.create({
  text: {
    ...Platform.select({
      android: {
        fontFamily: 'normal'},
      ios: {
        fontFamily: 'Futura'}
      }),
    alignItems: 'center',
    color: 'white',
    fontWeight: 'bold',
    

  },
  compass: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.7,
    alignSelf: 'center',
    marginBottom: 35,
    marginTop: 10,
    backgroundColor: 'orange',
    alignItems: 'center',
  },
});



export default Compass;
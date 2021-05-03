//Created by A'di with help from other group members (Subscription and angle from Julia as well as alerts, and all style)
//
//This component creates an arrow that uses the bearing between location and goal
//and compass heading in order to rotate a picture of an arrow that directs user to 
//goal location (the Scot).


import * as React from 'react';
import { Alert, Image, View, Text, StyleSheet, Dimensions, Platform} from 'react-native';
import * as geolib from 'geolib';
import { Magnetometer } from 'expo-sensors';
import { useEffect, useState, useRef} from 'react';



const Compass = () => {

  const { width, height } = Dimensions.get('window');
  const GOAL_LATITUDE = global.goalCache.latitude;
  const GOAL_LONGITUDE = global.goalCache.longitude;

  const [bearing, setBearing] = useState(0);
  const [distance, setDistance] = useState(-1);

  const bearingRef = useRef(null); 
  //Updates bearing based on current user coordinates
  const changeBearing = () => {
    findCoordinates();
    
    if (GOAL_LATITUDE != 0){
      if(!subscriptionRef.current){
        console.log("bearing not changed", "existing subscription:", subscriptionRef.current);
        return; 
      }

      //Explanation/docs here: https://www.npmjs.com/package/geolib
      //Gets bearing as angle (bearing is the cardinal angle between one coordinate
      //point and another. In this case from user to goal)
      // setBearing(Math.abs(Math.round(geolib.getGreatCircleBearing(
      //   { latitude: userLatRef.current, longitude: userLongRef.current }, 
      //   { latitude: GOAL_LATITUDE, longitude: GOAL_LONGITUDE }))));
      //   console.log("userLongRef before normalization:", userLongRef.current);
        //normalize bearing
        // bearingRef.current=Math.abs(Math.round(geolib.getGreatCircleBearing(
        //   { latitude: userLatRef.current, longitude: userLongRef.current }, 
        //   { latitude: GOAL_LATITUDE, longitude: GOAL_LONGITUDE })));
        
      navigator.geolocation.getCurrentPosition(
        (position) => {
          bearingRef.current = Math.abs(Math.round(geolib.getGreatCircleBearing(
        { latitude: position.coords.latitude, longitude: position.coords.longitude }, 
        { latitude: GOAL_LATITUDE, longitude: GOAL_LONGITUDE })));
        }

      );
    
      
      // console.log();
        // if (bearing < 0){
        // setBearing(Math.round(Math.abs(360-(bearing%360))))
        // } 
        // else {
        // setBearing(Math.round(Math.abs(bearing))) 
        // }
        //console.log("bearing after normalization:", bearing);
        // bearingRef.current = (Math.abs(Math.round(geolib.getGreatCircleBearing(
        //   { latitude: userLatRef.current, longitude: userLongRef.current }, 
        //   { latitude: GOAL_LATITUDE, longitude: GOAL_LONGITUDE }))));
    } 
    else {
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

   //Created by Julia. This finds distance between user and goal coordinates
   //and updates distance text component appropriately.
   const changeDistance = () => {

    //TODO: must write check here as well for if goal cache is null 
    if (GOAL_LATITUDE != 0){
      navigator.geolocation.getCurrentPosition(
        (position) => {
          if(!subscriptionRef.current){
            return; 
          }
          setDistance(geolib.getDistance(
            { latitude: position.coords.latitude, longitude: position.coords.longitude },
            { latitude: GOAL_LATITUDE, longitude: GOAL_LONGITUDE }
          )
          );
        });
    }
    else {
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
  const [magnetometer, setMagnetometer] = useState(0);

  const userLatRef = useRef(0); 
  const userLongRef = useRef(0); 
  const subscriptionRef = useRef(false); 

  //Turns compass and runs toggle methods
  useEffect(() => {
   _subscribe(); 
    return () => {
      _unsubscribe();
    };
  }, []);


  //finds user coordinates and updates user latitude and longitude states
  //Code by Julia and modified for compass by A'di
  const findCoordinates = () => {

    if (!subscriptionRef.current){
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      position => {
        if(subscriptionRef.current){
        const lat = position.coords.latitude;
        userLatRef.current = lat; 
        setUserLatitude(lat);
        const long = position.coords.longitude;
        userLongRef.current = long; 
        setUserLongitude(long);
        }
      },
    );
  };


  //Turns Magnetometer on and sends angle of phone
  const _subscribe = () => {
    subscriptionRef.current = true; 
    Magnetometer.addListener((data) => {
      setMagnetometer(_angle(data));
      changeBearing();
      changeDistance();
    }
    );
  };

  //removes subscription and should stop the whole screen
  const _unsubscribe = () => {
    subscriptionRef.current = false; 
    Magnetometer.removeAllListeners(); 
    setMagnetometer(null);
    
  };



  //Uses magnetometer to find the angle of which the phone is at.
  //Based off of this stack overflow: https://stackoverflow.com/questions/57308560/smooth-orientation-compass-using-react-native-sensorss-magnetometer
  const _angle = (magnetometer) => {
    if (magnetometer){
      let {x, y} = magnetometer;
      angle = Math.round(atan2Normalized(x, y));
    }
    return angle;
  };

//normalizes atan2 so that it covers 0 to 360 degrees
function atan2Normalized(x,y) {
  let result = Math.degrees(Math.atan2(y,x));
  if (result < 0){
      result = (360+result)%360;
  }
  return result;
}

const _normalizeDegree = (magnetometer) => {
  return magnetometer - 90 >= 0 ? magnetometer - 90 : magnetometer + 271;
};

//turns degrees to radians
Math.radians = function(degrees) {
return degrees * (Math.PI / 180);
}

//turns radians to degrees
Math.degrees = function(radians) {
return radians * (180 / Math.PI);
}

  //Mathematical Reasoning (A'di's): If the bearing is less than the heading then we need to 
  //rotate counter clockwise (negative angle), and if the bearing is greater than the heading
  //we need to rotate clockwise (positive angle). This function finds the angle of arrow rotation. 
  const _finalAngle = () => {
    // if (bearing === magnetometer){
    //   console.log(0); 
    //     return 0;
    // }
    if (bearing <= magnetometer){
      console.log("bearing < angle", Math.abs((magnetometer - bearing-90)%360)); 
        return Math.abs((magnetometer - bearing-90)%360);
    }
    else{
      console.log("bearing > angle", Math.abs((bearing + magnetometer-90))%360);
        return Math.abs((bearing + magnetometer-90)%360);
    }
  }

  //style done by Julia to make it look better for testing.
  return (
    <View style={[styles.compass]}>
      <Image
        style={{
          height: height / 2,
          width: width / 2,
          resizeMode: 'contain',
          transform: [{ rotate: _normalizeDegree(_finalAngle()) + 180 + 'deg' }]
        }}
        source={require('./images/arrow.png')}
      />
      <Text style={styles.text}> Distance to Goal:  </Text>
      <Text style={styles.text}> {distance} m </Text>
      <Text style={styles.text}> (Hold Phone Parallel To Ground) </Text>
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
//Created by A'di with help from other group members (Subscription and angle from Julia)
//
//This component creates an arrow that uses the bearing between location and goal
//and compass heading in order to rotate a picture of an arrow that directs user to 
//goal location (the Scot).


import * as React from 'react';
import { ImageBackground, Image, View, StyleSheet} from 'react-native';
import * as geolib from 'geolib';
import { Magnetometer} from 'expo-sensors';
import { useEffect, useState } from 'react';



const Compass = ({navigation}) => {

    const [userLatitude,setUserLatitude] = useState(0);
    const [userLongitude,setUserLongitude] = useState(0);
    const [bearing, setBearing] = useState(0);


    //finds user coordinates and updates user latitude and longitude states
    //Code by Julia and modified for compass by A'di
    const findCoordinates = () => {
        navigator.geolocation.getCurrentPosition(
          position => {
            const lat = position.coords.latitude;
            setUserLatitude(lat);
            const long = position.coords.longitude;
            setUserLongitude(long);
          },
        );
      };

      //Updates bearing based on current user coordinates
      const changeBearing = () => {
        findCoordinates();
        //Explanation/docs here: https://www.npmjs.com/package/geolib
        //Gets bearing as angle (bearing is the cardinal angle between one coordinate
        //point and another. In this case from user to goal)
        const userBear = geolib.getGreatCircleBearing( 
            {latitude: userLatitude, longitude: userLongitude}, //user location
            { latitude: 44.940824, longitude: -93.16881}); //goal
        setBearing(userBear);
      }
      
    //magnetometer returns the cardinal angle in degrees east of north the user is facing
    //Aka Heading
    const [subscription, setSubscription] = useState(null);
    const [magnetometer, setMagnetometer] = useState(0);

    //Turns compass and runs toggle methods
    useEffect(() => {
      _toggle();
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
        })
      );
    };

    //removes subscription and should stop the whole screen
    const _unsubscribe = () => {
      subscription && subscription.remove();
      subscription = null;
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

    const _degree = (magnetometer) => {
      return magnetometer - 90 >= 0 ? magnetometer - 90 : magnetometer + 271;
    };
  
    //Mathematical Reasoning (A'di's): If the bearing is less than the heading then we need to 
    //rotate counter clockwise (negative angle), and if the bearing is greater than the heading
    //we need to rotate clockwise (positive angle). This function finds the angle of arrow rotation. 
    const _finalAngle = () =>{
      if (bearing >= _degree(magnetometer)){
        return 360 - bearing - _degree(magnetometer);
      }
      else{
        return 360 - bearing + ( _degree(magnetometer - bearing));
      }
    }
  
    return(
        <View>
        <ImageBackground source={require('./images/backgroundidea2.jpg')} style={styles.image}>
        <Image
          source={require('./images/arrow.png')}
          style={{
            transform: [{rotate: _finalAngle() + 'deg'}],
          }}
        />
            
            </ImageBackground>
        </View>
    )
        
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column"
    },
    image: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center"

    },
    text: {
      color: "white",
      fontSize: 42,
      fontWeight: "bold",
      textAlign: "center",
      backgroundColor: "#000000a0"
    }
  });
  
  export default Compass;
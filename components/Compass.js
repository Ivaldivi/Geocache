import * as React from 'react';
import { Image} from 'react-native';
import * as geolib from 'geolib';
import { Magnetometer} from 'expo-sensors';
import { useEffect, useState } from 'react';

const Compass = (props) => {

    const bearing = geolib.getGreatCircleBearing( 
      {latitude: 44.937950134, longitude: 93.168869019},
      { latitude: 44.937950134, longitude: -93.168869019});
      
    const [subscription, setSubscription] = useState(null);
    const [magnetometer, setMagnetometer] = useState(0);
    useEffect(() => {
      _toggle();
    }, []);
    const _toggle = () => {
      if (subscription) {
        _unsubscribe();
      } else {
        _subscribe();
      }
    };
    const _subscribe = () => {
      setSubscription(
        Magnetometer.addListener((data) => {
          setMagnetometer(_angle(data));
        })
      );
    };
    const _unsubscribe = () => {
      subscription && subscription.remove();
      subscription = null;
    };
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
  
    const _finalAngle = () =>{
      if (props.bearing1 >= magnetometer){
        return magnetometer - bearing;
      }
      else{
        return bearing - magnetometer;
      }
    }
  
    return(
        <Image
          source={{uri: 'https://cdns.iconmonstr.com/wp-content/assets/preview/2018/240/iconmonstr-arrow-up-thin.png'}}
          style={{
            height: 180,
            width: 200,
            transform: [{rotate: _finalAngle() + 'deg'}],
          }}
        />
    )
        
  }


  export default Compass;
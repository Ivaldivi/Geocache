import React from 'react';
import MapView, { Marker } from 'react-native-maps';
//import createNewMap from './CreateNewMap';

const ScottMarker = props =>{
    return(
        <MapView.Marker 
            coordinate={props.coordinates}
            title={props.title}
            key={Marker.snellAndGrand}
            //image={require("./images/scot.png")}
           // image = {require('scot.png')}
           image={Platform.OS === 'android' ? require('scot.png')} : undefined}>
            {Platform.OS === 'ios'
  ? <Image
      source={require('scot.png'}
      style={{
        width: 15,
        height: 15,
      }}
    />
  : null}
            onPress={()=> console.log(props.coordinates)}
          />
    )
}

export default ScottMarker;
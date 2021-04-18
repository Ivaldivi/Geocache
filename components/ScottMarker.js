import React from 'react';
import MapView, { Marker } from 'react-native-maps';
//import createNewMap from './CreateNewMap';

const ScottMarker = props =>{
    return(
        <MapView.Marker 
            coordinate={props.coordinates}
            title={props.title}
            key={Marker.snellAndGrand}
            image={require("./images/scot.png")}
            // onPress={() =>createNewMap(this)}
            onPress={()=> console.log(props.coordinates)}
          />
    )
}

export default ScottMarker;
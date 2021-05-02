//A component that styles the Mac Goal Markers for maps 

import React from 'react';
import MapView, { Marker } from 'react-native-maps';

const ScottMarker = props =>{
    return(
        <MapView.Marker 
            coordinate={props.coordinates}
            title={props.title}
            key={Marker.snellAndGrand}
            image={Platform.OS === 'android' ? require("./components/images/scot.png") : undefined}>
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
    )
}

export default ScottMarker;
import { useLinkProps } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import ScottMarker from './ScottMarker.js';
const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;

export function createNewMap(props){
    return(
        <View style = {styles.mapContainer}>
            <MapView
                initialRegion={{
                    latitude: (44.94000),
                    longitude: (-93.1746),
                    latitudeDelta: 0.0922,
                    longitudeDelta:  0.0922 * ASPECT_RATIO,
                  }}
                region={props.userLocation}
                showsUserLocation = {true}
                style ={styles.map}>
                    <ScottMarker coordinate = {this.coordinate} title = {this.title}/>

                {/* Takes the user to a bench on summit : ) */}

                </MapView>
        </View>
    );
};
const styles = StyleSheet.create({
    mapContainer: {
        width: 350,
        height: 600, 
        alignSelf: 'center', 
        marginBottom: 20,
        marginTop: 20
    }, 
    map: {
        width: '100%', 
        height: '100%', 
        marginBottom: 0, 
        alignSelf: 'center'
    }
});

export default createNewMap;
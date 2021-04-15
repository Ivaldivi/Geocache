//import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    TouchableOpacity, Alert, Platform
  } from 'react-native';
  import MapView, { MAP_TYPES, Marker } from 'react-native-maps';
  import React, { useState } from 'react';
  import { useEffect } from 'react/cjs/react.production.min';
  
  function userMap(props) {
  
    const { width, height } = Dimensions.get('window');
  
    const ASPECT_RATIO = width / height;
    const LATITUDE = 44.9379;
    const LONGITUDE = -93.1691;
    const LATITUDE_DELTA = 0.0922;
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  
    const [location,setLocation] = useState("-----");
  
   
    const region = useState({
      latitude: LATITUDE,
      longitude: LONGITUDE,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    });
    
  
    const findCoordinates = () => {
        navigator.geolocation.getCurrentPosition(
          position => {
            const loc =position.coords.latitude.toPrecision(6) + ", " + position.coords.longitude.toPrecision(6);
            setLocation(loc);
          },
          error => Alert.alert(error.message),
          { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
      
      };
       
      return(
          <View style = {styles.mapContainer}>
              <MapView
                  initialRegion={{
                      latitude: (44.94000),
                      longitude: (-93.1746),
                      latitudeDelta: 0.0725,
                      longitudeDelta: 0.0420,
                    }}
                  region={props.userLocation}
                  showsUserLocation = {true}
                  style ={styles.map}>
                      <MapView.Marker 
                          coordinate={{latitude: 44.9379,
                              longitude: -93.168869019}}
                              title={'CC Cache'}
                              key={Marker.snellAndGrand}
                              image={require(".assets/scot.png")}
                            />
                      <MapView.Marker
                          coordinate ={{latitude: 44.9416,
                              longitude: -93.1974}}
                              title={'River Cache'}
                              key={Marker.river}
                              image={require(".assets/scot.png")}
                              />
                       <MapView.Marker
                          coordinate ={{latitude:44.934412433560745,
                              longitude: -93.1777188451171}}
                              title={'The Tap Cache'}
                              key={Marker.river}
                              image={require(".assets/scot.png")}
                              />
                      <MapView.Marker
                          coordinate ={{latitude:44.94031596574141, 
                              longitude: -93.16657303880767}}
                              title={'BreadSmith Cache'}
                              key={Marker.river}
                              image={require(".assets/scot.png")}
                              />
                      <MapView.Marker
                          coordinate ={{latitude:44.941529947250395, 
                              longitude: -93.18443394690537}}
                              title={'The Rest Cache'}
                              key={Marker.river}
                              image={require(".assets/scot.png")}
                              /> 
                      {/* Takes the user to a bench on summit : ) */}
                      
                </MapView>
          </View>
      );
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    map: {
      width: 350,
      height: 600, 
      alignSelf: 'center', 
      marginBottom: 20,
      marginTop: 20
    },
  
    bubble: {
      backgroundColor: 'rgba(0, 0, 255, 0.3)',
      paddingHorizontal: 18,
      paddingVertical: 12,
      borderRadius: 20,
    },
    centeredText: { textAlign: 'center' },
  });
  export default userMap;
  
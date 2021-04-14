import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const userMap = props =>{
  this.state = {
    region: {
      latitude: 44.9379,
      longitude: -93.1691,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0922 * ASPECT_RATIO,
    },
  };
  const findCoordinates = () => {
    
    navigator.geolocation.getCurrentPosition(
      position => {
        const location = JSON.stringify(position.coords.latitude.toPrecision(6) + ", " + position.coords.longitude.toPrecision(6));
  
        this.setState({ location });
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
                            image={require("./scot.png")}
                          />
                    <MapView.Marker
                        coordinate ={{latitude: 44.9416,
                            longitude: -93.1974}}
                            title={'River Cache'}
                            key={Marker.river}
                            image={require("./scot.png")}
                            />
                     <MapView.Marker
                        coordinate ={{latitude:44.934412433560745,
                            longitude: -93.1777188451171}}
                            title={'The Tap Cache'}
                            key={Marker.river}
                            image={require("./scot.png")}
                            />
                    <MapView.Marker
                        coordinate ={{latitude:44.94031596574141, 
                            longitude: -93.16657303880767}}
                            title={'BreadSmith Cache'}
                            key={Marker.river}
                            image={require("./scot.png")}
                            />
                    <MapView.Marker
                        coordinate ={{latitude:44.941529947250395, 
                            longitude: -93.18443394690537}}
                            title={'The Rest Cache'}
                            key={Marker.river}
                            image={require("./scot.png")}
                            /> 
                    {/* Takes the user to a bench on summit : ) */}
                </MapView>
                  {/*TRYING TO SHOW USER Coordinates*/}
      <View style={[styles.bubble, styles.latlng]}>
        <TouchableOpacity onPress={this.findCoordinates}>
          <Text style={styles.centeredText}>Click to Find Your Coordinates</Text>
          <Text style={styles.centeredText, { fontWeight: 'bold' }}>{this.state.location}</Text>
        </TouchableOpacity>
      </View>
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
  

export default userMap;
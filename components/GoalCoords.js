import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


const GoalCoords = (props) => {
    return(
        <View>  
            <Text style={styles.bubble}> Goal coordinates are: {props.coordinate} </Text>
        </View>
    );
}
const styles = StyleSheet.create({
    bubble: {
        backgroundColor: 'rgba(255,255,255,0.7)',
        paddingHorizontal: 18,
        paddingVertical: 6,
        borderRadius: 20,
        alignContent: 'center',
      },
    button: {
        width: 100,
        paddingHorizontal: 3,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 5,
      },
      buttonContainer: {
        flexDirection: 'row',
        marginVertical: 20,
        backgroundColor: 'transparent',
        padding: 12,
      },
      buttonText: {
        textAlign: 'center',
      }
})
export default GoalCoords;
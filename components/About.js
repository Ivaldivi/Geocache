//import * as React from 'react';
import React, { useState, useEffect, useRef } from 'react';
import { Text, Button, View, StyleSheet, Dimensions, Image, TouchableOpacity, DeviceEventEmitter, ScrollView } from 'react-native';


const B = (props) => <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{props.children}</Text>
//https://stackoverflow.com/questions/35718143/react-native-add-bold-or-italics-to-single-words-in-text-field#:~:text=You%20can%20use%20like,...

const About = props => {
  return (
    <ScrollView style={{ backgroundColor: 'rgba(223, 108, 22, 1)', height: Dimensions.get('window').height }}>
        <Text style={{
        fontSize: 25, fontWeight: 'bold', marginLeft: 4, borderColor: 'white', borderWidth: 2, borderRadius: 8,
        color: '#183592', marginRight: 220
      }}>
        How to Play:  </Text>
      <Text style={styles.AboutPageP}>
        <B>1.</B> Click start on home page to be taken to a map with all possible goals. 
  {'\n'}{'\n'}<B>2.</B> Choose which goal you would like to go to. Your location is represented by the blue dot. 
  {'\n'}{'\n'}<B>3.</B> After choosing, use the map and the compass tool to reach the destination. You may use both tools as much as you want, but relying on compass tool leads to a much more challenging journey. 
  At any point you want to return home you may click the home icon in the top left, or if you want to return to the instructions you may click the question mark. To return back to searching for your goal after reviewing the rules, you must go back to home screen, press start, and reselect your goal.
  {'\n'}{'\n'}<B>4.</B> Once arriving at the destination you will be directed to a victory screen where you can read comments that were left by other who also went to the same location as well as leave your own.
   </Text>
 
      <Text style={{
        fontSize: 25, fontWeight: 'bold', marginLeft: 4, borderColor: 'white', borderWidth: 2, borderRadius: 8,
        color: '#183592', marginRight: 285
      }}>
        Rules:  </Text>
      <Text style={styles.AboutPageP}>
        <B>1.</B> Be nice in the message log! No mean-spirited, hateful, or discriminatory messages.
  {'\n'}{'\n'}<B>2.</B> Be careful when using the map! Make sure to look up from your phone and stay aware of your surroundings
   </Text>
      <Text style={styles.AboutPageP}>
        {'\n'}<B>3.</B> Obey traffic safety laws when using the compass.
  Our compass feature points you directly to the goal. The compass does not take into account roads, private property, or other hazards.{'\n'}
      </Text>
      <Text style={{ fontSize: 25, fontWeight: 'bold', marginLeft: 4, borderColor: 'white', borderWidth: 2, borderRadius: 8, color: '#183592', marginRight: 195 }}>
        Who Are We?
  </Text>
      <Text style={styles.AboutPageP}>
        #izadjaju-- This app was created as a software development project for the Macalester College class COMP225 Software Development.
  The four main authors of the project are: Julia Kispert, A'di Dust, James Bellitto, and Izzy Valdivia with lots of help from our instructor! {'\n'}
      </Text>
      <Text style={styles.AboutPageT}>
        Acknowledgements:
  </Text>
      <Text style={styles.AboutPageP}>
        - React Native documentation (woohoo, we love you, thank you) {'\n'}- Our instructor: Paul Cantrell
  {'\n'}- Some of our other commonly used resources below : P
  </Text>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  AboutPageP: {
    fontSize: 15,
    fontWeight: 'normal',
    backgroundColor: 'rgba(223, 108, 22, 1)',
    textAlign: 'justify',
    marginRight: 8,
    marginLeft: 8,
    lineHeight: 25,
    color: 'white',
    marginBottom: 20,
  },
  AboutPageT: {
    fontSize: 25, 
    fontWeight: 'bold',
     marginLeft: 4,  
     borderColor: 'white',
      borderWidth: 2, 
      borderRadius: 8,
       color: '#183592', 
       marginRight: 105,
      }
  ,
});
export default About;
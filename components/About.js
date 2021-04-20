//import * as React from 'react';
import React, { useState, useEffect, useRef } from 'react';
import { Text, Button, View, StyleSheet, Dimensions, Image, TouchableOpacity, DeviceEventEmitter, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as geolib from 'geolib';
import { Component } from 'react';
import MapView, {Marker} from 'react-native-maps';
import { apisAreAvailable } from 'expo';
import { Grid, Col, Row } from "react-native-easy-grid";

const B = (props) => <Text style={{fontWeight: 'bold', fontSize: 20}}>{props.children}</Text>
//https://stackoverflow.com/questions/35718143/react-native-add-bold-or-italics-to-single-words-in-text-field#:~:text=You%20can%20use%20like,...

const About = props =>{ 
    return(
<ScrollView style = {{backgroundColor: 'rgba(223, 108, 22, 1)', height: Dimensions.get('window').height}}>
<Text style = {{ fontSize: 25, fontWeight: 'bold', marginLeft: 4, marginBottom: 5, borderColor: 'white',borderWidth: 2, borderRadius: 8,
  color:'#183592',marginRight: 285}}>
    Rules:  </Text>
<Text style = {styles.AboutPageP}>
  <B>1.</B> Be nice in the message log! No mean-spirited, hateful, or discriminatory messages. 
  {'\n'}{'\n'}<B>2.</B> Be careful when using the map! Make sure to look up from your phone and stay aware of your surroundings
   </Text>
<Text style = {styles.AboutPageP}>
  {'\n'}<B>3.</B> Obey traffic safety laws when using the compass.
  Our compass feature points you directly to the goal. The compass does not take into account roads, private property, or other hazards.{'\n'}
  </Text>
<Text style = {{ fontSize: 25, fontWeight: 'bold', marginLeft: 4, marginBottom: 5, borderColor: 'white',borderWidth: 2, borderRadius: 8, color:'#183592',marginRight: 195}}>
  Who Are We?
  </Text>
<Text style = {styles.AboutPageP}>
  #izadjaju-- This app was created as a software development project for the Macalester College class COMP225 Software Development.
  The four main authors of the project are: Julia Kispert, A'di Dust, James Bellitto, and Izzy Valdivia with lots of help from our instructor! {'\n'} 
  </Text>
<Text style = {{ fontSize: 25, fontWeight: 'bold', marginLeft: 4, marginBottom: 5, borderColor: 'white',borderWidth: 2, borderRadius: 8, color:'#183592',marginRight: 105}}>
  Acknowledgements:
  </Text>
<Text style = {styles.AboutPageP}>
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
    marginRight: 5,
    marginLeft: 5, 
    lineHeight: 25, 
    color: 'white',
  },
}); 
export default About;
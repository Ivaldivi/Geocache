//Created by A'di (probably graphics help from others later)
//
//This component appears when user reaches goal (logic for that is in App.js).
//Allows users to make comments on location using firebase firestore database. 
//Also allows users to view the comments made by others previously. 

import React from 'react';
import { SafeAreaView, TextInput, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useState } from 'react/cjs/react.production.min';

//TODO: adjust database for goal variable

// Initialize Firebase -- taken and adjusted from 
//https://docs.expo.io/guides/using-firebase/
const firebaseConfig = {
    apiKey: 'api-key',
    authDomain: 'project-id.firebaseapp.com',
    databaseURL: 'https://Geocache.firebaseio.com',
    projectId: 'geocache-f983a',
    storageBucket: 'geocache-f983a.appspot.com',
  };
firebase.initializeApp(firebaseConfig);

//variable to reference the Message collection database 
const messageCollection = firestore().collection('Messages');


const [data, setData] = useState([])

const Victory = () => {

    //State of message input by user -- used for inputing into firestor
    const [text, setText] = useState("Comment");

    //Saves message to both the state and the firestore message collection
    const saveMessage = (props) => {
        setText(props.message);
        messageCollection.add({ message: props.text});
    }


    //The code related to reading collection data is adjusted from
    //https://rnfirebase.io/firestore/usage
    function onResult(QuerySnapshot){
        firestore().collection('Messages').get().then(querySnapshot => {
            //For every document in the message collection, put the message into the data 
            //stack to be used for the flat list. 
            querySnapshot.forEach(documentSnapshot => {
                const newData = data.slice();
                newData.push({id: documentSnapshot.id, title: documentSnapshot.get('message')});
                setData(newData);
            })
        })
    }

    //Creates a view that contains a label with given text (used for comments)
    const Item = ({ props }) => (
        <View style = {styles.item}>
            <Text style = {styles.title}>{props.title}</Text>
        </View>
    )

    //creates a flatlist item based on message
    const renderItem = ({ props }) => (
        <Item title={props.title}/>
    );

    //If retrieval of data from firestore has an error, print to console
    function onError(error){
        console.error(error);
    }

    //Constantly looks for new messages 
    firestore().collection('Messages').onSnapshot(onResult, onError)

    //I used https://reactnative.dev/docs/textinput to format and save text input. 
    //View contains place to write comment, and flat list of comments given by others
    return(
        <SafeAreaView style={styles.container}>
            <TextInput 
            style={styles.input}
            onChangeText={(text) => saveMessage(text = text)}
            placeholder="Tell us what you think about Scot!"
            value={text}/>
            <FlatList
                data = {data} 
                renderItem={renderItem(Item(title=text))}
                keyExtractor={item => item.id}
                />
        </SafeAreaView>
    )

}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    item: {
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
      },
  });
  
  export default Victory
//Created by A'di (probably graphics help from others later -- feel free to add to this comment
//when we get to that point ^_^)
//
//This component appears when user reaches goal (logic for that is in App.js).
//Allows users to make comments on location using firebase firestore database. 
//Also allows users to view the comments made by others previously. 

import React, {useState, useEffect} from 'react';
import { SafeAreaView, TextInput, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';
import * as firebase from 'firebase';
import "firebase/firestore";

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


const firestore = firebase.firestore();

//variable to reference the Message collection database 
const messageCollection = firestore.collection('Messages');


const Victory = () => {

    const [data, setData] = useState([])

    //State of message input by user -- used for inputing into firestore
    const [text, setText] = useState("");

    //Saves message to both the state and the firestore message collection
    const saveMessage = (message) => {
        setText(message);
        messageCollection.add({ message: text});
    }


    //The code related to reading collection data is adjusted from
    //https://rnfirebase.io/firestore/usage
    function onResult(QuerySnapshot){
        firestore.collection('Messages').get().then(querySnapshot => {
            if (querySnapshot.exists){
                //For every document in the message collection, put the message into the data 
                //stack to be used for the flat list. 
                querySnapshot.forEach(documentSnapshot => {
                    const newData = data.slice();
                    newData.push({id: documentSnapshot.id, title: documentSnapshot.get('message')});
                    setData(newData);
                    console.log('yes')
                })
            }
        })
    }

    //Creates a view that contains a label with given text (used for comments)
    const Item = ({ title }) => (
        <View style = {styles.item}>
            <Text style = {styles.title}>{title}</Text>
        </View>
    )

    const renderItem = ({ item }) => (
        <Item title={item.title} />
      );

    //If retrieval of data from firestore has an error, print to console
    function onError(error){
        console.error(error);
    }

    //Constantly looks for new messages 
    useEffect(() => {
        firestore.collection('Messages').onSnapshot(onResult, onError)
    });
    
    

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
                renderItem={renderItem}
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
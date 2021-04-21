//Created by A'di and James (probably graphics help from others later -- feel free to add to this comment
//when we get to that point ^_^)
//
//This component appears when user reaches goal (logic for that is in App.js).
//Allows users to make comments on location using firebase firestore database. 
//Also allows users to view the comments made by others previously. 

import React, { useState, useEffect } from 'react';
import { TextInput, View, FlatList, StyleSheet, Text, StatusBar, Button, ActivityIndicator } from 'react-native';
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


const Victory = (props) => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [comment, setComment] = useState('');


    //Adding comments to flatlist was inspired by https://rnfirebase.io/firestore/usage-with-flatlists

    //Constantly looks for and updates 'data' with new comments left by users using firestore. 
    useEffect(() => {
        const subscriber = firestore.collection('Messages').onSnapshot(querySnapshot => {
            const comments = [];
            querySnapshot.forEach(documentSnapshot => {
                if (documentSnapshot.get('location').isEqual(new firebase.firestore.GeoPoint(props.location.latitude, props.location.longitude))){
                    comments.push({
                        title: documentSnapshot.get('message'),
                        key: documentSnapshot.id,
                    });
                }
            });
            setData(comments);
            setLoading(false);
        });
        return () => subscriber();
    }, []);
    if (loading) {
        return <ActivityIndicator />;
    }


    //Saves given message to firestore when user clicks 'leave comments here' button. 
    const saveMessage = () => {
        console.log(props.location)
        firestore.collection('Messages').add({
            message: comment,
            location: new firebase.firestore.GeoPoint(props.location.latitude, props.location.longitude)
        })
    }


    //I used https://reactnative.dev/docs/textinput to format and save text input. 
    //View contains place to write comment, and flat list of comments given by others
    return (
        <View>
            <TextInput
                placeholder={'leave comments here!'}
                style={styles.input}
                onChangeText={(currentComment) => setComment(currentComment)} />
            <Button
                title={'Submit your comment!'}
                onPress={saveMessage}
            />
            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <View style={{ height: 20, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text>{item.title}</Text>
                    </View>
                )}
            />
        </View>
    );

}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        flex: 1,
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
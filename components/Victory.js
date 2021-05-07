//Created by A'di and James, graphics by Julia, Image by Izzy
//
//This component appears when user reaches goal (logic for that is in App.js).
//Allows users to make comments on location using firebase firestore database. 
//Also allows users to view the comments made by others previously. 

import React, { useState, useEffect } from 'react';
import { TextInput, Dimensions, View, FlatList, StyleSheet, Text, Image, Button, ActivityIndicator, SafeAreaView } from 'react-native';
import * as firebase from 'firebase';
import "firebase/firestore";
import { Audio } from 'expo-av';

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

const Victory = (props) => {

    // /Play the victory music! By James. Taken and adjusted from https://docs.expo.io/versions/latest/sdk/audio/
    useEffect(() => {
        let victorySound = null;
        let componentActive = true; //fixes a potential race condition if user exits before sound finishes loading
        async function playSound() {
            const { sound } = await Audio.Sound.createAsync(
                require('./assets/nttserenade.m4a') //Sound courtesy of Paul!
            );
            victorySound = sound;
            if (componentActive) {
                await victorySound.playAsync();
            }
        }
        playSound();

        return function cleanup() {
            componentActive = false;
            if (victorySound) {
                victorySound.stopAsync();
            }
        };
    }, []); //an empty array as a second argument in useEffect() makes it only run once


    //Various states to handle comment loading and data
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [comment, setComment] = useState('');
    const [name, setName] = useState('Anonymous');


    //Adding comments to flatlist was inspired by https://rnfirebase.io/firestore/usage-with-flatlists
    //Constantly looks for and updates 'data' with new comments and usernames
    useEffect(() => {
        const subscriber = firestore.collection('Messages').onSnapshot(querySnapshot => {
            const comments = [];
            querySnapshot.forEach(documentSnapshot => {
                if (documentSnapshot.get('location').isEqual(new firebase.firestore.GeoPoint(props.location.latitude, props.location.longitude))) { //filters so that the only messages returned correspond to the goal location
                    comments.push({
                        title: documentSnapshot.get('message'),
                        name: documentSnapshot.get('userName'),    //(if user doesn't enter name simply saves as "anonymous") left by users using firestore. 
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


    // sameMessage saves the name and comment to later be added to the comment scrollView
    const saveMessage = () => {
        if (name === null || name.trim() === '') {
            setName('Anonymous'); //sets to "anonymous if there isn't a name given
        }
        if (comment !== null && comment.trim() !== '') { //only saves message to firestore if there is a comment
            firestore.collection('Messages').add({
                message: comment,
                location: new firebase.firestore.GeoPoint(props.location.latitude, props.location.longitude), //this is to check which comment corresponds to which cache
                userName: name
            })
        }
        setComment(''); //Sets input text back to empty string
    }

    const handleSetName = (currentName) => {
        if (currentName === null || currentName.trim() === '') {
            setName('Anonymous');    //Sets name to anonymous if text input is empty,
        } else {
            setName(currentName);    //otherwise sets name state appropriately with given name. 
        }
    }


    //I used https://reactnative.dev/docs/textinput to format and save text input. 
    //View contains place to write comment and user name, and flat list of comments and names given by others
    return (
        <SafeAreaView style={styles.victoryScreenContainer}>
            <Image style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height / 3 }} source={require('./images/contratsScreen.png')} />
            <TextInput
                clearButtonMode={'always'}
                placeholder={'Leave comment here'}
                style={styles.input}
                onChangeText={(currentComment) => setComment(currentComment)}
                value={comment}
                returnKeyType='done' />
            <TextInput
                clearButtonMode={'always'}
                placeholder={'Add your name here'}
                style={styles.input}
                onChangeText={(userName) => handleSetName(currentName = userName)}
                returnKeyType='done' />
            <View style={styles.submitButton}>
                <Button
                    style={styles.submitButton}
                    color={'white'}
                    title={'Submit your comment!'}
                    onPress={saveMessage}
                />
            </View>
            <Text style={styles.text}> Scroll To See All Comments </Text>
            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <View style={{ height: 20, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={styles.comments}>{item.name}: {item.title}</Text>
                    </View>
                )}
            />
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    victoryScreenContainer: {
        backgroundColor: 'lightblue',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        fontWeight: 'bold',
    },
    text: {
        fontSize: 15,
        fontWeight: 'bold',
        borderColor: 'lightblue',
        borderWidth: 2,
        borderRadius: 2,
        alignSelf: 'center',
        color: 'rgba(223, 108, 22, .9)',
    },
    comments: {
        fontWeight: 'bold',
        borderColor: 'white',
    },
    submitButton: {
        backgroundColor: 'rgba(223, 108, 22, .9)',
        paddingHorizontal: 18,
        paddingVertical: 10,
        borderRadius: 20,
        alignContent: 'center',
        color: 'white',
        marginBottom: 5,
        display: 'flex',
        alignSelf: 'center'
    }
});


export default Victory
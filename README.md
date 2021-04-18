# Geocache
Geocaching app for Comp225

### Find Coordinates Method 
This Method is needed by both the map and the compass. Currently, there is an issue with defining "this" and it appears there is confusion within the code about state (as Map View sets a state, that is different than the state the current compass is requesting for). This method works when putting Compass and Map in their own apps.

____________________

### Map Screen 
Currently screen works, but needs to be adpated for user purposes. Warning occurs, and source appears to be from Find Coordinates Method in combination with the compass class. 
### References and Inspiration for Find Coordinates Method and Map Screen: 

###### Prashant Gond's "How to Use Geolocation and Geocding in React Native Apps", published December 18, 2019 to Web Dev Zone: https://dzone.com/articles/how-to-use-geo-location-geo-coding-in-react-native

##### Aman Mittal's "Using Geolocation in React Native", published September 30, 2018 to Digital Ocean: https://www.digitalocean.com/community/tutorials/react-geolocation-react-native

##### Example React Native Project where stylistic ideas were referenced: https://github.com/react-native-maps/react-native-maps

____________________

### Compass Screen 
This screen creates a simple arrow that points to the direction of the goal coordinates (AKA Scot). This screen currently works with hardcoded values, although we need to do further testing to be sure the arrow is pointing correctly. Utilizing the compass' magnetometer, the user coordinates, and the goal coordinates, this screen finds the bearing and heading in order to point in the correct direction. 

##### const changeBearing
Adjusts the bearing state (cardinal angle between user and goal coordinates) as coordinate information changes. Uses 'getGreatCircleBearing' function from Geolib package.

##### useEffect()
Purpose is to turn compass and to run methods. Currently, may need to insert a possible error when it is called but toggle is unsubscribed (meaning it should be turned off), another possible source of the warning. 
 
##### const _toggle
Repersents if the app(specifically the compass screen) is subscribed (it is on and running). 

#### const subscribe, const unscribed 
Turns Magnetometer on and sends angle of phone, removes subscription and should stop the whole screen. 

#### const _angle 
Uses magnetometer to find the angle the phone is pointing in degrees east of North. At the bottom of method descriptions will be references to where Math was refrenced from.

#### const _degree
Adjusts magnetometer to be in correct degrees for rotation.

#### const _finalAngle
This function finds the angle of arrow image rotation by doing simple math with bearing and heading (magnetometer) states. 

### References and Inspiration for Compass Screen: 
###### Stack Overflow post for angle math: https://stackoverflow.com/questions/57308560/smooth-orientation-compass-using-react-native-sensorss-magnetometer
###### A compass app created by @Rahul Hague was referenced to better understand math to find angle. https://github.com/rahulhaque/compass-react-native-expo
###### The documentation for GeoLib helped with bearing understanding: https://www.npmjs.com/package/geolib
###### The following article helped understand the math and terminology to create the compass (heading, bearing, etc): http://www.movable-type.co.uk/scripts/latlong.html

____________________

### Victory Screen
This screen appears when the user reaches goal. It allows users to make comments on location using Firebase Firestore database. It also allows users to view the comments made by others previously. 

#### const saveMessage
This function saves the user's message to the text state and also pushes the message to the Messages collection in Firestore. 

#### const onResult
If there aren't errors reaching the Firestore Messages collection, this function loops through each message and puts it in the data stack to be used for the list of comments later on.

#### const Item
Creates a stylized text with the message as the text. 

#### const renderItem
Creates an item with correct comment message. 

#### function onError
If there is an error accessing the Message collection in Firestore this function returns the appropriate error message to the console. 

### References and Inspiration for Victory Screen: 
###### General guide for using Firebase with a react native expo app: https://docs.expo.io/guides/using-firebase/
###### Guide to using Firebase's Firestore with react native expo app: /https://rnfirebase.io/firestore/usage
###### Used to format text box and save input to a const: https://reactnative.dev/docs/textinput

____________________


### Images within assets 
All pngs with no copy right information or labeled cliip art, found on the internet. 



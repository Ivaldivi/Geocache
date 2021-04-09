# Geocache
Geocaching app for Comp225

### Find Coordinates Method 
This Method is needed by both the map and the compass. Currently, there is an issue with defining "this" and it appears there is confusion within the code about state (as Map View sets a state, that is different than the state the current compass is requesting for). This method works when putting Compass and Map in their own apps. 
### Map Screen 
Currently screen works, but needs to be adpated for user purposes. Warning occurs, and source appears to be from Find Coordinates Method in combination with the compass class. 
### References and Inspiration for Find Coordinates Method and Map Screen: 

###### Prashant Gond's "How to Use Geolocation and Geocding in React Native Apps", published December 18, 2019 to Web Dev Zone: https://dzone.com/articles/how-to-use-geo-location-geo-coding-in-react-native

##### Aman Mittal's "Using Geolocation in React Native", published September 30, 2018 to Digital Ocean: https://www.digitalocean.com/community/tutorials/react-geolocation-react-native

##### Example React Native Project where stylistic ideas were referenced: https://github.com/react-native-maps/react-native-maps

### Compass Screen 
Currently screen works, but needs to be adpated for user purposes. Warning occurs, and source appears to be from Find Coordinates Method in combination with the map class. This screen is not suited to help the user currently. It is only the basic setup of a compass and must be altered to help user get to their destination. The following will be short descriptions of current methods before futher updated: 
##### useEffect()
Purpose is to turn compass and to run methods. Currently, may need to insert a possible error when it is called but toggle is unsubscribed (meaning it should be turned off), another possible source of the warning. 
 
##### const _toggle
Repersents if the app(specifically the compass screen) is subscribed (it is on and running). 

### const subscribe, const unscribed 
Turns Magnetometer on and sends angle of phone, removes subscription and should stop the whole screen. 

### const _angle 
uses magnetometer to find the angle of which the phone is at. At the bottom of method descriptions will be references to where Math was refrenced from. 

  
### const _direction 
based on the degree of the angle of the phone found with the magnetometer, this method returns the direction the phone is turned in. 

### const _degree
Assigns the top of the phone to represent 0 degrees, and based on its movement after assignment representes degree of the device turn, to be sent to direction which represents the degree the phone has moved as a direction.

### References and Inspiration for Compass Screen: 
###### Stack Overflow post for angle math: https://stackoverflow.com/questions/57308560/smooth-orientation-compass-using-react-native-sensorss-magnetometer
###### A compass app created by @Rahul Hague was referenced to better understand math to find angle. https://github.com/rahulhaque/compass-react-native-expo
###### A compass app created by #Mr-Chen-Alliance, this was also referenced to better understand naviagtion. https://github.com/Mr-Chen-Alliance/emoji-compass/blob/master/client/input.js



### Images within assets 
All pngs with no copy right information or labeled cliip art, found on the internet. 



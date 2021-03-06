# Geocache

Authors: Julia Kispert, James Bellitto, A'di Dust, and Izzy Valdivia 
This app was created for the Module 4 version of Macalester's COMP225 class taught by Paul Cantrell

____________________

### Mac-Cache & User Instructions:
Our Macalester-themed geocaching app is aimed at all Macalester students and Mac-Groveland residents. The premise is users may choose a special goal location to travel to (by foot or other means of transportation), where their journey is enhanced by a given map and compass (an arrow that points in the direction of the goal) tools. When arriving at a location, users are rewarded with a victory screen accompanied by bagpipe music, where users can leave comments for others who travel to the exact location. Our game features fun locations around Macalester's campus to engage students and push them to find new places. This app encourages exploration and connecting with others as users find new locations and leave comments.  

In order to use the app, they should first download the expo go app which can be found here: 

(Apple) https://apps.apple.com/us/app/expo-go/id982107779 

(Android) https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en_US&gl=US

If the user has an Android phone, they should use this link to open this app the Expo go: https://expo.io/@izz_val/navigation1

If the user has an iOS device, they have to clone the project and create their own published version. This can be accomplished by cloning the project from this github repository, navigating to it in your terminal, and then running `expo publish`. The result will give you a link in which you can open the published version from in the expo go mobile app. 

#### Goals: 
We created these goals at the start of our project and stuck to them until the end:
1. Allow the user to choose a location out of different options. This will encourage exploration of the Twin Cities and Mac-Groveland area and gives users an activity they can do with their friends or alone to familiarize themselves with the area. 
2. Create a home/introduction screen. 
3. When users get within a certain distance of the goal, have a victory screen pop up that says they found the location. 
4. There will be a message log where people can leave messages (possibly for others if they choose to) when they arrive at the location. This will allow for a sense of connection with others in current COVID-19 times when in-person interaction is not possible. 
____________________


### Home Screen
Fun, styled screen with buttons a start button that will take the user to the goal screen, and an about button that navigates to the About screen. The scott png is the same one used for the markers and loading screen. The citation can be found at the bottom of the README. 

#### References for Home Screen: 
##### How to rotate an image in React Native: https://reactnativeforyou.com/how-to-rotate-an-image-in-react-native/
##### React Native documetation on Images: https://reactnative.dev/docs/image

____________________

### About Screen
This screen is a simple scroll view that gives users an idea of how to use the app, rules for use, and credits. 

#### References for the About Screen: 
###### How to use a scroll view-- React Native Documentation: https://reactnative.dev/docs/using-a-scrollview
____________________

### Goal Screen
A google-maps styled screen displaying goal markers as Mac the Scott. Users can view their location and goals, and select a goal by pressing on one of the Mac the Scot goal markers. Selecting a goal marker sets a global variable with goal coordinates. Selecting a marker also brings the user directly to the map screen (and sets the goal of the map screen to the goal coordinates). If user presses on marker, marker will show a short one-two word description of what the location is.   

##### ScottMarker
A component that allows for easy additions of more goal locations. The component keeps track of a title, location coordinates, image, and handles operating system differences between android and iOS. 

____________________

### Map Screen
This screen creates a google map that shows the user location and the goal location (with a marker picture of Scot). When user is within a certain distance of the goal, the screen switches to the Victory Screen. The user can switch betwen the Compass Screen and Map Screen at will by selecting a button.

##### Find Coordinates Method 
Finds user coordinates using geolocation navigator. 

##### const GoalMarker
Sets the goal marker's coordinates according to user marker selection (snelling and grand is the default coordinates). Creates a Mapview.Marker component with correct coordinates. 

#### References and Inspiration for Map Screen: 

###### Prashant Gond's "How to Use Geolocation and Geocding in React Native Apps", published December 18, 2019 to Web Dev Zone: https://dzone.com/articles/how-to-use-geo-location-geo-coding-in-react-native

###### Aman Mittal's "Using Geolocation in React Native", published September 30, 2018 to Digital Ocean: https://www.digitalocean.com/community/tutorials/react-geolocation-react-native

###### Example React Native Project where stylistic ideas were referenced: https://github.com/react-native-maps/react-native-maps

###### How to Integrate Google Maps into React Native tutorial: https://dzone.com/articles/how-to-integrate-google-maps-in-react-native
____________________

### Compass Screen 
This screen creates a simple arrow that points to the direction of the goal coordinates (AKA Scot). Utilizing the compass' magnetometer, the user coordinates, and the goal coordinates, this screen finds the bearing and heading in order to point in the correct direction. When user is within a certain distance of the goal, the screen switches to the Victory Screen. The user can switch betwen the Compass Screen and Map Screen at will by selecting a button. 

##### const changeBearing
Adjusts the bearingReference state (cardinal angle between user and goal coordinates) as coordinate information changes. Uses 'getGreatCircleBearing' function from Geolib package.

##### useEffect()
Purpose is to turn compass and to run methods. It calles to unsubscribe and subscriped based on if the compass is running to subscribe its functions. 

#### const subscriptionReference
Turns Magnetometer on and sends angle of phone if true. Ends subscription and should stop the whole screen if false. 

#### const _getHeadingAngle 
Uses magnetometer to find the angle the phone is pointing in degrees east of North. At the bottom of method descriptions will be references to where Math was refrenced from.

#### atan2Normalized
Normalizes atan funtion to work with compass angles. 

#### const _getFinalHeadingAngle
This function finds the angle of arrow image rotation by doing simple math with bearing and heading (magnetometer) states. 

#### const changeDistance
Finds distance between user and goal coordinates and updates distance text component appropriately. 

#### References and Inspiration for Compass Screen: 
###### Stack Overflow post for angle math: https://stackoverflow.com/questions/57308560/smooth-orientation-compass-using-react-native-sensorss-magnetometer
###### A compass app created by @Rahul Hague was referenced to better understand math to find angle. https://github.com/rahulhaque/compass-react-native-expo
###### The documentation for GeoLib helped with bearing understanding: https://www.npmjs.com/package/geolib
###### The following article helped understand the math and terminology to create the compass (heading, bearing, etc): http://www.movable-type.co.uk/scripts/latlong.html

____________________

### Victory Screen
This screen appears when the user reaches goal. It allows users to make comments on location using Firebase Firestore database. It also allows users to view the comments made by others previously. 

#### useEffect (sound)
The first instance of useEffect in the file works with playing the victory sound.  Unlike the useEffect below which constantly searches for changes in a database,this useEffect triggers immediately on navigating to the victory screen and runs only once.

#### async function playSound()
This function makes sure that the user has the correct audio file and plays that file when called.

#### function cleanup()
Resets the data necessary to make playSound work ana helps prevent race conditions using the boolean componentActive.  

#### useEffect (firebase)
This hook constantly searches for changes in the firestore database, and when a change is detected it adds the comment and username data to the data state. 

#### const saveMessage
This function reacts to a button press in order to save the user's message (entered through a text input) as a message in the firestore database. It also adds the user's name. If a user doesn't provide their name the default name is "anonymous". 

#### const handleSetName
This sets the user's name to anonymous if they do not enter a name. Otherwise the name is set to the name they entered.

### References and Inspiration for Victory Screen: 
###### General guide for using Firebase with a react native expo app: https://docs.expo.io/guides/using-firebase/
###### Guide to using Firebase's Firestore with react native expo app: /https://rnfirebase.io/firestore/usage
###### Used to format text box and save input to a const: https://reactnative.dev/docs/textinput
###### Guide for how to use flatlists with firestore database: https://rnfirebase.io/firestore/usage-with-flatlists
###### React Native documetation on Images: https://reactnative.dev/docs/image
###### Documentation on expo-av: https://docs.expo.io/versions/latest/sdk/audio/

____________________


### Images within assets 
All pngs with no copy right information or labeled clip art, found on the internet. 
###### Scot.png: https://scorestream.com/team/macalester-college-scots-274538
###### Macalester Campus picture on loading screen: Photo credit -> McGhiever, CC BY-SA 4.0 <https://creativecommons.org/licenses/by-sa/4.0>, via Wikimedia Commons 
###### 'MAC CACHE' image on home screen: Izzy 
###### 'Congrats, you found the scott' Image on victory screen: Izzy

### Future Ideas: 
##### Augmented Reality when arriving to Maccache location or added to Geocache markers on the maps
##### Add a login screen to the app
##### Allow users to add locations
##### Give hints for locations
##### Allow users to leave pictures and drawings on victory screen 
##### Allow users to save favorite locations and past locations they have been to

### Bugs: 
##### Victory screen submit button for a message does not show up on smaller phone screens until keyboard exited
##### Compass Arrow acts a little weird when very close to cache location 
##### When choosing your goal geocache, if the goal's coordinates are far away from user location, map region may not show the user AND the Geocache (user must zoom out to see their location)





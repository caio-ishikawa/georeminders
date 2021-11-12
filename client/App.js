import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useContext, useRef } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Map from './components/Map';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import Header from './components/HeaderIOS';
import SearchBar from 'react-native-elements/dist/searchbar/SearchBar-ios';
import { CoordContext, LocationContext, ExpoToken } from './global/Contexts';
import * as Notifications from 'expo-notifications';
import { registerForPushNotificationsAsync } from './utils/registerForPushNotificationsAsync';
import Login from './routes/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from './routes/Main';
import Home from './routes/Home';
import Register from './routes/Register';
import * as SecureStore from 'expo-secure-store';


const LOCATION_TASK_NAME = 'background-location-task';

// Notification Settings //
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const Stack = createNativeStackNavigator();

export default function App() {
  const [coords, setCoords] = useState('');
  const [expoToken, setExpoToken] = useState('');
  const [location, setLocation] = useState('');
  const responseListener = useRef();

  // Prompts user to accept push notifications //
  useEffect(() => {
    registerForPushNotificationsAsync().then(token => {setExpoToken(token); console.log("TOKEN: ", token)});

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {console.log(response)});

    return () => {
      Notifications.removeNotificationSubscription(responseListener.current);
    }
  }, []);

  // Sets up user location // 
  useEffect(async() => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === 'granted') {
      await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        accuracy: Location.Accuracy.Balanced,
        timeInterval: 29000
    });
  }
  //console.log(location);
  },[location]);

  // Sets state to user location //
  TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
    if (error) {
      console.log("ERROR IN LOCAITON SERVICE: ", error);
    }; 
    if (data) {
      setLocation(data.locations[0].coords);
    }

  });

  return (
    // <CoordContext.Provider value={[coords, setCoords]}>
    //   <View style={styles.container}>
    //     <StatusBar style="auto" />
    //     <LocationContext.Provider value={[location, setLocation]}>
    //       <ExpoToken.Provider value={[expoToken, setExpoToken]}>
    //         <Map/>
    //       </ExpoToken.Provider>
    //     </LocationContext.Provider>
    //     <Header/>
    //   </View>
    // </CoordContext.Provider>
   
    <CoordContext.Provider value={[coords, setCoords]}>
      <LocationContext.Provider value={[location, setLocation]}>
        <ExpoToken.Provider value={[expoToken, setExpoToken]}>
            <NavigationContainer>
              <Stack.Navigator initialRouteName="Home">
                <Stack.Screen options={{ headerShown: false}} name="Login" component={Login}/>
                <Stack.Screen options={{ headerShown: false}}  name="Main" component={Main}/>
                <Stack.Screen options={{headerShown: false}} name="Home" component={Home}/>
                <Stack.Screen options={{ headerShown: false }} name="Register" component={Register}/>
              </Stack.Navigator>
            </NavigationContainer>
        </ExpoToken.Provider>
      </LocationContext.Provider>
    </CoordContext.Provider>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});



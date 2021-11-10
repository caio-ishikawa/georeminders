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
import { addNotificationResponseReceivedListener, addNotificationsDroppedListener } from 'expo-notifications';
import { registerForPushNotificationsAsync } from './utils/registerForPushNotificationsAsync';

const LOCATION_TASK_NAME = 'background-location-task';

// Notification Settings //
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

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

  // Sets state to user location //
  TaskManager.defineTask(LOCATION_TASK_NAME, async () => {
    let userLocation = await Location.getCurrentPositionAsync({});
    setLocation(userLocation.coords);
  });

  // Sets up user location // 
  useEffect(async() => {
    let loc = await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        accuracy: Location.Accuracy.Balanced,
        timeInterval: 29000
  });
  //console.log(location);
},[location]);

  return (
    <CoordContext.Provider value={[coords, setCoords]}>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <LocationContext.Provider value={[location, setLocation]}>
          <ExpoToken.Provider value={[expoToken, setExpoToken]}>
            <Map/>
          </ExpoToken.Provider>
        </LocationContext.Provider>
        <Header/>
      </View>
    </CoordContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});



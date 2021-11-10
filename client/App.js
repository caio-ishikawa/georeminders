import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Map from './components/Map';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import Header from './components/HeaderIOS';
import SearchBar from 'react-native-elements/dist/searchbar/SearchBar-ios';
import { CoordContext, LocationContext } from './global/Contexts';

export default function App() {
  const [coords, setCoords] = useState('');
  const [location, setLocation] = useState('');
  const LOCATION_TASK_NAME = 'background-location-task';

    // Updates user location //
  const updateLocation = async () => {
    let userLocation = await Location.getCurrentPositionAsync({});
    setLocation(userLocation.coords);
  };

  TaskManager.defineTask(LOCATION_TASK_NAME, updateLocation);

  useEffect(async() => {
    let loc = await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        accuracy: Location.Accuracy.Balanced,
        timeInterval: 10000
  });
  //console.log(location);
},[coords, location]);

  return (
    <CoordContext.Provider value={[coords, setCoords]}>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <LocationContext.Provider value={[location, setLocation]}>
          <Map/>
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

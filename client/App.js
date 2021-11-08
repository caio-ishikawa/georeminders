import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Map from './components/Map';
import * as Location from 'expo-location';
import Header from './components/HeaderIOS';
import SearchBar from 'react-native-elements/dist/searchbar/SearchBar-ios';
import { CoordContext } from './global/Contexts';

export default function App() {
  const [coords, setCoords] = useState('');

  const test = async() => {
    let loc = await Location.requestForegroundPermissionsAsync();
    console.log(loc);
  };

  test();


  return (
    <CoordContext.Provider value={[coords, setCoords]}>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Map/>
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

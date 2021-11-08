import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Map from './components/Map';
import * as Location from 'expo-location';
import Header from './components/HeaderIOS';
import SearchBar from 'react-native-elements/dist/searchbar/SearchBar-ios';

export default function App() {

  const test = async() => {
    let loc = await Location.requestForegroundPermissionsAsync();
    console.log(loc);
  };

  test();


  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Map/>
      <Header/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

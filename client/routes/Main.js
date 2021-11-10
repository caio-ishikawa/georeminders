import React from "react";
import { View, StyleSheet} from 'react-native';
import Map from "../components/Map";
import { StatusBar } from 'expo-status-bar';
import Header from '../components/HeaderIOS';

const Main = ({ navigation }) => {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
            <Map/>
        <Header/>
      </View>
    )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });

export default Main;
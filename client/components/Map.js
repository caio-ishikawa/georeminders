import { View, StyleSheet } from 'react-native';
import React, {Component, useEffect, useState } from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';

const Map = () => {
    const [location, setLocation] = useState();
    const LOCATION_TASK_NAME = 'background-location-task';

    // Updates location //
    const updateLocation = async () => {
        let userLocation = await Location.getCurrentPositionAsync({});
        setLocation(userLocation);
    }

    TaskManager.defineTask(LOCATION_TASK_NAME, updateLocation);


    // Setup for background location //
    useEffect(async() => {
        let loc = await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
            accuracy: Location.Accuracy.Balanced,
            timeInterval: 1000
        });
        console.log(loc)
        //console.log(location)
    },[location]);


    return(
            <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
                latitude: 37,
                longitude: -122,
                latitudeDelta: 0.092,
                longitudeDelta: 0.0421}}
            />
    )
};

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      },
})

export default Map;
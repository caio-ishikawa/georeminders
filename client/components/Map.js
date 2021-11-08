import { View, StyleSheet } from 'react-native';
import React, {Component, useEffect, useState, useContext, createRef } from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import { CoordContext } from '../global/Contexts';

const Map = () => {
    const [location, setLocation] = useState();
    const [coords, setCoords] = useContext(CoordContext);
    const mapRef = createRef();
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
        console.log(coords ? coords : "no coordinates yet");
        const newCamera = {
            center: { latitude: coords.lat, longitude: coords.lng},
            zoom: 15,
            heading: 0,
            pitch: 0,
            altitude: 5
        }
        mapRef.current.animateCamera(newCamera, {duration: 1});
        //console.log(location)
    },[location, coords]);


    return(
            <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            ref={mapRef}
            initialCamera={{
                center: { latitude: 0, longitude: 0 },
                pitch: 0,
                zoom: 12,
                heading: 0,
                altitude: 0
            }}
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
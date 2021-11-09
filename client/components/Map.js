import { View, StyleSheet, Text, Alert } from 'react-native';
import React, {Component, useEffect, useState, useContext, createRef } from 'react';
import MapView, { PROVIDER_GOOGLE, Circle } from 'react-native-maps';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import { CoordContext } from '../global/Contexts';
import { styling } from '../map-styling/styling';

const Map = () => {
    const [location, setLocation] = useState();
    const [coords, setCoords] = useContext(CoordContext);
    const [pinCoords, setPinCoords] = useState({});
    const mapRef = createRef();
    const LOCATION_TASK_NAME = 'background-location-task';

    // Updates user location //
    const updateLocation = async () => {
        let userLocation = await Location.getCurrentPositionAsync({});
        setLocation(userLocation.coords);
    }

    TaskManager.defineTask(LOCATION_TASK_NAME, updateLocation);


    // Setup for background location //
    useEffect(async() => {
        let loc = await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
            accuracy: Location.Accuracy.Balanced,
            timeInterval: 1000
        });
        console.log(coords ? coords : "no coordinates yet");

        //If user specified coordinates change, update the map //
        if (coords) { 
            const newCamera = {
                center: { latitude: coords.lat, longitude: coords.lng},
                zoom: 16,
                heading: 0,
                pitch: 100,
                altitude: 10 
            }
            mapRef.current.animateCamera(newCamera, {duration: 1000});
        }
        console.log(location)
    },[coords, location, pinCoords]);

    // Set coordinates based on where the user pressed in the map //
    const mapPress = (e) => {
        let pin = e.nativeEvent.coordinate;

        // Asks user if they intend to drop a marker in that location //
        // Avoids misclick //
        Alert.alert("Do you with to place a reminder here?", "",
        [
            {
                text: "Yes",
                onPress: () => setPinCoords(pin)
            },
            {
                text: "No",
                onPress: () => console.log("no")
            }
        ]);
    };

    return(
            <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            ref={mapRef}
            customMapStyle={styling}
            onPress={(e) => mapPress(e)}
            initialCamera={{
                center: { latitude: 38.722252, longitude: -9.139337},
                pitch: 100,
                zoom: 12,
                heading: 0,
                altitude: 10 
            }}
            >
                <Circle
                center={{ latitude: pinCoords.latitude ? pinCoords.latitude : 38.722252, longitude: pinCoords.longitude ? pinCoords.longitude : -9.139337 }}
                radius={200}
                fillColor='black'
                />
            </MapView>
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
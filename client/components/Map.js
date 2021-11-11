import { View, StyleSheet, Alert } from 'react-native';
import React, {Component, useEffect, useState, useContext, createRef } from 'react';
import MapView, { PROVIDER_GOOGLE, Circle } from 'react-native-maps';
import { CoordContext, ExpoToken, LocationContext } from '../global/Contexts';
import { styling } from '../map-styling/styling';
import { distance } from '../utils/distance';
import { sendPushNotification } from '../utils/sendPushNotification';

const Map = () => {
    const [coords, setCoords] = useContext(CoordContext);
    const [location, setLocation] = useContext(LocationContext);
    const [expoToken, setExpoToken] = useContext(ExpoToken);
    const [pinCoords, setPinCoords] = useState({});
    const [reminder, setReminder] = useState('');
    const mapRef = createRef();

    // Returns distance between user and pin //
    useEffect(() => {
        let userLng = location.longitude;
        let userLat = location.latitude;
        let pinLng = pinCoords.longitude;
        let pinLat = pinCoords.latitude;
        let pinDistance = distance(userLat, userLng, pinLat, pinLng);

        if (pinDistance <= 0.30) {
            console.log("YOU CLOSE DUDE");
            sendPushNotification(expoToken);
        } else {
            console.log("NOT THAT CLOSE")
        }
    });

    // Sets up new Map Camera once user selects location from search bar //
    useEffect(() => {
        const newCamera = {
            center: { latitude: coords.lat, longitude: coords.lng},
            zoom: 16,
            heading: 0,
            pitch: 100,
            altitude: 10 
        };
        mapRef.current.animateCamera(newCamera, {duration: 1000});
    },[coords]);


    // Posts pin data on database //
    useEffect(async () => {
    const request = await fetch('http://localhost:3002/post/post_pin', {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            username: "Caiouser",
            note: reminder,
            lat: pinCoords.latitude,
            lng: pinCoords.longitude 
        })
    })
    const data = await request.json();
    console.log(data);
    }, [pinCoords]);

    // Set coordinates based on where the user pressed in the map //
    const mapPress = async (e) => {
        let pin = e.nativeEvent.coordinate;
        //console.log(pin);
        console.log("LOCATION: ", location)

        // Asks user if they intend to drop a marker in that location //
        // Avoids misclick //
        Alert.prompt("Set a reminder", "Submit your reminder!",
        [
            {
                text: "Submit",
                onPress: reminder => {
                    setPinCoords(pin)
                    setReminder(reminder);
                },
            },
            {
                text: "Cancel",
                onPress: () => console.log("no"),
                style: "cancel"
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
                radius={30}
                fillColor='purple'
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


// MAIN LOGIC TO DO:
// Save pin coordinates on local storage
// Send notification once you get close to pin
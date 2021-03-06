import { View, StyleSheet, Alert, Text, Animated } from 'react-native';
import React, {Component, useEffect, useState, useContext, createRef, useRef } from 'react';
import MapView, { PROVIDER_GOOGLE, Circle, Marker } from 'react-native-maps';
import { CoordContext, ExpoToken, LocationContext } from '../global/Contexts';
import { styling } from '../map-styling/styling';
import { distance } from '../utils/distance';
import { sendPushNotification } from '../utils/sendPushNotification';
import * as SecureStore from 'expo-secure-store';
import { animateCircle } from '../utils/animateCircle';

const Map = () => {
    const [coords, setCoords] = useContext(CoordContext);
    const [location, setLocation] = useContext(LocationContext);
    const [expoToken, setExpoToken] = useContext(ExpoToken);
    const [pinCoords, setPinCoords] = useState({});
    const [reminder, setReminder] = useState('');
    const [reminderAmount, setReminderAmount] = useState(0);
    const [allReminders, setAllReminders] = useState([]);
    const [userTier, setUserTier] = useState(0);
    const mapRef = createRef();
    const scaleAnimationRef = useRef(new Animated.Value(0)).current;
    const opacityAnimationRef = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        animateCircle(scaleAnimationRef, opacityAnimationRef);
    }, [opacityAnimationRef]);

    // Gets all pins from logged user //
    useEffect(async () => {
        console.log("UPDATING REMINDERS || UPDATING REMINDERS || UPDATING REMINDERS || UPDATING REMINDERS || UPDATING REMINDERS")
        let request = await fetch('http://192.168.1.74:3002/get/get_pins', {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: "Caiouser"
            })
        })
        const data = await request.json()
        setAllReminders(data.pins);
        setReminderAmount(data.pins.length);
    }, [reminder]);

    // Returns distance between user and pin //
    useEffect(() => {
        if (userTier === 0 && reminderAmount < 2) {
            let userLng = location.longitude;
            let userLat = location.latitude;
            let pinLng = reminderAmount > 0 ? allReminders[0].longitude : undefined;
            let pinLat = reminderAmount > 0 ? allReminders[0].latitude : undefined;
            let pinDistance = distance(userLat, userLng, pinLat, pinLng);

            if (pinDistance <= 0.80) {
                console.log("YOU CLOSE DUDE");
                console.log("DISTANCE FROM PIN: ", pinDistance + "m")
                sendPushNotification(expoToken);
            } else {
                console.log({"lng": pinLng, "lat": pinLat, "userLat": userLat, "userLng": userLng, "distance":pinDistance });
                console.log("NOT THAT CLOSE")
            }
        } else {
            console.log("Have not figured out how to calcualte distance for more pins at the same time without breaking my entire app")
        }
    });

    // Sets up new Map Camera once user selects location from search bar //
    useEffect(() => {
        const newCamera = {
            center: { latitude: coords.lat, longitude: coords.lng},
            zoom: 16,
            heading: 0,
            pitch: 0,
            altitude: 10 
        };
        mapRef.current.animateCamera(newCamera, {duration: 1000});
    },[coords]);


    // Posts pin data on database //
    const postPin = async (location, note) => {
        setPinCoords(location);
        setReminder(note);
        // If user is on free-tier and already has one pin placed, prompt subscription model //
        if (reminderAmount >= 1 && userTier === 0) {
            Alert.alert("Maximum amount of reminders reached!", "Click ok to redirect to subscription page.")
        } else {
            const request = await fetch('http://192.168.1.74:3002/post/post_pin', {
                method: "POST",
                headers: {
                    Accept: 'application/json',
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    username: "Caiouser",
                    note: note,
                    lat: location.latitude,
                    lng: location.longitude 
                })
            })
            const data = await request.json();
            console.log("post pin function", data);
        }
    };

    // Set coordinates based on where the user pressed in the map //
    const mapPress = async (e) => {
        let pin = e.nativeEvent.coordinate;
        // Asks user if they intend to drop a marker in that location //
        // Avoids misclick //
        Alert.prompt("Set a reminder", "Submit your reminder!",
        [
            {
                text: "Submit",
                onPress: reminder => {
                    postPin(pin, reminder);
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
                { reminderAmount > 0 ? 
                allReminders.map((rem, idx) => {
                    return (
                        <Marker
                        key={idx}
                        coordinate={{ latitude: rem.latitude, longitude: rem.longitude}}
                        >
                            <Animated.View style={styles.markerWrap}>
                                <Animated.View style={[
                                    styles.ring,
                                    { opacity: opacityAnimationRef },
                                    { transform: [{ scale: scaleAnimationRef }] }
                                ]}
                                />
                                <View style={styles.marker}/>
                            </Animated.View>
                        </Marker>
                    )
                    })
                    :
                    <Text>test</Text>
                }
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
    markerWrap: {
        alignItems: 'center',
        justifyContent: 'center'
        },
    marker: {
        width: 8,
        height: 8,
        borderRadius: 100,
        backgroundColor: 'rgba(130,4,150, 0.9)',
        position: 'absolute'
        },
    ring: {
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: 'rgba(130,4,150, 0.3)',
        borderWidth: 1,
        borderColor: 'rgba(130,4,150, 0.5)',
        opacity: 1
        }
})

export default Map;


// MAIN LOGIC TO DO:
// Save pin coordinates on local storage
// Send notification once you get close to pin
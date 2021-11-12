import React, { useEffect, useState } from "react";
import {View, Text, Pressable, Image, StyleSheet, TouchableOpacity, Button} from 'react-native';
import reminderlogo from '../assets/reminderlogo.png';
import {LinearGradient} from 'expo-linear-gradient';
import * as SecureStore from 'expo-secure-store';

const Home = ({ navigation }) => {
    const [storedName, setStoredName] = useState('');

    // Navigate to main page if username is stored in memory //
    useEffect(async() => {
        let storedUser = await SecureStore.getItemAsync('username');
        // if (storedUser) {
        //     navigation.navigate("Main");
        // }
    },[]);

    return(
        <View style={styles.cont}>
            <Image style={styles.logo} source={reminderlogo}/>
            <LinearGradient start={[0,1]} end={[1, 0]} colors={[ '#3f5efb', "#a751ac", "#fc466b", "#ff8d0a" ]} style={styles.linear}>
                <Button onPress={() => navigation.navigate("Register")} color="white" title="Get started" style={styles.login}/>
            </LinearGradient>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Login")}>
                <Text style={styles.login}>Log in</Text>
            </TouchableOpacity>
        </View>
    )

};

const styles = StyleSheet.create({
    logo:{
        alignSelf: "center",
        resizeMode: 'contain',
        width: 500,
        height:400,
        marginTop: "20%"
    },
    input: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "white",
        padding: "2%",
        height: "5.5%",
        marginTop: "5%",
        width: "60%",
        alignSelf: "center",
        color: "white"
    },
    text: {
        color: "white"
    },
    cont: {
        backgroundColor: "black",
        height: "100%"
    }, 
    linear: {
        width: "60%",
        alignSelf: "center",
        padding: 5,
        borderRadius: 25,
        borderColor: "white",
        overflow: "hidden",
        marginTop: "10%"
    },
    regPrompt:{
        color: "grey",
        alignSelf: "center",
        marginTop: "2%"
    },
    button: {
        borderWidth: 1,
        borderColor: "white",
        justifyContent: "center",
        borderRadius: 25,
        width: "60%",
        alignSelf: "center",
        height:"5.5%",
        marginTop: "5%",
    },
    login: {
        color: "white",
        fontWeight: "600",
        alignSelf: "center",
        fontSize:17.5 
    },
    welcome: {
        color: "white",
        fontSize: 35,
        alignSelf: "center",
        marginTop: "30%"
    },
    logoWelcome: {
        color: "orange",
        fontSize: 35,
        alignSelf: "center"
    }
});

export default Home;
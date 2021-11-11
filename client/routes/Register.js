import React, { useState } from "react";
import {View, Text, Alert, Image, StyleSheet, TextInput, Button} from 'react-native';
import logo4 from '../assets/logo4.png';
import {LinearGradient} from 'expo-linear-gradient';



const Register = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitData = async () => {
        const request = await fetch('http://localhost:3002/auth/register', { 
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username, 
                email: email,
                password: password
            })
        })
        const data = await request.json();
        if (data.data === "User successfully created!") {
            navigation.navigate("Main")
        } else {
            Alert.alert("Username or email alredy exist.", "Please try again with new credentials or log into you existing account.");
            console.log("this works")
        }

    };


    return (
        <View style={styles.cont}>
            <Image style={styles.logo} source={logo4}/>
            <TextInput value={username} style={styles.input} onChangeText={(text) => setUsername(text)} placeholder="Username"/>

            <TextInput value={email} onChangeText={(email) => setEmail(email)} style={styles.input} placeholder="Email"/>

            <TextInput value={password} onChangeText={(pass) => setPassword(pass)} style={styles.input} placeholder="Password"/>

            <TextInput style={styles.input} placeholder="Re-enter Password"/>
            <LinearGradient start={[0,1]} end={[1, 0]} colors={[ '#3f5efb', "#a751ac", "#fc466b", "#ff8d0a" ]} style={styles.linear}>
                <Button onPress={submitData} color="white" title="Log in"/>
            </LinearGradient>
        </View>
    )

};

const styles = StyleSheet.create({
    logo:{
        alignSelf: "center",
        resizeMode: 'contain',
        width: 300,
        height:300,
        marginTop: "10%",
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
        borderRadius: 5,
        marginTop: "5%" 
    },
    regPrompt:{
        color: "grey",
        alignSelf: "center",
        marginTop: "2%"
    }
})

export default Register;
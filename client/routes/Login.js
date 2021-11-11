import React, { useState } from "react";
import {View, Text, Pressable, Image, StyleSheet, TextInput, Button, Alert} from 'react-native';
import logo4 from '../assets/logo4.png';
import {LinearGradient} from 'expo-linear-gradient';



const Login = ( { navigation }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const submitData = async () => {
        const request = await fetch('http://localhost:3002/auth/login', { 
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username, 
                password: password
            })
        })
        const data = await request.json();
        if (data.data === "Successful login!") {
            navigation.navigate("Main")
        } else {
            Alert.alert("Invalid username/password.", "Please try again.");
            console.log("this works")
        }

    };


    
    return(
        <View style={styles.cont}>
            <Image style={styles.logo} source={logo4}/>
            <TextInput value={username} onChangeText={(user) => setUsername(user)} style={styles.input} placeholder="Username"/>
            <TextInput style={styles.input} placeholder="Password" value={password}onChangeText={(pass) => setPassword(pass)}/>
            <LinearGradient start={[0,1]} end={[1, 0]} colors={[ '#3f5efb', "#a751ac", "#fc466b", "#ff8d0a" ]} style={styles.linear}>
                <Button onPress={() => submitData()} color="white" title="Log in"/>
            </LinearGradient>
            <Text style={styles.regPrompt}>Forgot your password? Click here.</Text>


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

export default Login;
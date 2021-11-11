import React from "react";
import {View, Text, Pressable, Image, StyleSheet, TextInput, Button} from 'react-native';
import logo4 from '../assets/logo4.png';
import {LinearGradient} from 'expo-linear-gradient';



const Register = ( { navigation }) => {
    return(
        <View style={styles.cont}>
            <Image style={styles.logo} source={logo4}/>
            <TextInput style={styles.input} placeholder="Username"/>
            <TextInput style={styles.input} placeholder="Email"/>
            <TextInput style={styles.input} placeholder="Password"/>
            <TextInput style={styles.input} placeholder="Re-enter Password"/>
            <LinearGradient start={[0,1]} end={[1, 0]} colors={[ '#3f5efb', "#a751ac", "#fc466b", "#ff8d0a" ]} style={styles.linear}>
                <Button onPress={() => navigation.navigate("Main")} color="white" title="Log in"/>
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
import React from "react";
import {View, Text, Pressable, Image, StyleSheet, TouchableOpacity, Button} from 'react-native';
import logo4 from '../assets/logo4.png';
import {LinearGradient} from 'expo-linear-gradient';

const Home = ({ navigation }) => {
    return(
        <View style={styles.cont}>
            <Image style={styles.logo} source={logo4}/>
            <LinearGradient start={[0,1]} end={[1, 0]} colors={[ '#3f5efb', "#a751ac", "#fc466b", "#ff8d0a" ]} style={styles.linear}>
                <Button onPress={() => navigation.navigate("Register")} color="white" title="Register" style={styles.login}/>
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
        marginTop: "60%" 
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
        borderRadius: 5,
        width: "60%",
        alignSelf: "center",
        height:"5.5%",
        marginTop: "5%",
        backgroundColor: "#FFF9EC"
    },
    login: {
        color: "orange",
        fontWeight: "600",
        alignSelf: "center",
        fontSize:17.5 

    }
});

export default Home;
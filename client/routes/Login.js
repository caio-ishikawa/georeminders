import React from "react";
import {View, Text, Pressable, Image, StyleSheet, TextInput} from 'react-native';
import logo4 from '../assets/logo4.png';

const Login = ( { navigation }) => {
    return(
        <View style={styles.cont}>
            <Image style={styles.logo} source={logo4}/>
            <TextInput style={styles.input} placeholder="Username"/>
            <TextInput style={styles.input} placeholder="Password"/>
            <Pressable style={styles.button} title="Log in" onPress={() => navigation.navigate("Main")}>
                <Text style={styles.text}>Log in</Text>
            </Pressable>
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
    button: {
        alignItems: 'center',
        alignSelf: "center",
        justifyContent: 'center',
        paddingVertical: 12,
        width: "60%",
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#EF8354',
        marginTop: "5%"
    },
    text: {
        color: "white"
    },
    cont: {
        backgroundColor: "#2D3142",
        height: "100%"
    }
})

export default Login;
import { View, StyleSheet, Text } from 'react-native';
import React, { Component, useState } from 'react';
import { Header, Card } from 'react-native-elements';
import SearchBar from 'react-native-elements/dist/searchbar/SearchBar-ios';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';



const HeaderIOS = () => {
    const [search, setSearch] = useState();

    return(
        <GooglePlacesAutocomplete
        placholder="Search"
        styles={{
            container: {
                marginTop: "10%",
                width: "80%",
                alignSelf: "center",
                borderRadius: "190%",
            },
            textInput: {
                borderRadius: "30%",
            },
            listView: {
                borderRadius: "20%"
            },
        }}
        onPress={(data, details = null) => {
            console.log(data, details);
        }}
        query={{
            key: "AIzaSyAD63LGkmRT2kXTSHyaKBO5x6qIP9Sjb4U",
            language: "en"
        }}
        />
    )
};

const styles = StyleSheet.create({
    search: {
        marginTop: "10%"
    }
});

export default HeaderIOS;
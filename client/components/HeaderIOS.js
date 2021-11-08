import { View, StyleSheet, Text } from 'react-native';
import React, { Component, useState } from 'react';
import { Header, Card } from 'react-native-elements';
import SearchBar from 'react-native-elements/dist/searchbar/SearchBar-ios';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { apiKey } from '../secrets';


const HeaderIOS = () => {
    const [search, setSearch] = useState();

    const getCoords = (data) => {
        let address = data.structured_formatting.secondary_text;
        console.log(address);
    };

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
        onPress={(data) => getCoords(data)}
        query={{
            key: apiKey,
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
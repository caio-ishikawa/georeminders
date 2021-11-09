import { View, StyleSheet, Text } from 'react-native';
import React, { Component, useState, useContext } from 'react';
import { Header, Card } from 'react-native-elements';
import SearchBar from 'react-native-elements/dist/searchbar/SearchBar-ios';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { apiKey } from '../secrets';
import axios from 'react-native-axios';
import { CoordContext } from '../global/Contexts';


const HeaderIOS = () => {
    const [search, setSearch] = useState();
    const [coords, setCoords] = useContext(CoordContext);

    // Gets coordinates of the given address with Google Geocoding API //
    const getCoords = (data) => {
        let address = data.structured_formatting.secondary_text;
        let url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=" + apiKey;

        axios.get(url)
            .then((res) => {
                let coordinates = res.data.results[0].geometry.bounds.northeast;
                // Sets coordinates as global state //
                setCoords(coordinates);
            })
            .catch(function(error) {
                console.log(error);
            })
    };

    return(
            <GooglePlacesAutocomplete
            placeholder="Place Pin"
            styles={{
                container: {
                    marginTop: "15%",
                    width: "80%",
                    alignSelf: "center",
                },
                textInput: {
                },
                listView: {
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
    },
    card:{
        marginTop: "10%",
        alignContent: "center",
        alignItems: "center"
    }
});

export default HeaderIOS;
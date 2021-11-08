import { View, StyleSheet, Text } from 'react-native';
import React, { Component, useState } from 'react';
import { Header, Card } from 'react-native-elements';
import SearchBar from 'react-native-elements/dist/searchbar/SearchBar-ios';


const HeaderIOS = () => {
    const [search, setSearch] = useState();

    return(
        <Card containerStyle={{ borderRadius: "40%", height: "8%", alignItems: "center", justifyContent: "center", marginTop: "10%"}}>
            <SearchBar placeholder="Search" showCancel="false" onChangeText={(e) => setSearch(e)} value={search}/>
        </Card>
    )
};

const styles = StyleSheet.create({
    search: {
        width: "80%"
    }
});

export default HeaderIOS;
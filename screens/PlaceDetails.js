import { useEffect, useState } from 'react';
import { ScrollView, Image, View, Text, StyleSheet } from "react-native";
import OutlinedButton from "../components/UI/OutlinedButton";
import { Colors } from './../constants/colors';


function PlaceDetails({route}) {
    const selectedPlaceId = route.params.id;

    function showOnMapHandler() {}

    useEffect(() => {

    }, [selectedPlaceId])

    return (
        <ScrollView>
            <Image style={styles.image} />
            <View style={styles.locationContainer}>
                <View style={styles.addressContainer}>
                    <Text style={styles.address}>ADDRESS</Text>
                </View>
                <OutlinedButton icon="map" onPress={showOnMapHandler} >View on Map</OutlinedButton>
            </View>
        </ScrollView>
    )
}

export default PlaceDetails;

const styles = StyleSheet.create({
    image: {
        height: "35%",
        minHeight: 300,
        width: "100%"
    },
    locationContainer: {
        justifyContent: "center",
        alignItems: "center"
    },
    addressContainer: {
        padding: 20,
    },
    address: {
        color: Colors.primary500,
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 16
    }
})
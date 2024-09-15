import { useEffect, useState } from 'react';
import { ScrollView, Image, View, Text, StyleSheet } from "react-native";
import OutlinedButton from "../components/UI/OutlinedButton";
import { Colors } from './../constants/colors';
import { useSQLiteContext } from 'expo-sqlite';



function PlaceDetails({route, navigation}) {
    const db = useSQLiteContext();
    const selectedPlaceId = route.params.placeId;
    const [place, setPlace] = useState(null); 

    function showOnMapHandler() {}

    useEffect(() => {
        fetchPlaceDetails();
    }, [selectedPlaceId])

    useEffect(() => {
        if(!place) return
        setPlace(place);
        navigation.setOptions({
            title: place.title
        })
    }, [place])

    const fetchPlaceDetails = () => {
        const getPlaceStatement = db.prepareSync('SELECT * FROM places WHERE id = ?');

        db.withTransactionSync(() => {
            const result = getPlaceStatement.executeSync(selectedPlaceId).getFirstSync()
            setPlace(result);
        });
    };

    if(!place) {
        return (
            <View style={styles.fallback}>
                <Text>Loading place data...</Text>
            </View>
        )
    }

    return (
        <ScrollView>
            <Image style={styles.image} source={{ uri: place.imageUri}} />
            <View style={styles.locationContainer}>
                <View style={styles.addressContainer}>
                    <Text style={styles.address}>{JSON.stringify(place?.address)}</Text>
                </View>
                <OutlinedButton icon="map" onPress={showOnMapHandler} >View on Map</OutlinedButton>
            </View>
        </ScrollView>
    )
}

export default PlaceDetails;

const styles = StyleSheet.create({
    fallback: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
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
import { FlatList, View, Text, StyleSheet } from "react-native";
import PlaceItem from "./PlaceItem";


function PlacesLIst({places}) {
    if(!places || places.length === 0) {
        return (
            <View style={StyleSheet.fallbackContainer}>
                <Text style={StyleSheet.fallbackText}>
                    No places added yet - start adding some!
                </Text>
            </View>
        )
    }

    return (
        <FlatList 
        data={places} 
        keyExtractor={(item) => item.id} 
        renderItem={({item}) => <PlaceItem place={item} />}
        />
    )
}

export default PlacesLIst;

const style = StyleSheet.create({
    fallbackContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    fallbackText: {
        fontSize: 16,
    }
})
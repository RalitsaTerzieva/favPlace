import { useCallback, useState } from 'react';
import { View, Text, ScrollView, TextInput, StyleSheet } from 'react-native';
import { Colors } from './../../constants/colors';
import ImagePicker from './ImagePicker';
import LocationPicker from './LocationPicker';
import Button from './../UI/Button';
import { Place } from './../../models/place';

function PlaceForm({ onCreatePlace }) {
    const [enteredText, setEnteredText ] = useState('');
    const [pickedLocation, setPickedLocation] = useState();
    const [pickedImage, setPickedImage] = useState();

    function changeTitleHandler(enteredText) {
        setEnteredText(enteredText);
    }
    function ImageTakenHandler(imageUri) {
        setPickedImage(imageUri);
    }

    const LocationTakenHandler = useCallback((location) => {
        setPickedLocation(location);
    })

    function savePlaceHandler() {
        const placeData = new Place(enteredText, pickedImage, pickedLocation);

        onCreatePlace(placeData);
    }

    return (
        <ScrollView style={styles.form}>
            <View>
                <Text style={styles.label}>
                    Title
                </Text>
                <TextInput style={styles.input} onChangeText={changeTitleHandler} value={enteredText}/>
            </View>
            <ImagePicker onImageTaken={ImageTakenHandler} />
            <LocationPicker onLocationPick={LocationTakenHandler} />
            <Button onPress={savePlaceHandler} >Add place</Button>
        </ScrollView>
    )
}

export default PlaceForm;

const styles = StyleSheet.create({
    form: {
        flex: 1,
        padding: 24
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 4,
        color: Colors.primary500
    },
    input: {
        marginVertical: 8,
        paddingHorizontal: 4,
        paddingVertical: 8,
        fontSize: 16,
        borderBottomColor: Colors.primary700,
        borderBottomWidth: 2,
        backgroundColor: Colors.primary100
    }
})
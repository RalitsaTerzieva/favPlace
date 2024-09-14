import { useEffect, useState } from 'react';
import { View, StyleSheet,  Alert, Text } from 'react-native';
import OutlinedButton from '../UI/OutlinedButton';
import { Colors } from './../../constants/colors';
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/native';
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus, } from 'expo-location';

function LocationPicker() {
    const [locationPermissionInformation, requestPermission] = useForegroundPermissions();
    const [pickedLocation, setPickedLocation] = useState();
    const isFocused = useIsFocused();
    const navigation = useNavigation();
    const route = useRoute();


    useEffect(() => {
        if(isFocused && route.params) {
            const mapPickedLocation = {lat: route.params.pickedLat, lng: route.params.pickedLng};
            setPickedLocation(mapPickedLocation);
        }
      
    }, [route, isFocused])

    async function verifyPermissions() {
        if(locationPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();

            return permissionResponse.granted;
        }

        if(locationPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert('Insufficient permissions! You need to grant a location permission to use this app.');

            return false;
        }

        return true;
    };

    async function getLocationHandler() {
        const hasPermission = await verifyPermissions();

        if(!hasPermission) {
            return;
        }

        const location = await getCurrentPositionAsync();
        setPickedLocation({
            lat: location.coords.latitude,
            lng: location.coords.longitude
        })
    }

    function pickOnMapHandler() {
        navigation.navigate('Map');
    }

    return (
        <View>
            <View style={styles.mapPreview}>
                {pickedLocation ? (
            <Text>Lat: {pickedLocation.lat}, Lng: {pickedLocation.lng}</Text>
            ) : (
            <Text>No location picked yet.</Text>
             )}
            </View>
            <View style={styles.actions}>
                <OutlinedButton icon="location" onPress={getLocationHandler}>Locate User</OutlinedButton>
                <OutlinedButton icon="map" onPress={pickOnMapHandler}>Pick on Map</OutlinedButton>
            </View>
        </View>
    )
}

export default LocationPicker;

const styles = StyleSheet.create({
    mapPreview: {
        marginVertical: 8,
        width: '100%',
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 4
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    }
})
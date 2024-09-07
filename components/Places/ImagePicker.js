import { View,  Alert, Image, StyleSheet, Text } from 'react-native';
import { useState } from 'react';
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from 'expo-image-picker';
import { Colors } from './../../constants/colors';
import OutlinedButton from '../UI/OutlinedButton';

function ImagePicker() {
    const [pickedImage, setPickedImage] = useState();
    const [cameraPermission, requestCameraPermissionStatus] = useCameraPermissions();

    async function verifyPermissions() {
        if(cameraPermission.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestCameraPermissionStatus();

            return permissionResponse.granted;
        }

        if(cameraPermission.status === PermissionStatus.DENIED) {
            Alert.alert('Insufficient permissions! You need to grant a camera permission to use this app.');

            return false;
        }

        return true;
    }

    async function takeImageHandler() {
        const hasPermission = await verifyPermissions();

        if(!hasPermission) {
            return;
        }

        
        const image = await launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5
        });
        console.log(image)
        setPickedImage(image);
    }
    
    let imagePreview = <Text>No Image taken yet.</Text>;

    if(pickedImage) {
        imagePreview = <Image style={styles.image} source={{ uri: pickedImage.uri}} />
    }

    return (
        <View>
            <View style={styles.imagePreview}>
                {imagePreview}
            </View>
            <OutlinedButton icon="camera" onPress={takeImageHandler}>Take Image</OutlinedButton>
        </View>
    )
}

export default ImagePicker;

const styles = StyleSheet.create({
    imagePreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 4
    },
    image: {
        width: '100%',
        height: '100%'
    }
})
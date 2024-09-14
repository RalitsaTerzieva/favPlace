import { View,  Alert, Image, StyleSheet, Text } from 'react-native';
import { useState } from 'react';
import { launchCameraAsync, useCameraPermissions, PermissionStatus, MediaTypeOptions } from 'expo-image-picker';
import { Colors } from './../../constants/colors';
import OutlinedButton from '../UI/OutlinedButton';

function ImagePicker({onImageTaken}) {
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

        
        const imagePickerResult = await launchCameraAsync({
            allowsEditing: true,
            mediaTypes: MediaTypeOptions.All,
            aspect: [4, 3],
            quality: 0.5
        });
        const image = imagePickerResult.assets[0]
        setPickedImage(image);
        onImageTaken(image.uri);
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
import { View, Button, Alert } from 'react-native';
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from 'expo-image-picker';

function ImagePicker() {
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
    }

    return (
        <View>
            <View>

            </View>
            <Button title="Take Image" onPress={takeImageHandler} />
        </View>
    )
}

export default ImagePicker;
import { View, Image, Text, Pressable, StyleSheet } from 'react-native';

function PlaceItem({place, onSelect}) {
    return (
    <Pressable onPress={onSelect}>
        <Image source={{ uri: imageUri }}/>
        <View>
            <Text>{place.title}</Text>
            <Text>{place.address}</Text>
        </View>
    </Pressable>
    )
}

export default PlaceItem;

const styles = StyleSheet.create({
    
})
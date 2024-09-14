import { useEffect, useState } from 'react';
import PlaceList from './../components/Places/PlacesLIst';
import { StyleSheet } from 'react-native';
import { Colors } from './../constants/colors';
import { useIsFocused } from '@react-navigation/native';

function AllPlaces({ route }) {
  const [loadedPlaces, setLoadedPlaces] = useState([]);
  const isFocused = useIsFocused();

    useEffect(() => {
      if(isFocused && route.params) {
        setLoadedPlaces(currPlaces => [...currPlaces, route.params.place]);
      }
    }, [isFocused, route])

    return <PlaceList style={styles.container} places={loadedPlaces} />
}

export default AllPlaces;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.gray700,
    },
  });
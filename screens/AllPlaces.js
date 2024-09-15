import { useEffect, useState } from 'react';
import PlaceList from './../components/Places/PlacesLIst';
import { StyleSheet } from 'react-native';
import { Colors } from './../constants/colors';
import { useIsFocused } from '@react-navigation/native';
import { useSQLiteContext } from 'expo-sqlite';


function AllPlaces({ route }) {
  const db = useSQLiteContext();
  const places = db.getAllSync('SELECT * FROM places ORDER BY id');

  const [loadedPlaces, setLoadedPlaces] = useState(places);
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
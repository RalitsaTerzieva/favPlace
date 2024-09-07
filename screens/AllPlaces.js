import PlaceList from './../components/Places/PlacesLIst';
import { StyleSheet } from 'react-native';
import { Colors } from './../constants/colors';

function AllPlaces() {
    return <PlaceList style={styles.container} />
}

export default AllPlaces;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.gray700,
    },
  });
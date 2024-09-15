import PlaceForm from './../components/Places/PlaceForm';
import { useSQLiteContext } from 'expo-sqlite';

const PLACEHOLDER_IMG = 'data:image/png;base64,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';

function AddPlace({navigation}) {
    const db = useSQLiteContext();

    function insertPlace(placeData) {
        const { title, imageUri, address, location } = placeData;
      
        // Ensure we have the correct lat/lng values from the location object
        const lat = location.lat.lat;
        const lng = location.lng.lng;
        const insertStatement = db.prepareSync('INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?) RETURNING id');

      
        // Use a transaction to insert the data into the database
        db.withTransactionSync(() => {
            const result = insertStatement.executeSync(title, imageUri || PLACEHOLDER_IMG, JSON.stringify(address), lat, lng);

            console.log('lastInsertRowId:', result.lastInsertRowId);
            console.log('changes:', result.changes);
            for (const row of result) {
                console.log('id:', row.id);
            }
        });
      }

    function createPlaceHandler(placeData) {
        insertPlace(placeData);
        navigation.navigate('AllPlaces', {
            place: placeData
        });
    }

    return <PlaceForm onCreatePlace={createPlaceHandler} />
}

export default AddPlace;
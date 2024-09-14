import PlaceForm from './../components/Places/PlaceForm';

function AddPlace({navigation}) {
    function createPlaceHandler(placeData) {
        navigation.navigate('AllPlaces', {
            place: placeData
        });
    }

    return <PlaceForm onCreatePlace={createPlaceHandler} />
}

export default AddPlace;
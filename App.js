import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { NavigationContainer  } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AllPlaces from './screens/AllPlaces';
import AddPlace from './screens/AddPlace';
import PlaceDetails from './screens/PlaceDetails';
import Map from './screens/Map';
import IconButton from './components/UI/IconButton';
import { Colors } from './constants/colors';
import { SQLiteProvider } from 'expo-sqlite';

import { init } from './util/database';
import AppLoading from 'expo-app-loading';

const Stack = createNativeStackNavigator();

export default function App() {
  const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(() => {
    (async () => {
      await init();
      setDbInitialized(true);
    })();
  }, []);

  if(!dbInitialized) {
    <AppLoading />
  }

  return (
   <>
    <SQLiteProvider databaseName="places.db" onInit={init}>
      <StatusBar style='dark' />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle: { backgroundColor: Colors.primary500 },
          headerTintColor: Colors.gray700,
          contentStyle: { backgroundColor: Colors.gray700 }
        }}>
          <Stack.Screen name="AllPlaces" component={AllPlaces} options={({navigation}) => ({
            title: 'You Favorite Places',
            headerRight: ({tintColor}) => <IconButton icon="add" color={tintColor} size={24} onPress={() => navigation.navigate('AddPlace')}/>
          })}/>
          <Stack.Screen name="AddPlace" component={AddPlace} options={{
            title: 'Add a new Place'
          }}/>
            <Stack.Screen name="Map" component={Map} options={{
            title: 'Map'
          }}/>
           <Stack.Screen name="PlaceDetails" component={PlaceDetails} options={{
            title: 'Place Details'
          }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </SQLiteProvider>
   </>
  );
}


import React, { useEffect, useState } from 'react';
import { View, Text, Alert, Button, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import { showMessage } from 'react-native-flash-message';
import { PERMISSIONS, request, RESULTS } from 'react-native-permissions';

const api_key = 'AIzaSyBqnaTZHOfI539sJlwuXY5uDsoJP_DPI4I'; // Thay thế bằng API Key của bạn
Geocoder.init(api_key, { language: 'vi' });

const CheckInOutMap = ({ onSaveLocation }) => {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(true);

  const requestLocationPermission = async () => {
    const result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    if (result === RESULTS.GRANTED) {
      console.log('Location permission granted');
    } else {
      console.log('Location permission denied');
    }
  };

  useEffect(() => {
    requestLocationPermission();
    const getCurrentPosition = async () => {
      Geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition({ latitude, longitude });
          getAddressFromCoords(latitude, longitude);
        },
        error => {
          Alert.alert('Error', `Unable to fetch location: ${error.message}`);
          setLoading(false);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 1000 }
      );
    };

    getCurrentPosition();
  }, []);

  const getAddressFromCoords = (lat, lng) => {
    Geocoder.from(lat, lng)
      .then(json => {
        const addressComponent = json.results[0].formatted_address;
        setAddress(addressComponent);
        setLoading(false);
      })
      .catch(error => {
        console.warn(error);
        setLoading(false);
      });
  };

  const handleSaveLocation = () => {
    if (currentPosition) {
      showMessage({
        message: 'Success',
        description: 'CheckIn thành công',
        type: 'success',
      });
      onSaveLocation({
        coords: currentPosition,
        address,
      });
    } else {
      showMessage({
        message: 'Error',
        description: 'Không lấy được vị trí',
        type: 'danger',
      });
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {currentPosition ? (
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            ...currentPosition,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker coordinate={currentPosition} />
        </MapView>
      ) : (
        <Text>Loading....</Text>
      )}
      <Text>Address: {address}</Text>
      <Button title="Save Location" onPress={handleSaveLocation} />
    </View>
  );
};

export default CheckInOutMap;

import {PermissionsAndroid, SafeAreaView, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button} from 'react-native-paper';
import Geolocation from 'react-native-geolocation-service';
import AppHeader from '../../../components/navigators/AppHeader';
import axios from 'axios';

const CheckInWFHScreen = () => {
  const [location, setLocation] = useState();
  const [dateTime, setDatetime] = useState<Date>();
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Quyền truy cập vị trí',
          message: 'Bạn cần cấp quyền truy cập vị trí cho ứng dụng',
          buttonNeutral: 'Để sau',
          buttonNegative: 'Hủy',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      } else {
        console.log('Vị trí chưa cho phép quyền truy cập.');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  useEffect(() => {
    requestCameraPermission();
  }, []);

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        console.log(position.coords.latitude);
        const response = axios.get(
          `https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`,
        );
        console.log(response);
        setDatetime(new Date());
      },
      error => {
        // Xử lý lỗi
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  return (
    <SafeAreaView className="bg-white flex-1">
      <AppHeader title="Chấm công WFH" showButtonBack={true}></AppHeader>
      <View className="flex-1 mt-5">
        <View className="px-2">
          <Button onPress={getLocation} className="bg-primary">
            <Text className="text-white font-bold">Check in</Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CheckInWFHScreen;

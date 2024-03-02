import {
  Alert,
  PermissionsAndroid,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button} from 'react-native-paper';
import Geolocation from 'react-native-geolocation-service';
import AppHeader from '../../../components/navigators/AppHeader';
import axios from 'axios';
import {formatDateTime} from '../../../../utils/CommonFunction';

const CheckInWFHScreen = () => {
  const [location, setLocation] = useState<String>();
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
      }
    } catch (err) {
      console.warn(err);
    }
  };
  useEffect(() => {
    requestCameraPermission();
  }, []);

  const getLocation = async () => {
    setLocation('Đang lấy vị trí...');
    Geolocation.getCurrentPosition(
      position => {
        const response = axios.get(
          `https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`,
        );
        response
          .then(res => {
            setLocation(res.data.display_name);
          })
          .catch(err => {
            setLocation('');
            Alert.alert('Đã xảy ra lỗi khi lấy ra vị trí.');
          });
        setDatetime(new Date());
      },
      error => {
        // Xử lý lỗi
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
          <Text>Vị trí: {location}</Text>
          <Text>Ngày giờ: {formatDateTime(dateTime)}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CheckInWFHScreen;

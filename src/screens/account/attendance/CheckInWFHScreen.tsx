import {
  Alert,
  PermissionsAndroid,
  SafeAreaView,
  Text,
  View,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button} from 'react-native-paper';
import Geolocation from 'react-native-geolocation-service';
import AppHeader from '../../../components/navigators/AppHeader';
import moment from 'moment';

const CheckInWFHScreen = () => {
  const [location, setLocation] = useState<String>();
  const [dateTime, setDatetime] = useState<Date>();

  const requestCameraPermission = async () => {
    try {
      if (Platform.OS === 'ios') {
        Geolocation.requestAuthorization('always');
      } else {
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
        setDatetime(new Date());

        fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`,
        )
          .then(response => response.json())
          .then(data => {
            setLocation(data.display_name);
          })
          .catch(error => {
            setLocation('');
            Alert.alert('Đã xảy ra lỗi khi lấy ra vị trí: ' + error.message);
          });
      },
      error => {
        setLocation('');
        Alert.alert('Đã xảy ra lỗi khi lấy ra vị trí: ' + error.message);
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
          {location && (
            <View>
              <Text className="py-2 text-base">
                <Text className="font-bold">Vị trí:</Text> {location}
              </Text>
              <Text className="py-2 text-base">
                <Text className="font-bold">Thời gian:</Text>
                {moment(dateTime).format('HH:mm DD/MM/yyyy')}
              </Text>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CheckInWFHScreen;

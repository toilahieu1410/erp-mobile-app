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
import axios from 'axios';
import moment from 'moment';


const CheckInWFHScreen = () => {
  const [location, setLocation] = useState<String>();
  const [errorrrr,seterror] = useState();

  const [dateTime, setDatetime] = useState<Date>();


  const requestCameraPermission = async () => {

    try {

      if (Platform.OS === 'ios') {
        Geolocation.requestAuthorization('always');
      }else{
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
        const response = axios.get(
          `https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`,
        );
        response
          .then(res => {
            setLocation(res.data.display_name);
          })
          .catch(err => {
            seterror(err);
            setLocation('');
            console.log(err);
            Alert.alert('Đã xảy ra lỗi khi lấy ra vị trí: '+err.message);
          });
        setDatetime(new Date());
      },
      error => {
        setLocation('');
        console.log(error)
        seterror(error)
        Alert.alert('Đã xảy ra lỗi khi lấy ra vị trí: '+error.message);
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
          <Text>Ngày giờ: {moment(dateTime).format('DD/MM/YYYY')}</Text>
          <Text>Ngày giờ: {JSON.stringify(errorrrr)}</Text>

        </View>
      </View>
    </SafeAreaView>
  );
};

export default CheckInWFHScreen;

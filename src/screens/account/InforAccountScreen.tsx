import {
  Dimensions,
  PermissionsAndroid,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Avatar, TouchableRipple} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {ScrollView} from 'react-native-gesture-handler';
import AppHeader from '../../components/navigators/AppHeader';
import {COLORS} from '../../../constants/colors';
import InforAccountComponent from '../../components/account/InforAccountComponent';
import {launchImageLibrary} from 'react-native-image-picker';
import SelectPhoto from '../../components/app/FileManager/SelectPhoto';

const InforAccountScreen = () => {
  const [selectedImage, setSelectedImage] = useState(
    'https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/Sunset-900x600.jpeg',
  );

  const navigator = useNavigation();

  // useEffect(() => {
  //   return navigator.getParent()?.setOptions({
  //     tabBarStyle: {
  //       display: 'none',
  //     },
  //   });
  // }, [navigator]);

  return (
    <>
      <SafeAreaView className="flex-1 w-full bg-white">
        <AppHeader title="Thông tin" showButtonBack={true}></AppHeader>
        <LinearGradient
          colors={['#e2fcfc', '#88e3f2', '#e2fcfc', '#ffffff']}
          start={{x: 0.0, y: 0.25}}
          end={{x: 1, y: 1.0}}
          className="flex-1">
          <View className="w-full flex flex-col justify-center items-center my-2">
            <View className="relative">
              <Avatar.Image
                style={{backgroundColor: 'gray'}}
                size={Dimensions.get('screen').width * 0.3}
                source={{uri: selectedImage}}></Avatar.Image>
              <View className="absolute p-0 bottom-3 right-0">
                <SelectPhoto
                  onSelect={value => {
                    setSelectedImage(value.uri);
                  }}>
                  <Avatar.Icon
                    size={(Dimensions.get('screen').width * 0.3) / 4.5}
                    icon="plus-circle-outline"
                    color={COLORS.WHITE}
                    style={{
                      backgroundColor: '#027BE3', // Customize background color using theme
                    }}
                  />
                </SelectPhoto>
              </View>
            </View>
          </View>
          <ScrollView>
            <View
              className="m-4 bg-white rounded-2xl overflow-hidden"
              style={{elevation: 5}}>
              <InforAccountComponent title="Mã nhân viên" value="Duclv" />
              <InforAccountComponent title="Họ và tên" value="Lâm Văn Đức" />
              <InforAccountComponent title="Email" value="Duclv@gmail.com" />
              <InforAccountComponent title="Outlook" value="Duclv@gmail.com" />
              <InforAccountComponent title="Giới tính" value="Nam" />
              <InforAccountComponent
                title="Địa chỉ"
                value="Minh Quang - Tam Đảo - Vĩnh Phúc"
              />
              <InforAccountComponent title="Số điện thoại" value="0975892104" />
              <InforAccountComponent
                title="Số điện thoại tại công ty"
                value="0983253210"
              />
              <InforAccountComponent title="Phòng ban" value="IT phần mềm" />
              <InforAccountComponent title="Chức vụ" value="Nhân viên" />
              <InforAccountComponent
                title="Văn phòng làm việc"
                value="87 Lĩnh Nam"
              />
            </View>
          </ScrollView>
        </LinearGradient>
      </SafeAreaView>
    </>
  );
};

export default InforAccountScreen;

const styles = StyleSheet.create({});

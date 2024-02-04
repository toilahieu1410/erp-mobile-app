import {Image, SafeAreaView, Text, View} from 'react-native';
import React from 'react';
import AppHeader from '../../components/navigators/AppHeader';
import {Avatar} from 'react-native-paper';
import NotificationComponent from '../../components/notification/NotificationComponent';
import {SCREENS} from '../../../constants/screens';

const NotificationScreen = () => {
  return (
    <>
      <SafeAreaView className="flex-1 bg-white">
        <AppHeader title="Thông báo" centerTitle={true}></AppHeader>
        <View className="flex-1">
          <NotificationComponent
            avatar="https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/Sunset-900x600.jpeg"
            date="03/02/2024"
            fullname="Lâm Văn Đức"
            redirect={SCREENS.PAYROLL.KEY}
            title="đã cập nhật bảng lương tháng 02 năm 2024"
            username="duclv"
          />
          <View className="px-2 py-4 flex flex-nowrap flex-row">
            <View>
              <Image
                source={{
                  uri: 'https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/Sunset-900x600.jpeg',
                }}
                style={{
                  height: 60,
                  width: 60,
                  resizeMode: 'cover',
                  borderRadius: 9999,
                }}
              />
            </View>
            <View className="pl-2 flex-1 flex-col flex-nowrap justify-between items-start">
              <View className="mb-2">
                <Text numberOfLines={3} className="text-black text-sm">
                  <Text className="font-bold">Lâm Văn Đức</Text> đã cập nhật
                  bảng lương tháng 2 năm 2024 test test test test test test test
                  test test test test test test test test test test test testx
                  test test test test test
                </Text>
              </View>
              <View>
                <Text className="text-gray-500">2 ngày trước</Text>
              </View>
            </View>
          </View>

          <View className="px-2 py-4 flex flex-nowrap flex-row">
            <View>
              <Image
                source={{
                  uri: 'https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/Sunset-900x600.jpeg',
                }}
                style={{
                  height: 60,
                  width: 60,
                  resizeMode: 'cover',
                  borderRadius: 9999,
                }}
              />
            </View>
            <View className="pl-2 flex-1 flex-col flex-nowrap justify-between items-start">
              <View className="mb-2">
                <Text numberOfLines={3} className="text-black text-sm">
                  <Text className="font-bold">Lâm Văn Đức</Text> đã cập nhật
                  bảng lương tháng 2 năm 2024 test test test test test test test
                  test test test test test test test test test test test test
                  test test test test test
                </Text>
              </View>
              <View>
                <Text className="text-gray-500">2 ngày trước</Text>
              </View>
            </View>
          </View>

          <View className="px-2 py-4 flex flex-nowrap flex-row">
            <View>
              <Image
                source={{
                  uri: 'https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/Sunset-900x600.jpeg',
                }}
                style={{
                  height: 60,
                  width: 60,
                  resizeMode: 'cover',
                  borderRadius: 9999,
                }}
              />
            </View>
            <View className="pl-2 flex-1 flex-col flex-nowrap justify-between items-start">
              <View className="mb-2">
                <Text numberOfLines={3} className="text-black text-sm">
                  <Text className="font-bold">Lâm Văn Đức</Text> đã cập nhật
                  bảng lương tháng 2 năm 2024
                </Text>
              </View>
              <View>
                <Text className="text-gray-500">2 ngày trước</Text>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default NotificationScreen;

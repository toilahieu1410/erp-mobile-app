import {Dimensions, SafeAreaView, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Appbar, Avatar, Icon, TouchableRipple} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../store/store';
import {logout} from '../../slice/Auth';
import {BaseResponse} from '../../models/BaseResponse';
import {showMessage} from 'react-native-flash-message';
import {SCREENS} from '../../../constans/screens';
import AppHeader from '../../components/navigators/AppHeader';

const AccountScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  interface item {
    icon?: String;
    title: String;
    type: String;
    onClick?: Function;
  }
  const ListItem: item[] = [
    {
      icon: 'information',
      title: SCREENS.INFORACCOUNT.NAME,
      type: 'menu',
      onClick: () => {
        //@ts-ignore
        navigation.navigate(SCREENS.INFORACCOUNT.KEY);
      },
    },
    {
      icon: 'account-group',
      title: 'Nhóm của tôi',
      type: 'menu',
      onClick: () => {
        // Alert.alert('Nhóm của tôi');
      },
    },
    {
      title: 'Cài đặt tài khoản',
      type: 'text',
    },

    {
      icon: 'shield-account',
      title: SCREENS.CHANGEPASSWORD.NAME,
      type: 'menu',
      onClick: () => {
        //@ts-ignore
        navigation.navigate(SCREENS.CHANGEPASSWORD.KEY);
      },
    },
    {
      icon: 'exit-to-app',
      title: 'Đăng xuất',
      type: 'menu',
      onClick: () => {
        //@ts-ignore
        dispatch(logout())
          .unwrap()
          //@ts-ignore
          .then(res => {})
          .catch((err: BaseResponse) => {
            showMessage({
              message: 'Đăng xuất thất bại !',
              description: err.message,
              duration: 5000,
              type: 'danger',
            });
          });
      },
    },
  ];
  return (
    <>
      <SafeAreaView className="flex-1 w-full">
        <AppHeader title="Tài khoản" centerTitle={true}></AppHeader>
        <View className="flex-1"></View>
        <View className="h-full">
          <View className="h-[25%] w-full flex flex-col justify-center items-center my-3">
            <View className="p-2">
              <Avatar.Image
                style={{backgroundColor: 'gray'}}
                size={Dimensions.get('screen').width * 0.3}
                source={{
                  uri: 'https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/Sunset-900x600.jpeg',
                }}></Avatar.Image>
            </View>
            <View>
              <Text className="text-center text-xl font-bold">Lâm Văn Đức</Text>
              <Text className="text-center text-base">Ducvl@hoplong.com</Text>
            </View>
          </View>
          <View className="h-full">
            {ListItem.map((item, index) => {
              return item.type === 'menu' ? (
                <TouchableRipple
                  key={index}
                  onPress={() => {
                    //@ts-ignore
                    item.onClick();
                  }}>
                  <View className="flex flex-row items-center justify-between w-full px-5 my-2 py-1">
                    <View className="flex flex-row items-center">
                      <Icon size={30} color="#027BE3" source={item.icon}></Icon>
                      <Text className="text-base px-3 font-semibold">
                        {item.title}
                      </Text>
                    </View>
                    <View>
                      <Icon
                        size={30}
                        color="#027BE3"
                        source="chevron-right"></Icon>
                    </View>
                  </View>
                </TouchableRipple>
              ) : (
                <Text
                  key={index}
                  className="font-bold text-[18px] px-6 py-2 border-t-2 border-t-gray-300 pt-4">
                  {item.title}
                </Text>
              );
            })}
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default AccountScreen;

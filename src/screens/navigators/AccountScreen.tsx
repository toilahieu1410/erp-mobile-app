import {Dimensions, Image, SafeAreaView, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Avatar, Icon, TouchableRipple} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../slice/Auth';
import {BaseResponse} from '../../models/BaseResponse';
import {showMessage} from 'react-native-flash-message';
import {SCREENS} from '../../../constants/screens';
import AppHeader from '../../components/navigators/AppHeader';
import {IMAGES} from '../../../constants/images';
import {COLORS} from '../../../constants/colors';

const AccountScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  interface item {
    icon?: React.ReactElement;
    title: String;
    type: String;
    onClick?: Function;
  }
  const ListItem: item[] = [
    {
      icon: <Icon size={30} color="#027BE3" source={'information'}></Icon>,
      title: SCREENS.INFORACCOUNT.NAME,
      type: 'menu',
      onClick: () => {
        //@ts-ignore
        navigation.navigate(SCREENS.INFORACCOUNT.KEY);
      },
    },

    // {
    //   icon: (
    //     <Image
    //       source={IMAGES.CLOCKCHECK}
    //       style={{width: 30, height: 30, tintColor: COLORS.PRIMARY}}></Image>
    //   ),
    //   title: SCREENS.ATTENDANCE.NAME,
    //   type: 'menu',
    //   onClick: () => {
    //     //@ts-ignore
    //     navigation.navigate(SCREENS.ATTENDANCE.KEY);
    //   },
    // },
    {
      icon: (
        <Image
          source={IMAGES.DOLLAR}
          style={{width: 30, height: 30, tintColor: COLORS.PRIMARY}}></Image>
      ),
      title: SCREENS.PAYROLL.NAME,
      type: 'menu',
      onClick: () => {
        //@ts-ignore
        navigation.navigate(SCREENS.PAYROLL.KEY);
      },
    },
    {
      icon: <Icon size={30} color="#027BE3" source={'account-group'}></Icon>,
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
      icon: <Icon size={30} color="#027BE3" source={'shield-account'}></Icon>,
      title: SCREENS.CHANGEPASSWORD.NAME,
      type: 'menu',
      onClick: () => {
        //@ts-ignore
        navigation.navigate(SCREENS.CHANGEPASSWORD.KEY);
      },
    },
    {
      icon: <Icon size={30} color="#027BE3" source={'exit-to-app'}></Icon>,
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
      <SafeAreaView className="flex-1 w-full bg-white">
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
              <Text className="text-center text-xl font-bold text-black">
                Lâm Văn Đức
              </Text>
              <Text className="text-center text-base text-black">
                Ducvl@hoplong.com
              </Text>
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
                      {item.icon}
                      <Text className="text-base px-3 font-semibold text-black">
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

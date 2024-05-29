import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';

import {Avatar, TouchableRipple} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../slice/Auth';
import {BaseResponse} from '../../models/BaseResponse';
import {showMessage} from 'react-native-flash-message';
import {SCREENS} from '../../constants/screens';
import AppHeader from '../../components/navigators/AppHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {styles} from '../../assets/css/AccountScreen/style';
import AuthenticateService from '../../services/Auth';

interface Item {
  icon?: React.ReactElement;
  title: String;
  type: 'menu' | 'text';
  onClick?: () => void;
}

const AccountScreen = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();

  const [userName, setUserName] = useState(null)
  const [hovaten, setHovaten] = useState(null)
  const [email, setEmail] = useState(null)

  const ListItem: Item[] = [
    {
      icon: <Icon size={25} color="#027BE3" name="person-outline" />,
      title: SCREENS.INFORACCOUNT.NAME,
      type: 'menu',
      onClick: () => {
        navigation?.navigate(SCREENS.INFORACCOUNT.KEY);
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
      icon: <Icon size={25} color="#027BE3" name="logo-usd" />,

      title: SCREENS.PAYROLL.NAME,
      type: 'menu',
      onClick: () => {
        navigation?.navigate(SCREENS.PAYROLL.KEY);
      },
    },
    {
      icon: <Icon size={25} color="#027BE3" name="people-sharp" />,
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
      icon: <Icon size={25} color="#027BE3" name="shield-half-sharp" />,
      title: SCREENS.CHANGEPASSWORD.NAME,
      type: 'menu',
      onClick: () => {
        navigation?.navigate(SCREENS.CHANGEPASSWORD.KEY);
      },
    },
    {
      icon: <Icon size={25} color="#027BE3" name="enter-outline" />,
      title: 'Đăng xuất',
      type: 'menu',
      onClick: () => {
        //@ts-ignore
        dispatch(logout()).unwrap()
          .then(() => {
            showMessage({
              message: 'Đăng xuất thành công!',
              type: 'info',
            });
            navigation.replace(SCREENS.LOGIN.KEY)
          })
          .catch((err: BaseResponse) => {
            showMessage({
              message: 'Đăng xuất thất bại !',
              description: err.error.message,
              duration: 5000,
              type: 'danger',
            });
          });
      },
    },
    {
      title: 'Tác vụ',
      type: 'text',
    },
    {
      icon: <Icon size={25} color="#027BE3" name="reader-outline" />,
      title: SCREENS.LIST_DON_XAC_NHAN.NAME,
      type: 'menu',
      onClick: () => {
        navigation?.navigate(SCREENS.LIST_DON_XAC_NHAN.KEY);
      },
    },
    {
      icon: <Icon size={25} color={'#027BE3'} name="file-tray-full-outline" />,
      title: SCREENS.XIN_NGHI_PHEP.NAME,
      type: 'menu',
      onClick: () => {
        navigation?.navigate(SCREENS.XIN_NGHI_PHEP.KEY);
      },
    },

    {
      icon: <Icon size={25} color={'#027BE3'} name="file-tray-full-outline" />,
      title: SCREENS.WORK_FROM_HOME.NAME,
      type: 'menu',
      onClick: () => {
        navigation?.navigate(SCREENS.WORK_FROM_HOME.KEY);
      },
    },

    {
      icon: <Icon size={25} color={'#027BE3'} name="file-tray-full-outline" />,
      title: SCREENS.OFFERPAYMENTS.NAME,
      type: 'menu',
      onClick: () => {
        navigation?.navigate(SCREENS.OFFERPAYMENTS.KEY);
      },
    },
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('token')
        if(token) {
          const response = await AuthenticateService.GetUser()
          const user = response.value
          console.log(user,'uuuu')
          setUserName(user.userName)
          setHovaten(user.hoTen)
          setEmail(user.email)
        }
      } catch (error) {
        console.error('Error', error)
      }
    }
    fetchUserData()
  }, [])
  return (
    <>
      <SafeAreaView className="flex-1 w-full ">
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
                {hovaten}
              </Text>
              <Text className="text-center text-base text-black">
                {email}
              </Text>
            </View>
          </View>
          <ScrollView>
            <View className="bg-white flex" style={styles.height}>
              {ListItem.map((item, index) => {
                return item.type === 'menu' ? (
                  <TouchableRipple key={index} onPress={item.onClick}>
                    <View className="flex flex-row items-center justify-between w-full px-5 my-2 py-1">
                      <View className="flex flex-row items-center">
                        {item.icon}
                        <Text className="text-base px-3 font-semibold text-black">
                          {item.title}
                        </Text>
                      </View>
                      <View>
                        <Icon
                          size={20}
                          color="#027BE3"
                          name="chevron-forward-outline"
                        />
                      </View>
                    </View>
                  </TouchableRipple>
                ) : (
                  <Text
                    key={index}
                    className="font-bold text-[18px] px-6 py-2 border-t-2 border-t-gray-200 pt-4">
                    {item.title}
                  </Text>
                );
              })}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};

export default AccountScreen;

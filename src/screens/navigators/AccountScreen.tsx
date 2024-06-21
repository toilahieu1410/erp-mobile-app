import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
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
import { moderateScale } from '../size';

interface Item {
  icon?: React.ReactElement;
  title: String;
  type: 'menu' | 'text';
  onClick?: () => void;
}

const AccountScreen = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();

  const [userName, setUserName] = useState(null);
  const [hovaten, setHovaten] = useState(null);
  const [email, setEmail] = useState(null);

  const [selectedImage, setSelectedImage] = useState(
    'https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/Sunset-900x600.jpeg',
  );

  const ListItem: Item[] = [


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
      icon: <Icon size={moderateScale(20)} color="#fff" name="logo-usd" style={{backgroundColor:'#00b894', padding: moderateScale(5), borderRadius: moderateScale(5)}} />,

      title: SCREENS.PAYROLL.NAME,
      type: 'menu',
      onClick: () => {
        navigation?.navigate(SCREENS.PAYROLL.KEY);
      },
    },
    {
      icon: <Icon size={moderateScale(20)} color="#fff" name="people-outline" style={{backgroundColor:'#feca57', padding: moderateScale(5), borderRadius: moderateScale(5)}} />,
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
      icon: <Icon size={moderateScale(20)} color="#fff" name="key-outline" style={{backgroundColor:'#ff6b6b', padding: moderateScale(5), borderRadius: moderateScale(5)}} />,
      title: SCREENS.CHANGEPASSWORD.NAME,
      type: 'menu',
      onClick: () => {
        navigation?.navigate(SCREENS.CHANGEPASSWORD.KEY);
      },
    },
    {
      icon: <Icon size={moderateScale(20)} color="#fff" name="enter-outline" style={{backgroundColor:'#576574', padding: moderateScale(5), borderRadius: moderateScale(5)}}/>,
      title: 'Đăng xuất',
      type: 'menu',
      onClick: () => {
        //@ts-ignore
        dispatch(logout())
         //@ts-ignore
          .unwrap()
          .then(() => {
            showMessage({
              message: 'Đăng xuất thành công!',
              type: 'info',
            });
            navigation.replace(SCREENS.LOGIN.KEY);
          })
          .catch((err: BaseResponse) => {
            if (err.error && err.error.code === 'LOGOUT_ERROR') {
              navigation.replace(SCREENS.LOGIN.KEY);
            } else {
              showMessage({
                message: 'Đăng xuất thất bại !',
                description: err.error.message,
                duration: 5000,
                type: 'danger',
              });
            }
          });
      },
    },
    {
      title: 'Tác vụ',
      type: 'text',
    },
    {
      icon: <Icon size={moderateScale(20)} color="#fff" name="reader-outline" style={{backgroundColor:'#2e86de', padding: moderateScale(5), borderRadius: moderateScale(5)}}/>,
      title: SCREENS.LIST_DON_XAC_NHAN.NAME,
      type: 'menu',
      onClick: () => {
        navigation?.navigate(SCREENS.LIST_DON_XAC_NHAN.KEY);
      },
    },
    {
      icon: <Icon size={moderateScale(20)} color="#fff" name="reader-outline" style={{backgroundColor:'#D6A2E8', padding: moderateScale(5), borderRadius: moderateScale(5)}}/>,
      title: SCREENS.LIST_DON_NGHI_PHEP.NAME,
      type: 'menu',
      onClick: () => {
        navigation?.navigate(SCREENS.LIST_DON_NGHI_PHEP.KEY);
      },
    },

    {
      icon: <Icon size={moderateScale(20)} color="#fff" name="reader-outline" style={{backgroundColor:'#F97F51', padding: moderateScale(5), borderRadius: moderateScale(5)}}/> ,
      title: SCREENS.LIST_WORK_FROM_HOME.NAME,
      type: 'menu',
      onClick: () => {
        navigation?.navigate(SCREENS.LIST_WORK_FROM_HOME.KEY);
      },
    },

    {
      icon: <Icon size={moderateScale(20)} color="#fff" name="reader-outline" style={{backgroundColor:'#CAD3C8', padding: moderateScale(5), borderRadius: moderateScale(5)}}/> ,
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
        const token = await AsyncStorage.getItem('accessToken');
        console.log(token, 'token đc lưu trữ');
        if (token) {
          const response = await AuthenticateService.GetUser();
          const user = response.value;
         
          setUserName(user.userName);
          setHovaten(user.hoTen);
          setEmail(user.email);
          setSelectedImage(user.avatar)
        }
      } catch (error) {
        console.error('Không lấy đc dữ liệu', error);
      }
    };
    fetchUserData();
  }, []);

  return (
    <>
      <SafeAreaView className="flex-1 w-full ">
        <AppHeader
          title="Tài khoản"
          centerTitle={true}
          backgroundColor="#2179A9" // Màu nền tùy chỉnh
          titleColor="#fff" // Màu chữ tùy chỉnh
        />
        <View className="h-full flex-1">
          <View style={styles.boxInfo}>
            <View style={styles.boxUser}>
              <View style={styles.flexCenter}>
                <View style={styles.borderAvatar}>
                  <Avatar.Image
                    style={styles.imageAvatar}
                    size={Dimensions.get('screen').width * 0.15}
                    source={{uri: selectedImage}}
                    >

                    </Avatar.Image>
                </View>

                <View style={styles.textRight}>
                  <Text className="text-xl font-bold text-black">
                    {hovaten}
                  </Text>
                  <Text className="text-sm text-gray">{email}</Text>
                </View>
              </View>
              <View style={styles.button}>
                <TouchableOpacity
                  style={styles.buttonClick}
                  onPress={() => navigation?.navigate(SCREENS.INFOACCOUNT.KEY)}>
                  <Text style={styles.textWhite}>Thông tin cá nhân</Text>
                </TouchableOpacity>
              </View>
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
                    style={{color: '#2179A9'}}
                    className="font-bold text-[16px] px-6 py-2 border-t-2 border-t-gray-200 pt-4">
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

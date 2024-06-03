import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Avatar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {ScrollView} from 'react-native-gesture-handler';
import AppHeader from '../../components/navigators/AppHeader';
import {COLORS} from '../../constants/screens';
import InfoAccountComponent from '../../components/account/InfoAccountComponent';
import SelectPhoto from '../../components/app/FileManager/SelectPhoto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthenticateService from '../../services/Auth';
import {styles} from '../../assets/css/AccountScreen/style';
import {ICON_INFO_ACCOUNT} from '../../constants/screens';
import moment from 'moment';
import Svg, {Path} from 'react-native-svg';
import {moderateScale} from '../size';


const InfoAccountScreen = () => {
  const navigator = useNavigation();

  const [selectedImage, setSelectedImage] = useState(
    'https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/Sunset-900x600.jpeg',
  );

  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState(1);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        if (token) {
          const response = await AuthenticateService.GetUser();
          const user = response.value;
          setUserInfo(user);
          if(user.avatar) {
            setSelectedImage(user.avatar)
          }
        }
       
      } catch (error) {
        console.error('Không lấy được dữ liệu', error);
      }
      //  finally {
      //   setLoading(false)
      // }
    };
    fetchUserData();
  }, []);

  // const handleImageSelect = async (image) => {
  //   setSelectedImage(image.uri)
  //   try {
  //     const token = await AsyncStorage.getItem('accessToken')
  //     if(token) {
  //       const response = await AuthenticateService.
  //     }
  //   }
  // }

  const renderTabContent = () => {
    if (!userInfo) return null;
    switch (selectedTab) {
      case 1:
        return (
          <View>
            <InfoAccountComponent
              title={'Họ tên'}
              value={userInfo?.hoTen}
              icon="person-outline"
              color="#3498db"
            />
            <InfoAccountComponent
              title={'Ngày sinh'}
              value={moment(userInfo?.ngaySinh).format('DD/MM/YYYY')}
              icon="calendar-clear-outline"
              color="#009432"
            />
            <InfoAccountComponent
              title={'Giới tính'}
              value={userInfo?.gioiTinh === 1 ? 'Nam' : 'Nữ'}
              icon="male-female"
              color="#e67e22"
            />
            <InfoAccountComponent
              title={'Email'}
              value={userInfo?.email}
              icon="mail-outline"
              color="#7f8c8d"
            />
          </View>
        );
      case 2:
        return (
          <View>
            <InfoAccountComponent
              title={'Số điện thoại'}
              value={userInfo.maPhongBan}
              icon="person-sharp"
              color="#3498db"
            />
            <InfoAccountComponent
              title={'Chức vụ'}
              value={userInfo.chucVu}
              icon="calendar-clear-sharp"
              color="#009432"
            />
          </View>
        );
      case 3:
        return (
          <View>
            <InfoAccountComponent
              title={'Mã phòng ban'}
              value={userInfo.maPhongBan}
              icon="briefcase-outline"
              color="#3498db"
            />
            <InfoAccountComponent
              title={'Chức vụ'}
              value={userInfo.chucVu}
              icon="podium-outline"
              color="#009432"
            />
            <InfoAccountComponent
              title={'Ngày thử việc'}
              value={moment(userInfo.ngayThuViec).format('DD/MM/YYYY')}
              icon="card-outline"
              color="#e74c3c"
            />
            <InfoAccountComponent
              title={'Ngày làm chính thức'}
              value={moment(userInfo.ngayLamChinhThuc).format('DD/MM/YYYY')}
              icon="card-outline"
              color="#e74c3c"
            />
          </View>
        );
      default:
        return null;
    }
  };

  // if (loading) {
  //   return (
  //     <View style={styles.loadingContainer}>
  //       <ActivityIndicator size="large" color="#0000ff" />
  //     </View>
  //   );
  // }

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
        <AppHeader title="Thông tin cá nhân" showButtonBack={true} />
        <LinearGradient
          colors={['#eaf5fb', '#fff', '#fff', '#eaf5fb']}
          start={{x: 0.0, y: 0.25}}
          end={{x: 1, y: 1.0}}
          className="flex-1">
          <Svg height={moderateScale(75)} viewBox="0 50 1300 200">
            <Path
              d="M0,32L48,80C96,128,192,224,288,261.3C384,299,480,277,576,256C672,235,768,213,864,181.3C960,149,1056,107,1152,122.7C1248,139,1344,213,1392,250.7L1440,288L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
              fill={'#2179A9'}></Path>
          </Svg>
          <ScrollView>
            <View className="w-full flex flex-col justify-center items-center">
              <View className="relative">
                <Avatar.Image
                  size={Dimensions.get('screen').width * 0.25}
                  source={{uri: selectedImage}}>
                </Avatar.Image>
                <View className="absolute p-0 bottom-0 right-0">
                  <SelectPhoto
                    onSelect={value => {
                      setSelectedImage(value.uri);
                    }}>
                    <Avatar.Icon
                      size={(Dimensions.get('screen').width * 0.3) / 4.5}
                      icon="plus-circle-outline"
                      color={COLORS.WHITE}
                      style={{
                        backgroundColor: '#027BE3',
                      }}
                    />
                  </SelectPhoto>
                </View>
              </View>
              <View style={styles.infoName}>
                <Text style={styles.textUsername}>{userInfo?.userName}</Text>
                <Text style={styles.textEmail}>{userInfo?.emailCongTy}</Text>
              </View>
            </View>
            <View style={styles.infoDetail}>
              <View style={styles.tabContainer}>
                <TouchableOpacity
                  style={[
                    styles.tabButton,
                    selectedTab === 1 && styles.activeTab,
                  ]}
                  onPress={() => setSelectedTab(1)}>
                  <View style={styles.avatarIcon}>
                    <Image
                      source={ICON_INFO_ACCOUNT.AVATAR_ICON}
                      style={styles.sizeIcon}
                    />
                  </View>
                  <Text
                    style={[
                      styles.tabText,
                      selectedTab === 1 && styles.activeTabText,
                    ]}>
                    Cá nhân
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.tabButton,
                    selectedTab === 2 && styles.activeTab,
                  ]}
                  onPress={() => setSelectedTab(2)}>
                  <View style={styles.avatarIcon}>
                    <Image
                      source={ICON_INFO_ACCOUNT.CONTACTINFO_ICON}
                      style={styles.sizeIcon}
                    />
                  </View>
                  <Text
                    style={[
                      styles.tabText,
                      selectedTab === 2 && styles.activeTabText,
                    ]}>
                    Liên lạc
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.tabButton,
                    selectedTab === 3 && styles.activeTab,
                  ]}
                  onPress={() => setSelectedTab(3)}>
                  <View style={styles.avatarIcon}>
                    <Image
                      source={ICON_INFO_ACCOUNT.PORTFOLIO_ICON}
                      style={styles.sizeIcon}
                    />
                  </View>
                  <Text
                    style={[
                      styles.tabText,
                      selectedTab === 3 && styles.activeTabText,
                    ]}>
                    Công việc
                  </Text>
                </TouchableOpacity>
              </View>
              <View className="m-2 overflow-hidden">{renderTabContent()}</View>
            </View>
          </ScrollView>
        </LinearGradient>
      </SafeAreaView>
    </>
  );
};

export default InfoAccountScreen;

import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TouchableRipple} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '../../../../constants/screens';
import {IMAGES} from '../../../../constants/images';
import {COLORS} from '../../../../constants/colors';
import AppHeader from '../../../components/navigators/AppHeader';
const AttendanceScreen = () => {
  const navigator = useNavigation();

  return (
    <SafeAreaView className="bg-white flex-1">
      <AppHeader title="Chấm công" showButtonBack={true} centerTitle={true} />
      <View className="flex-1">
        <View className="flex flex-row flex-wrap justify-start items-center content-center">
          <TouchableRipple
            rippleColor="transparent"
            onPress={() => {
              //@ts-ignore
              navigator.navigate(SCREENS.CHECKIN_WFH.KEY);
            }}>
            <View className="flex flex-col flex-nowrap justify-center items-center ml-4 mb-4">
              <View
                style={{width: 50, height: 50}}
                className="bg-gray-200 rounded-lg items-center justify-center">
                <Image
                  source={IMAGES.WFH}
                  style={{width: 35, height: 35, tintColor: COLORS.PRIMARY}}
                />
              </View>
              <Text className="text-black">WFH</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple
            rippleColor="transparent"
            onPress={() => {
              //@ts-ignore
              navigator.navigate(SCREENS.ATTENDANCESHEET.KEY);
            }}>
            <View className="flex flex-col flex-nowrap justify-center items-center ml-4 mb-4">
              <View
                style={{width: 50, height: 50}}
                className="bg-gray-200 rounded-lg items-center justify-center">
                <Image
                  source={IMAGES.SCHEDULE}
                  style={{width: 35, height: 35, tintColor: COLORS.PRIMARY}}
                />
              </View>
              <Text className="text-black">Chấm công</Text>
            </View>
          </TouchableRipple>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AttendanceScreen;

const styles = StyleSheet.create({});

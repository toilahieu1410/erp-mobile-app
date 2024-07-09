import {Image, Text, View} from 'react-native';
import React from 'react';
import {TouchableRipple} from 'react-native-paper';
import {COLORS, IMAGES} from '../../../constants/screens';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '../../../constants/screens';

const MenuTaskComponent = () => {
  const navigator = useNavigation();
  return (
    <View>
      <View className="">
        <View className="flex flex-row flex-wrap justify-start items-start">
          {/* <TouchableRipple
            rippleColor={'transparent'}
            onPress={() =>
              //@ts-ignore
              navigator.navigate(SCREENS.ADDNEWTASK.KEY)
            }>
            <View className="flex flex-col flex-nowrap justify-center items-center ml-4 mb-4">
              <View
                style={{width: 40, height: 40}}
                className="bg-gray-200 rounded-lg items-center justify-center">
                <Image
                  source={IMAGES.ADD_TO_DO_LIST}
                  style={{width: 25, height: 25, tintColor: COLORS.PRIMARY}}
                />
              </View>
              <Text className="text-black">Thêm mới</Text>
            </View>
          </TouchableRipple> */}
          <TouchableRipple
            rippleColor={'transparent'}
            onPress={() =>
              //@ts-ignore
              navigator.navigate(SCREENS.TASK_LIST.KEY)
            }>
            <View className="flex flex-col flex-nowrap justify-center items-center ml-4 mb-4">
              <View
               style={{width: 40, height: 40}}
                className="bg-gray-200 rounded-lg items-center justify-center">
                <Image
                  source={IMAGES.TO_DO_LIST}
                  style={{width: 25, height: 25, tintColor: COLORS.PRIMARY}}
                />
              </View>
              {/* <Text className="text-black">Danh sách</Text> */}
            </View>
          </TouchableRipple>

          {/* <View className="flex flex-col flex-nowrap justify-center items-center ml-4 mb-4">
              <View
                style={{width: 50, height: 50}}
                className="bg-gray-200 rounded-lg items-center justify-center">
                <Image
                  source={IMAGES.OVERVIEW_TO_DO}
                  style={{width: 30, height: 30, tintColor: COLORS.PRIMARY}}
                />
              </View>
              <Text>Tổng quát</Text>
            </View> */}
        </View>
      </View>
 
    </View>
  );
};

export default MenuTaskComponent;

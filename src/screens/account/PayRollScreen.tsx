import {Animated, SafeAreaView, Text, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import AppHeader from '../../components/navigators/AppHeader';
import {TouchableRipple} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '../../../constans/screens';

const PayRollScreen = () => {
  const slideAnimation = useRef(new Animated.Value(0)).current;
  const navigator = useNavigation();
  const List = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  useEffect(() => {
    Animated.timing(slideAnimation, {
      toValue: 1,
      duration: 1000, // Độ dài của animation (1 giây trong ví dụ này)
      useNativeDriver: true, // Sử dụng native driver để tối ưu hóa hiệu suất
    }).start();
  }, [slideAnimation]);
  const slideFromLeft = slideAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, 0], // Giá trị ban đầu là -300, giá trị cuối cùng là 0
  });

  return (
    <SafeAreaView className="flex-1 bg-white">
      <AppHeader title="Bảng lương" centerTitle={true} showButtonBack={true} />
      <View className="flex-1 w-full">
        {List.map(item => {
          return (
            <Animated.View style={{transform: [{translateX: slideFromLeft}]}}>
              <TouchableRipple
                onPress={() => {
                  const data = {
                    thang: item,
                    nam: 2023,
                  };
                  //@ts-ignore
                  navigator.navigate(SCREENS.SALARYDETAIL.KEY, data);
                }}>
                <View className="py-4 px-2 border-b border-gray-300 flex flex-row flex-nowrap justify-between items-center">
                  <Text className="text-black text-sm">Tháng {item}</Text>
                  <Text className="text-black text-sm">0 đ</Text>
                </View>
              </TouchableRipple>
            </Animated.View>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

export default PayRollScreen;

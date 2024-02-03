import {
  Animated,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import AppHeader from '../../components/navigators/AppHeader';
import {Icon, TouchableRipple} from 'react-native-paper';
import RBSheet from 'react-native-raw-bottom-sheet';

const PayRollScreen = () => {
  const slideAnimation = useRef(new Animated.Value(0)).current;
  const List = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const buttonSheet = useRef(null);
  // Kiểm tra xem có thông tin về màn hình trước đó không
  useEffect(() => {
    Animated.timing(slideAnimation, {
      toValue: 1,
      duration: 200, // Độ dài của animation (1 giây trong ví dụ này)
      useNativeDriver: true, // Sử dụng native driver để tối ưu hóa hiệu suất
    }).start();
  }, [slideAnimation]);
  const slideFromLeft = slideAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 0], // Giá trị ban đầu là -300, giá trị cuối cùng là 0
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
                  buttonSheet.current?.open();

                  //navigator.navigate(SCREENS.SALARYDETAIL.KEY, data);
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
      <RBSheet
        ref={buttonSheet}
        height={Dimensions.get('screen').height * 0.9}
        openDuration={300}
        closeDuration={300}
        closeOnDragDown={false}
        closeOnPressMask={false}
        customStyles={{
          container: {
            borderTopStartRadius: 30,
            borderTopEndRadius: 30,
          },
        }}>
        <View className="flex-1">
          <View className="relative w-full flex justify-center items-center flex-row p-3">
            <TouchableRipple
              rippleColor={'transparent'}
              className="p-3 w-11  absolute left-0 top-0"
              onPress={() =>
                //@ts-ignore
                buttonSheet.current?.close()
              }>
              <Icon source={'close'} size={25} />
            </TouchableRipple>
            <Text className="font-bold text-black text-xl">
              Tháng 1 năm 2024
            </Text>
          </View>
          <View className="flex-1">
            <ScrollView>
              <View className="p-4 border-b border-gray-300 flex flex-row flex-nowrap justify-between items-center">
                <Text className="text-black text-sm">Giảm trừ bản thân(1)</Text>
                <Text className="text-black text-sm">0</Text>
              </View>
              <View className="p-4 border-b border-gray-300 flex flex-row flex-nowrap justify-between items-center">
                <Text className="text-black text-sm">
                  Số người phụ thuộc(2)
                </Text>
                <Text className="text-black text-sm">0</Text>
              </View>
              <View className="p-4 border-b border-gray-300 flex flex-row flex-nowrap justify-between items-center">
                <View>
                  <Text className="text-black text-sm">Lương cứng(3)</Text>
                  <Text className="text-gray-400 text-xs">
                    Theo quy chế phòng ban
                  </Text>
                </View>

                <Text className="text-black text-sm">0</Text>
              </View>
              <View className="p-4 border-b border-gray-300 flex flex-row flex-nowrap justify-between items-center">
                <View>
                  <Text className="text-black text-sm">Lương cơ bản(4)</Text>
                </View>
                <Text className="text-black text-sm">0</Text>
              </View>
              <View>
                <Text className="text-base text-black my-3 px-2">Phụ cấp</Text>
              </View>
              <View className="py-4 px-2 border-b border-gray-300 flex flex-row flex-nowrap justify-between items-center">
                <Text className="text-black text-sm">Họ và tên</Text>
                <Text className="text-black text-sm">Lâm Văn Đức</Text>
              </View>
              <View className="py-4 px-2 border-b border-gray-300 flex flex-row flex-nowrap justify-between items-center">
                <Text className="text-black text-sm">Họ và tên</Text>
                <Text className="text-black text-sm">Lâm Văn Đức</Text>
              </View>
              <View className="py-4 px-2 border-b border-gray-300 flex flex-row flex-nowrap justify-between items-center">
                <Text className="text-black text-sm">Họ và tên</Text>
                <Text className="text-black text-sm">Lâm Văn Đức</Text>
              </View>
              <View className="py-4 px-2 border-b border-gray-300 flex flex-row flex-nowrap justify-between items-center">
                <Text className="text-black text-sm">Họ và tên</Text>
                <Text className="text-black text-sm">Lâm Văn Đức</Text>
              </View>
              <View className="py-4 px-2 border-b border-gray-300 flex flex-row flex-nowrap justify-between items-center">
                <Text className="text-black text-sm">Họ và tên</Text>
                <Text className="text-black text-sm">Lâm Văn Đức</Text>
              </View>
              <View className="py-4 px-2 border-b border-gray-300 flex flex-row flex-nowrap justify-between items-center">
                <Text className="text-black text-sm">Họ và tên</Text>
                <Text className="text-black text-sm">Lâm Văn Đức</Text>
              </View>
              <View className="py-4 px-2 border-b border-gray-300 flex flex-row flex-nowrap justify-between items-center">
                <Text className="text-black text-sm">Họ và tên</Text>
                <Text className="text-black text-sm">Lâm Văn Đức</Text>
              </View>
              <View className="py-4 px-2 border-b border-gray-300 flex flex-row flex-nowrap justify-between items-center">
                <Text className="text-black text-sm">Họ và tên</Text>
                <Text className="text-black text-sm">Lâm Văn Đức</Text>
              </View>
              <View className="py-4 px-2 border-b border-gray-300 flex flex-row flex-nowrap justify-between items-center">
                <Text className="text-black text-sm">Họ và tên</Text>
                <Text className="text-black text-sm">Lâm Văn Đức</Text>
              </View>
              <View className="py-4 px-2 border-b border-gray-300 flex flex-row flex-nowrap justify-between items-center">
                <Text className="text-black text-sm">Họ và tên</Text>
                <Text className="text-black text-sm">Lâm Văn Đức</Text>
              </View>
              <View className="py-4 px-2 border-b border-gray-300 flex flex-row flex-nowrap justify-between items-center">
                <Text className="text-black text-sm">Họ và tên</Text>
                <Text className="text-black text-sm">Lâm Văn Đức</Text>
              </View>
            </ScrollView>
          </View>
        </View>
      </RBSheet>
    </SafeAreaView>
  );
};

export default PayRollScreen;

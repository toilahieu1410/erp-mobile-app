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
import PayRollComponent from '../../components/account/PayRollComponent';
import {fomatNumber} from '../../../utils/CommonFunction';

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
            <Animated.View
              style={{transform: [{translateX: slideFromLeft}]}}
              key={item}>
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
        height={Dimensions.get('screen').height * 0.85}
        openDuration={300}
        closeDuration={300}
        closeOnDragDown={true}
        closeOnPressMask={false}>
        <View className="flex-1">
          <View className="relative w-full flex justify-center items-center flex-row p-3">
            <Text className="font-bold text-black text-xl">
              Tháng 1 năm 2024
            </Text>
          </View>
          <View className="flex-1">
            <ScrollView>
              <PayRollComponent
                type="content"
                title="1, Giảm trừ bản thân"
                value={1000}
              />

              <PayRollComponent
                type="content"
                title="2, Số người phụ thuộc"
                value={1000}
              />
              <PayRollComponent
                type="content"
                title="3, Lương cứng"
                subTitle="Theo quy chế phòng ban"
                value={1000}
              />
              <PayRollComponent
                type="content"
                title="4, Lương cơ bản"
                subTitle="Theo HĐLĐ"
                value={1000}
              />

              <PayRollComponent value={0} type="header" title="Phụ cấp" />
              <PayRollComponent
                type="content"
                title="5, Ăn trưa"
                value={1000}
              />
              <PayRollComponent
                type="content"
                title="6, Xăng xe"
                value={1000}
              />
              <PayRollComponent
                type="content"
                title="7, Đi lại/Điện thoại"
                value={1000}
              />
              <PayRollComponent
                type="content"
                title="8, Thưởng DS/CV"
                subTitle="Theo quy chế phòng ban"
                value={1000}
              />
              <PayRollComponent
                type="content"
                title="9, Trách nhiệm"
                subTitle="Theo quy chế phòng ban"
                value={1000}
              />
              <PayRollComponent type="header" title="Công cơ bản" />

              <PayRollComponent
                type="content"
                title="10, Công cơ bản"
                subTitle="Ngày công chuẩn/tháng"
                value={1000}
              />
              <PayRollComponent type="header" title="Lương cơ bản" />
              <PayRollComponent
                type="content"
                title="11, Ngày"
                subTitle="(11) = (3) / (10)"
                value={15.5}
              />
              <PayRollComponent
                type="content"
                title="12, Giờ"
                subTitle="(12) = (11) / 8 giờ"
                value={20}
              />
              <PayRollComponent type="header" title="Lương thực tế" />
              <PayRollComponent
                type="content"
                title="13, Công thực tế"
                subTitle="Theo bảng chấm công"
                value={26}
              />
              <PayRollComponent
                type="content"
                title="14, Số tiền"
                subTitle="(14) = (11) * (13)"
                value={1000}
              />
              <PayRollComponent type="header" title="Lương làm thêm" />
              <PayRollComponent
                type="content"
                title="15, Công ngày thường"
                subTitle="Theo bảng chấm công"
                value={1000}
              />
              <PayRollComponent
                type="content"
                title="16, Số tiền công ngày thường"
                subTitle="(16) = (15) * (12) * 1.5"
                value={1000}
              />
              <PayRollComponent
                type="content"
                title="17, Công ngày nghỉ"
                subTitle="Theo bảng chấm công"
                value={1000}
              />
              <PayRollComponent
                type="content"
                title="18, Số tiền công ngày nghỉ"
                subTitle="(18) = (17) * (12) * 2"
                value={1000}
              />
              <PayRollComponent
                type="content"
                title="19, Công ngày lễ"
                subTitle="Theo bảng chấm công"
                value={1000}
              />
              <PayRollComponent
                type="content"
                title="20, Số tiền công ngày lễ"
                subTitle="(20) = (19) * (13) * 2"
                value={1000}
              />
              <PayRollComponent type="header" title="Tổng thu nhập" />
              <PayRollComponent
                type="content"
                title="21, Tổng thu nhập"
                subTitle="(21) = (5) * (13) / (10) + (6) + (7) + (8) + (9) + (14) + (16) + (18) + (20)"
                value={1000}
              />
              <PayRollComponent type="header" title="Bảo hiểm" />
              <PayRollComponent
                type="content"
                title="22, Thuế nhập không chịu thuế TNCN"
                subTitle="(22) = (5) * (13) / (10) + (6)+ (7) + (((16) + (18)) * 0.5) / 1.5 + (20) / 2"
                value={1000}
              />
              <PayRollComponent
                type="content"
                title="23, Thu nhập tính thuế TNCN"
                subTitle="(23) = (21) - (22) - (1) - (2) * 4.400.000"
                value={1000}
              />
              <PayRollComponent
                type="content"
                title="24, Thuế TNCN"
                subTitle="Theo biểu thuế lũy tiến"
                value={1000}
              />
              <PayRollComponent
                type="content"
                title="25, Công ty đóng (22%)"
                subTitle="(25) = (4) * 22%"
                value={1000}
              />
              <PayRollComponent
                type="content"
                title="26, Nhân viên đóng (10.5%)"
                subTitle="(26) = (4) * 10.5%"
                value={1000}
              />
              <PayRollComponent
                type="content"
                title="27, Tạm ứng"
                value={1000}
              />
              <PayRollComponent
                type="content"
                title="28, Trả góp"
                value={1000}
              />
              <PayRollComponent type="header" title="Giờ đi muộn/về sớm" />
              <PayRollComponent
                type="content"
                title="29, Số giờ"
                subTitle="(29) = Giờ đi muộn * 2 + về sớm"
                value={1000}
              />
              <PayRollComponent
                type="content"
                title="30, Số tiền"
                subTitle="(30)= (29) * (12)"
                value={1000}
              />
              <PayRollComponent type="header" title="Quỹ công đoàn" />
              <PayRollComponent
                type="content"
                title="31, Số tiền"
                subTitle="(31) = (3) * 2%"
                value={1000}
              />
              <View className="my-6 flex flex-col justify-center items-center">
                <Text className="text-center text-xl font-bold text-black">
                  Thực lĩnh: {fomatNumber(1000000)}
                </Text>
                <Text className="text-sm text-gray-500">
                  Thực lĩnh = (21)-(24)-(26)-(27)-(28)-(30)-(31)
                </Text>
              </View>
            </ScrollView>
          </View>
        </View>
      </RBSheet>
    </SafeAreaView>
  );
};

export default PayRollScreen;

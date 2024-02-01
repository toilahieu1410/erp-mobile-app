import {SafeAreaView, Text, View} from 'react-native';
import React from 'react';
interface SalaryDetailsProps {
  thang: number;
  nam: number;
}

const SalaryDetailsScreen = (route: any) => {
  const param = route.route.params;
  console.log(param);
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View>
        <Text>
          Chi tiết lương tháng {param?.thang} năm {param?.nam}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default SalaryDetailsScreen;

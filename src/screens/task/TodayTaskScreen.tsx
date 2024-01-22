import {SafeAreaView, Text, View} from 'react-native';
import React from 'react';
import AppHeader from '../../components/navigators/AppHeader';

const TodayTaskScreen = () => {
  return (
    <SafeAreaView className="flex-1">
      <AppHeader title="Công việc hôm nay" showButtonBack={true}></AppHeader>
      <View>
        <Text>Today</Text>
      </View>
    </SafeAreaView>
  );
};

export default TodayTaskScreen;

import {Text, View} from 'react-native';
import React from 'react';
import AppHeader from '../../components/navigators/AppHeader';

const AllTaskScreen = () => {
  return (
    <View>
      <AppHeader title="Tất cả công việc" showButtonBack={true}></AppHeader>
      <Text>AllTask</Text>
    </View>
  );
};

export default AllTaskScreen;

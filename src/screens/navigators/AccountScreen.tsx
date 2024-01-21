import {SafeAreaView, View} from 'react-native';
import React from 'react';
import {ActivityIndicator, Appbar} from 'react-native-paper';
import {COLORS} from '../../../constans/colors';

const AccountScreen = () => {
  return (
    <>
      <SafeAreaView className="flex-1 w-full">
        <Appbar.Header style={{elevation: 2}}>
          <Appbar.Content
            title="Tài khoản"
            titleStyle={{textAlign: 'center', fontSize: 18}}
          />
        </Appbar.Header>
        <View className="flex-1"></View>
      </SafeAreaView>
    </>
  );
};

export default AccountScreen;

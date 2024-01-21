import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AppHeader from '../../components/navigators/AppHeader';

const NotificationScreen = () => {
  return (
    <>
      <SafeAreaView className="flex-1">
        <AppHeader title="Thông báo" centerTitle={true} />
      </SafeAreaView>
    </>
  );
};

export default NotificationScreen;

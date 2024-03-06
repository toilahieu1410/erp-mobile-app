import {Button, Pressable, SafeAreaView, Text, View} from 'react-native';
import React, {useState} from 'react';
import {RouteProp} from '@react-navigation/native';
import AppHeader from '../../components/navigators/AppHeader';

type RootStackParamList = {
  DetailTask: {id: string};
};

type DetailTaskScreenProps = {
  route: RouteProp<RootStackParamList, 'DetailTask'>;
};
const DetailTaskScreen: React.FC<DetailTaskScreenProps> = ({
  route,
}: DetailTaskScreenProps) => {
  const {id} = route.params;

  return (
    <SafeAreaView style={{flex: 1}}>
      <AppHeader
        title="Gặp khách hàng test"
        showButtonBack={true}
        actions={
          <Pressable>
            <Text className="text-black font-bold text-sm">Edit</Text>
          </Pressable>
        }></AppHeader>
      <View style={{flex: 1}}>
        <View></View>
      </View>
    </SafeAreaView>
  );
};

export default DetailTaskScreen;

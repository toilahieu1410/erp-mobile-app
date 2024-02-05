import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {RouteProp} from '@react-navigation/native';

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
    <View>
      <Text>{id}</Text>
    </View>
  );
};

export default DetailTaskScreen;

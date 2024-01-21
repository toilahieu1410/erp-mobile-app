import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import React from 'react';
import AppHeader from '../../components/navigators/AppHeader';
import {Icon} from 'react-native-paper';
import {COLORS} from '../../../constans/colors';
import {FlatGrid} from 'react-native-super-grid';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '../../../constans/screens';

const WorkScreen = () => {
  const dateNow = new Date();
  const navigator = useNavigation();

  const [items, setItems] = React.useState([
    {
      title: 'Hôm nay',
      icon: 'calendar-blank',
      type: '1',
      onclick: () => {
        navigator.navigate(`${SCREENS.HOME.KEY}` as never);
      },
    },
    {
      title: 'Tổng quan',
      icon: 'calendar-month',
      type: '2',
      onclick: () => {
        navigator.navigate(`${SCREENS.HOME.KEY}` as never);
      },
    },
    {
      title: 'Tất cả',
      icon: 'contain',
      type: '2',
      onclick: () => {
        navigator.navigate(`${SCREENS.HOME.KEY}` as never);
      },
    },
  ]);
  return (
    <>
      <SafeAreaView className="flex-1">
        <AppHeader title="Lịch công việc" centerTitle={true} />
        <View className="flex-1 mx-2">
          <View>
            <FlatGrid
              itemDimension={140}
              data={items}
              spacing={10}
              renderItem={({item}) => {
                return (
                  <TouchableOpacity onPress={item.onclick}>
                    <View className="bg-white rounded-xl flex-col p-4">
                      <View className="flex flex-row items-start justify-between">
                        <View
                          className="relative flex justify-center items-center "
                          style={{height: 50, width: 50}}>
                          <Icon
                            size={50}
                            source={item.icon}
                            color={COLORS.PRIMARY}></Icon>
                          {item.type == '1' ? (
                            <Text className="absolute text-primary font-bold text-xl top-[30%] left-[30%]">
                              {dateNow.getDate()}
                            </Text>
                          ) : null}
                        </View>
                        <Text className="text-3xl font-bold text-black">0</Text>
                      </View>
                      <View>
                        <Text className="text-xl text-gray-500">
                          {item.title}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
          {/* <Agenda
            onDayPress={day => {
              console.log('selected day', day);
            }}
            renderItem={item => {
              return (
                <View>
                  <Text>{item.height}</Text>
                </View>
              );
            }}
            markingType={'custom'}
          /> */}
        </View>
      </SafeAreaView>
    </>
  );
};

export default WorkScreen;

const styles = StyleSheet.create({});

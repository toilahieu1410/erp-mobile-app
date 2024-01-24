import {
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Icon, TouchableRipple} from 'react-native-paper';
import {COLORS} from '../../../constans/colors';
import {FlatGrid} from 'react-native-super-grid';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '../../../constans/screens';
import AppHeader from '../../components/navigators/AppHeader';
import LinearGradient from 'react-native-linear-gradient';
import {IMAGES} from '../../../constans/images';
import CircularProgress from 'react-native-circular-progress-indicator';

const TaskScreen = () => {
  const dateNow = new Date();
  const navigator = useNavigation();

  return (
    <>
      <SafeAreaView className="flex-1 bg-white">
        <AppHeader title="Lịch công việc" centerTitle={true}></AppHeader>
        <View className="flex-1 mx-2 mt-2">
          <ScrollView>
            <View className="w-full">
              <View className="flex flex-row justify-between items-center w-full border border-gray-300 rounded-xl pl-2 overflow-hidden">
                <TextInput
                  className="rounded-xl text-base flex-1 p-2"
                  placeholder="Tìm kiếm công việc"
                />
                <View className="p-3 bg-gray-200">
                  <TouchableRipple
                    rippleColor="transparent"
                    onPress={() => console.log('search')}>
                    <Image
                      source={IMAGES.SEARCH}
                      style={{
                        width: 20,
                        height: 20,
                        tintColor: COLORS.PRIMARY,
                      }}
                    />
                  </TouchableRipple>
                </View>
              </View>
              <View className="mt-4 rounded-xl overflow-hidden">
                <LinearGradient
                  colors={['#027BE3', '#094479', '#00d4ff']}
                  start={{x: 0.0, y: 0.25}}
                  end={{x: 1, y: 1.0}}
                  className="flex-1">
                  <View className="w-full h-40 p-4 flex flex-col flex-nowrap justify-between">
                    <View className="flex flex-row flex-nowrap justify-between items-center">
                      <View>
                        <Text className="text-xl font-bold text-white">
                          Tiến trình
                        </Text>
                        <Text className="text-white">
                          Tiến trình công việc hôm nay của bạn
                        </Text>
                      </View>
                      <View>
                        <CircularProgress
                          value={60}
                          radius={25}
                          duration={2000}
                          inActiveStrokeOpacity={0.3}
                          inActiveStrokeColor={'#00c600'}
                          maxValue={100}
                          progressValueColor={'#fff'}
                          valueSuffix={'%'}
                          inActiveStrokeWidth={5}
                          activeStrokeWidth={5}
                        />
                      </View>
                    </View>
                    <View>
                      <View>
                        <Text className="text-xl font-bold text-white">
                          Task
                        </Text>
                        <Text className="text-white">
                          14/24 tổng số ngày hôm nay
                        </Text>
                      </View>
                    </View>
                  </View>
                </LinearGradient>
              </View>
              <View className="">
                <Text className="text-black text-lg">Công việc hôm nay</Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};

export default TaskScreen;

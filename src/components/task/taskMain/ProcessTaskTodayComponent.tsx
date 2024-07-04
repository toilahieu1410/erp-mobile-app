import {Dimensions, Text, View} from 'react-native';
import React from 'react';
import CircularProgress from 'react-native-circular-progress-indicator';
import LinearGradient from 'react-native-linear-gradient';
interface ProcessTaskTodayComponentProps {
  countDoneTask: number;
  totalTask: number;
}

const ProcessTaskTodayComponent = ({
  countDoneTask,
  totalTask,
}: ProcessTaskTodayComponentProps) => {
  return (
    <View
      className="w-full overflow-hidden"
      style={{height: Dimensions.get('screen').height / 5.5}}>
      <LinearGradient
        colors={['#027BE3', '#027BE3', '#027BE3']}
        start={{x: 0.0, y: 0.25}}
        end={{x: 1, y: 1.0}}
        className="flex-1">
        <View className="p-4 flex h-full flex-col flex-nowrap justify-between">
          <View className="flex flex-row flex-nowrap justify-between items-center">
            <View>
              <Text className="text-xl font-bold text-white">Tiến trình</Text>
              <Text className="text-white">
                Tiến trình công việc hôm nay của bạn
              </Text>
            </View>
            <View>
              <CircularProgress
                value={(countDoneTask / totalTask) * 100}
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
              <Text className="text-xl font-bold text-white">Nhiệm vụ</Text>
              <Text className="text-white">
                {countDoneTask}/{totalTask} tổng số ngày hôm nay
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default ProcessTaskTodayComponent;

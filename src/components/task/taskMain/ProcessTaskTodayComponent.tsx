import React from 'react';
import {Dimensions, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CircularProgress from 'react-native-circular-progress-indicator';
import LinearGradient from 'react-native-linear-gradient';
import {styles} from '../../../assets/css/ListTaskScreen/style';
import {moderateScale} from '../../../screens/size';

interface ProcessTaskTodayComponentProps {
  countDoneTask: number;
  totalTask: number;
  taskList: [];
}

const ProcessTaskTodayComponent = ({
  countDoneTask,
  totalTask,
  taskList,
}: ProcessTaskTodayComponentProps) => {
  return (
    <View className="w-full overflow-hidden" >
      <View style={styles.listStatusWork}>
        <View style={styles.boxLeft}>
          <Icon
            style={styles.iconRounded}
            name="school"
            size={moderateScale(24)}
            color={'#7798A8'}
          />
          <Text style={styles.textTitle}>{taskList.length} Jobs</Text>
          <Text style={styles.textDescription}>Tổng việc tháng này</Text>
        </View>
        <View style={styles.boxRight}>
          <View style={styles.boxRightTop}>
          <Icon
          style={styles.iconRounded}
            name="school"
            size={moderateScale(24)}
            color={'#7798A8'}
          />
            <View style={styles.textRight}>
              <Text style={styles.textTitle}>4 Jobs</Text>
              <Text style={styles.textDescription}>Việc đã xong</Text>
            </View>
          </View>
          <View style={styles.boxRightBottom}>
          <Icon
          style={styles.iconRounded}
            name="school"
            size={moderateScale(24)}
            color={'#7798A8'}
          />
            <View style={styles.textRight}>
              <Text style={styles.textTitle}>14 Jobs</Text>
              <Text style={styles.textDescription}>Việc đang làm</Text>
            </View>
          </View>
        </View>
      </View>

      {/* <LinearGradient
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
      </LinearGradient> */}
    </View>
  );
};

export default ProcessTaskTodayComponent;

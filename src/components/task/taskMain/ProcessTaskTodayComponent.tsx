import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CircularProgress from 'react-native-circular-progress-indicator';
import LinearGradient from 'react-native-linear-gradient';
import {styles} from '../../../assets/css/ListTaskScreen/style';
import {moderateScale} from '../../../screens/size';

interface ProcessTaskTodayComponentProps {
  countDoneTask: number;
  totalTask: number;
  taskList: [];
  handleStatusFilter: (status: string) => void;
  getTaskCountByStatus: (status: string) => number;
}

const ProcessTaskTodayComponent = ({
  countDoneTask,
  totalTask,
  taskList,
  handleStatusFilter,
  getTaskCountByStatus
  
}: ProcessTaskTodayComponentProps) => {
  return (
    <View className="w-full overflow-hidden" >
      <View style={styles.listAllWorks}>
      <LinearGradient
        colors={['#19547b', '#4ca1af', '#19547b']}
        start={{x: 0.0, y: 0.25}}
        end={{x: 1, y: 1.0}}
        className="flex-1 mb-5">
        <View className="p-4 flex h-full flex-col flex-nowrap justify-between">
          <View className="flex flex-row  justify-between items-center">
            <View>
              <Text className="text-xl font-bold text-white">Tiến trình</Text>
              <Text className="text-white">
                Tiến trình công việc hôm nay của bạn
              </Text>
            </View>
            <View>
              <CircularProgress
                value={(countDoneTask / totalTask) * 100}
                radius={35}
                duration={2000}
                inActiveStrokeOpacity={0.3}
                inActiveStrokeColor={'#ccc'}
                activeStrokeColor={'#FFEF77'}
                maxValue={100}
                progressValueColor={'#fff'}
                valueSuffix={'%'}
                inActiveStrokeWidth={5}
                activeStrokeWidth={5}
              />
            </View>
          </View>
            <View>
              <Text className="text-xl font-bold text-white">Nhiệm vụ</Text>
              <Text className="text-white">
                {countDoneTask}/{totalTask} tổng số ngày hôm nay
              </Text>
            </View>
        </View>
      </LinearGradient> 
      <View style={styles.boxFull}>
        <TouchableOpacity style={styles.boxCenterWidthFull} onPress={() => handleStatusFilter('')}>
        <Icon
            style={styles.iconRounded}
            name="school"
            size={moderateScale(24)}
            color={'#7798A8'}
          />
          <View style={styles.textRight}>
          <Text style={styles.textTitle}>{taskList.length} Jobs</Text>
          <Text style={styles.textDescription}>Tổng việc tháng này</Text>
          </View>
        </TouchableOpacity>
     

        </View>
      </View>
      <View style={styles.listStatusWork}>
        <TouchableOpacity style={styles.boxLeft} onPress={() => handleStatusFilter('DaHoanThanh')}>
          <Icon
            style={styles.iconRounded}
            name="school"
            size={moderateScale(24)}
            color={'#7798A8'}
          />
          <Text style={styles.textTitle}>{getTaskCountByStatus('DaHoanThanh')} Jobs</Text>
          <Text style={styles.textDescription}>Tổng việc đã xử lý </Text>
        </TouchableOpacity>
        <View style={styles.boxRight}>
          <TouchableOpacity style={styles.boxRightTop} onPress={() => handleStatusFilter('DangXuLy')}>
          <Icon
          style={styles.iconRounded}
            name="school"
            size={moderateScale(24)}
            color={'#7798A8'}
          />
            <View style={styles.textRight}>
              <Text style={styles.textTitle}>{getTaskCountByStatus('DangXuLy')} Jobs</Text>
              <Text style={styles.textDescription}>Việc đang làm</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.boxRightBottom} onPress={() => handleStatusFilter('ChuaXuLy')}>
          <Icon
          style={styles.iconRounded}
            name="school"
            size={moderateScale(24)}
            color={'#7798A8'}
          />
            <View style={styles.textRight}>
              <Text style={styles.textTitle}>{getTaskCountByStatus('ChuaXuLy')} Jobs</Text>
              <Text style={styles.textDescription}>Việc chưa làm</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProcessTaskTodayComponent;

import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  SectionList,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  Avatar,
  Button,
  Divider,
  Icon,
  Menu,
  PaperProvider,
  TouchableRipple,
} from 'react-native-paper';
import {COLORS} from '../../../constans/colors';
import AppHeader from '../../components/navigators/AppHeader';
import LinearGradient from 'react-native-linear-gradient';
import {IMAGES} from '../../../constans/images';
import CircularProgress from 'react-native-circular-progress-indicator';
import {FlatList} from 'react-native-gesture-handler';
import TaskFlatListComponent from '../../components/task/TaskFlatListComponent';
import {Task} from '../../models/Task';

const TaskScreen = () => {
  const [test, setTest] = useState<number>(50);
  const fullHeightScreen = Dimensions.get('screen').height;
  const taskList: ReadonlyArray<Task> = [
    {
      id: 'KAP-1',
      title: 'Gặp khách hàng tại Đình Thôn',
      status: 'todo',
      userCreate: 'Duclv',
      fullNameCreate: 'Lâm Văn Đức',
      avatarUserCreate:
        'https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/Sunset-900x600.jpeg',
      watching: [
        {
          username: 'VinhLQ',
          fullName: 'Lâm Quang Vinh',
          avatar:
            'https://scontent.fhan4-1.fna.fbcdn.net/v/t39.30808-6/406235614_1046644906482722_7384331104801404722_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=c42490&_nc_ohc=C331E7nigToAX8CaLVh&_nc_ht=scontent.fhan4-1.fna&oh=00_AfAjP5GkQD5p0YFG2rp93uulFCc9xz34eDC9daKb7sx1GQ&oe=65B791B5',
        },
        {
          username: 'Duclv',
          fullName: 'Lâm Văn Đức',
          avatar:
            'https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/Sunset-900x600.jpeg',
        },
        {
          username: 'HienLT',
          fullName: 'Lâm Thị Hiền',
          avatar:
            'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_640.jpg',
        },
        {
          username: 'TanNM',
          fullName: 'Nguyễn Minh Tân',
          avatar:
            'https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg',
        },
        {
          username: 'VinhLQ',
          fullName: 'Lâm Quang Vinh',
          avatar:
            'https://scontent.fhan4-1.fna.fbcdn.net/v/t39.30808-6/406235614_1046644906482722_7384331104801404722_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=c42490&_nc_ohc=C331E7nigToAX8CaLVh&_nc_ht=scontent.fhan4-1.fna&oh=00_AfAjP5GkQD5p0YFG2rp93uulFCc9xz34eDC9daKb7sx1GQ&oe=65B791B5',
        },
      ],
    },
    {
      id: 'KAP-2',
      title: 'Ký hợp đồng tại Mỹ đình',
      status: 'done',
      userCreate: 'Duclv',
      fullNameCreate: 'Lâm Văn Đức',
      avatarUserCreate:
        'https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/Sunset-900x600.jpeg',
      watching: [
        {
          username: 'HienLT',
          fullName: 'Lâm Thị Hiền',
          avatar:
            'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_640.jpg',
        },
        {
          username: 'Duclv',
          fullName: 'Lâm Văn Đức',
          avatar:
            'https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/Sunset-900x600.jpeg',
        },
        {
          username: 'TanNM',
          fullName: 'Nguyễn Minh Tân',
          avatar:
            'https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg',
        },
      ],
    },
    {
      id: 'KAP-3',
      title: 'Khảo sát thị trường mới',
      status: 'todo',
      userCreate: 'Duclv',
      fullNameCreate: 'Lâm Văn Đức',
      avatarUserCreate:
        'https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/Sunset-900x600.jpeg',
      watching: [
        {
          username: 'HienLT',
          fullName: 'Lâm Thị Hiền',
          avatar:
            'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_640.jpg',
        },
        {
          username: 'TanNM',
          fullName: 'Nguyễn Minh Tân',
          avatar:
            'https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg',
        },
      ],
    },
    {
      id: 'KAP-4',
      title: 'Khảo sát thị trường mới',
      status: 'done',
      userCreate: 'Duclv',
      fullNameCreate: 'Lâm Văn Đức',
      avatarUserCreate:
        'https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/Sunset-900x600.jpeg',
      watching: [
        {
          username: 'HienLT',
          fullName: 'Lâm Thị Hiền',
          avatar:
            'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_640.jpg',
        },
      ],
    },
    {
      id: 'KAP-5',
      title: 'Khảo sát thị trường mới',
      status: 'todo',
      fullNameCreate: 'Lâm Văn Đức',
      avatarUserCreate: 'a',
      userCreate: 'Duclv',
      watching: [],
    },
  ];

  return (
    <>
      <SafeAreaView className="flex-1 bg-white">
        <AppHeader title="Lịch công việc" centerTitle={true}></AppHeader>
        <ScrollView>
          <View className="flex-1 px-2 mt-2">
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
              <View
                className="mt-4 rounded-xl w-full overflow-hidden"
                style={{height: fullHeightScreen / 5.5}}>
                <LinearGradient
                  colors={['#027BE3', '#094479', '#00d4ff']}
                  start={{x: 0.0, y: 0.25}}
                  end={{x: 1, y: 1.0}}
                  className="flex-1">
                  <View className="p-4 flex h-full flex-col flex-nowrap justify-between">
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
                          value={test}
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
              <View className="my-4 flex flex-row flex-nowrap justify-between items-center">
                <Text className="text-black text-lg font-bold">
                  Công việc hôm nay
                </Text>
                <Text className="text-primary font-bold text-base">
                  Xem thêm
                </Text>
              </View>
              <View>
                {taskList.map((item, index) => {
                  return (
                    <TouchableRipple
                      key={item.id}
                      rippleColor={'transparent'}
                      className="block mb-2"
                      onPress={() => {
                        console.log('detail');
                      }}>
                      <TaskFlatListComponent task={item} />
                    </TouchableRipple>
                  );
                })}
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default TaskScreen;

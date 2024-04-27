import {Image, SafeAreaView, ScrollView, Text, View} from 'react-native';
import React from 'react';
import {TouchableRipple} from 'react-native-paper';
import {COLORS} from '../../../constants/colors';
import AppHeader from '../../components/navigators/AppHeader';
import {IMAGES} from '../../../constants/images';
import TaskFlatListComponent from '../../components/task/taskMain/TaskFlatListComponent';
import {Task} from '../../models/Task';
import ProcessTaskTodayComponent from '../../components/task/taskMain/ProcessTaskTodayComponent';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '../../../constants/screens';
import MenuTaskComponent from '../../components/task/taskMain/MenuTaskComponent';

const TaskScreen = () => {
  const navigation = useNavigation();
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
      type: null,
      customer: null,
      customerName: null,
      description: null,
      Attachment: [],
      deadline: null,
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
      type: null,
      customer: null,
      customerName: null,
      description: null,
      Attachment: [],
      deadline: null,
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
      type: null,
      customer: null,
      customerName: null,
      description: null,
      Attachment: [],
      deadline: null,
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
      type: null,
      customer: null,
      customerName: null,
      description: null,
      Attachment: [],
      deadline: null,
    },
    {
      id: 'KAP-5',
      title: 'Khảo sát thị trường mới',
      status: 'todo',
      fullNameCreate: 'Lâm Văn Đức',
      avatarUserCreate: 'a',
      userCreate: 'Duclv',
      watching: [],
      type: null,
      customer: null,
      customerName: null,
      description: null,
      Attachment: [],
      deadline: null,
    },
  ];

  return (
    <>
      <SafeAreaView className="flex-1 bg-white">
        <AppHeader
          title="Lịch công việc"
          centerTitle={true}
          actions={
            <TouchableRipple
              rippleColor="transparent"
              onPress={() =>
                //@ts-ignore
                navigation.navigate(SCREENS.SEARCHTASK.KEY)
              }
              style={{marginRight: 10}}>
              <Image
                source={IMAGES.SEARCH}
                style={{
                  width: 20,
                  height: 20,
                  tintColor: COLORS.PRIMARY,
                }}
              />
            </TouchableRipple>
          }
        />
        <ScrollView>
          <View className="flex-1">
            <View className="w-full">
              <View>
                <ProcessTaskTodayComponent totalTask={25} countDoneTask={13} />
              </View>
              <MenuTaskComponent />
              <View className="my-4 px-2 flex flex-row flex-nowrap justify-between items-center">
                <Text className="text-black text-lg font-bold">Công việc</Text>
              </View>
              <View className="px-2">
                {taskList.map(item => {
                  return <TaskFlatListComponent task={item} key={item.id} />;
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

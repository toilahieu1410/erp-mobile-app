import {
  Pressable,
  SafeAreaView,
  Text,
  View,
  ScrollView,
  Image,
} from 'react-native';
import React from 'react';
import {RouteProp} from '@react-navigation/native';
import AppHeader from '../../components/navigators/AppHeader';
import AttachmentTaskComponent from '../../components/task/addTask/AttachmentTaskComponent';
import {Icon} from 'react-native-paper';
import ChoiceMenu from '../../components/app/menu/ChoiceMenu';

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

  const data = {
    id: 'KAP-1',
    title: 'Gặp khách hàng tại Đình Thôn',
    status: 'todo',
    userCreate: 'Duclv',
    fullNameCreate: 'Lâm Văn Đức',
    type: 'visit',
    customer: 'Công ty TNHH ....',
    customerCode: 'KH000001',
    descreption: 'Công ty TNHH ....',
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
    attachment: [{}],
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <AppHeader
        title={data.id}
        centerTitle={true}
        showButtonBack={true}
        actions={
          <View className="flex flex-row justify-end items-center">
            <ChoiceMenu></ChoiceMenu>
            <Pressable>
              <Text className="text-black font-bold text-sm px-2">Edit</Text>
            </Pressable>
          </View>
        }
      />
      <View style={{flex: 1}}>
        <ScrollView>
          <View>
            <Text className="font-bold text-black text-sm py-2 px-1">
              {data.title}
            </Text>
          </View>
          <View>
            <View className="bg-white border-b-gray-300 border-b py-3 px-2">
              <Text className="text-gray">Loại công việc</Text>
              <Text className="text-black">{data.type}</Text>
            </View>

            <View className="bg-white border-b-gray-300 border-b py-3 px-2">
              <Text className="text-gray-300">Khách hàng</Text>
              <Text className="text-black">
                {data.customer + '(' + data.customerCode + ')'}
              </Text>
            </View>

            <View className="bg-white border-b-gray-300 border-b py-3 px-2">
              <Text className="text-gray">Mô tả</Text>
              <Text className="text-black">{data.descreption}</Text>
            </View>

            <View className="bg-white border-b-gray-300 border-b py-3 px-2">
              <Text className="text-gray">Trạng thái</Text>
              <Text className="text-black px-2 py-1 rounded-md bg-gray-300 w-16 text-center">
                {data.status}
              </Text>
            </View>
            <View className="bg-white border-b-gray-300 border-b py-3 px-2">
              <Text className="text-gray">Tài liệu</Text>
              {/* <AttachmentTaskComponent data={data.} /> */}
            </View>

            <View className="bg-white border-b-gray-300 border-b py-3 px-2">
              <Text className="text-gray">Người theo dõi</Text>
              <View>
                {data.watching.map((item, index) => (
                  <View
                    className="p-1 flex flex-row justify-start items-center"
                    key={index}>
                    <Image
                      source={{uri: item.avatar}}
                      style={{width: 30, height: 30, borderRadius: 30}}
                    />
                    <Text className="px-1 text-black text-base">
                      {item.fullName}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            <View className="bg-white border-b-gray-300 border-b py-3 px-2">
              <Text className="text-gray">Ngày cập nhật</Text>
              <Text className="text-black">{data.type}</Text>
            </View>

            <View className="bg-white border-b-gray-300 border-b py-3 px-2">
              <Text className="text-gray">Ngày tạo</Text>
              <Text className="text-black">{data.type}</Text>
            </View>

            <View className="bg-white border-b-gray-300 border-b py-3 px-2">
              <Text className="text-gray">Người tạo</Text>
              <Text className="text-black">{data.type}</Text>
            </View>

            <View className="bg-white border-b-gray-300 border-b py-3 px-2">
              <Text className="text-gray">Ngày cập nhật</Text>
              <Text className="text-black">{data.type}</Text>
            </View>

            <View className="bg-white border-b-gray-300 border-b py-3 px-2">
              <Text className="text-gray">Người cập nhật</Text>
              <Text className="text-black">{data.type}</Text>
            </View>
          </View>
          <ChoiceMenu></ChoiceMenu>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default DetailTaskScreen;

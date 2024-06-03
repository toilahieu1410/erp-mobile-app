import React, {useCallback, useEffect, useState} from 'react';
import {
  View, 
  Text,
  Dimensions, 
  FlatList, 
  TouchableOpacity,
  RefreshControl,  
  ActivityIndicator} from 'react-native';

import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/Ionicons';
import {moderateScale} from '../../../screens/size';
import {RectButton, Swipeable, GestureHandlerRootView} from 'react-native-gesture-handler';
import AppHeader from '../../navigators/AppHeader';
import moment from 'moment';
import TakeLeaveService from '../../../services/listWorks/serviceTakeLeave';
import {styles} from '../../../assets/css/ConfirmScreen/_listConfirm';

interface NghiPhep {
  id: string;
  content: string;
  handOver_Content: string;
  handOver_ToUserId: string;
  approvedBy: string | null;
  approvedAt: string | null;
  type: string;
  status: string;
  createdByUserId: string;
  createdByUserName: string;
  createdAt: string;
}

interface ViewTakeLeaveProps {
  nghiPhep: NghiPhep[];
  refreshing: boolean;
  onRefresh: () => void;
}

interface RouteParams {
  fromDate?: string;
  toDate?: string;
}

const ListTakeLeave: React.FC = () => {

  const navigation = useNavigation();
  const route = useRoute<RouteProp<{ params: RouteParams }, 'params'>>();

  const { fromDate: initialFromDate = '', toDate: initialToDate = '' } = route.params || {};

  const [index, setIndex] = useState(0);
  const [listNghiPhep, setListNghiPhep] = useState<NghiPhep[]>([]);
  const [fromDate, setFromDate] = useState<Date | null>(initialFromDate ? moment(initialFromDate, 'DD/MM/YYYY').toDate() : null);
  const [toDate, setToDate] = useState<Date | null>(initialToDate ? moment(initialToDate, 'DD/MM/YYYY').toDate() : null);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const routes = [
    {
      key: 'all',
      title: 'Tất cả',
      icon: '',
    },
    {
      key: 'pending',
      title: 'Chưa duyệt',
      icon: 'ellipse-sharp',
      color: '#3366ff',
    },
    {
      key: 'approved',
      title: 'Đã duyệt',
      icon: 'ellipse-sharp',
      color: '#27b376',
    },
    {
      key: 'rejected',
      title: 'Hủy duyệt',
      icon: 'ellipse-sharp',
      color: '#cc2a36',
    },
  ];

  console.log(listNghiPhep,'listNghiPhep')
  useEffect(() => {
    const fromDateValue = initialFromDate ? moment(initialFromDate, 'DD/MM/YYYY').toDate() : null
    const toDateValue = initialToDate ? moment(initialToDate, 'DD/MM/YYYY').toDate() : null
    setFromDate(fromDateValue)
    setToDate(toDateValue)
    fetchListTakeLeave(fromDateValue, toDateValue)

  }, [initialFromDate, initialToDate])

  const fetchListTakeLeave = async (fromDate: Date | null, toDate: Date | null) => {
    try {
      setLoading(true)
      const formattedFromDate = fromDate ? moment(fromDate).format('DD/MM/YYYY') : ''
      const formattedToDate = toDate ? moment(toDate).format('DD/MM/YYYY') : ''

      const response: any = await TakeLeaveService.getListTakeLeave(formattedFromDate, formattedToDate)
      const sortedResponse = response.sort((a: NghiPhep, b: NghiPhep) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      })
      setListNghiPhep(sortedResponse)
    } catch (error) {
      console.error('Error fetching listTakeLeave', error)
      setListNghiPhep([])
    } finally {
      setLoading(false)
    }
  }

  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    await fetchListTakeLeave(fromDate, toDate)
    setRefreshing(false)
  }, [initialFromDate, initialToDate])

  const renderScene = SceneMap({
    all: () => (
      <ViewTask 
        nghiPhep={listNghiPhep}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    ),
    pending: () => (
      <ViewTask
        nghiPhep={listNghiPhep.filter((item) => item.status === 'Pending')}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    ),
    approved: () => (
      <ViewTask
        nghiPhep={listNghiPhep.filter((item) => item.status === 'Approved')}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    ),
    rejected: () => (
      <ViewTask
        nghiPhep={listNghiPhep.filter((item) => item.status === 'Reject')}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    ),
  })

  return (
    <GestureHandlerRootView style={styles.container}>
       <AppHeader title="Danh sách đơn nghỉ phép" showButtonBack={true} />
      <TabView 
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: Dimensions.get('window').width}}
        renderTabBar={props => (
          <TabBar 
            {...props}
            indicatorStyle={{backgroundColor: '#2179A9'}}
            style={{backgroundColor: '#fff', borderBottomColor: '#cecece', borderBottomWidth: 1}}
            labelStyle={{color:'black'}}
             renderLabel={({ route, focused, color }) => (
              <View style={{flexDirection: 'row', alignItems:'center'}}>
                <Icon 
                  name={route.icon}
                  size={moderateScale(10)}
                  color={route.color}
                />
                <Text style={{color: 'black', marginLeft: moderateScale(5)}}>{route.title}</Text>
              </View>
            )}
          />
        )}
      />  
      {loading && !refreshing ? (
        <View style={styles.spinnerContainer}>
          <ActivityIndicator size="large" color="#2179A9" />
        </View>
      ) : null}
    </GestureHandlerRootView>
  );
};

export default ListTakeLeave;

const ViewTask: React.FC<ViewTakeLeaveProps> = ({nghiPhep, refreshing, onRefresh}) => {
  const navigation: any = useNavigation();

  const checkStatusIcon = (status: string) => {
    switch (status) {
      case 'Pending':
        return (
          <View style={[styles.statusWrapper, {backgroundColor: '#3366ff'}]}>
            <Text style={styles.statusText}>Chưa duyệt</Text>
          </View>
        );
      case 'Approved':
        return (
          <View style={[styles.statusWrapper, {backgroundColor: '#27b376'}]}>
            <Text style={styles.statusText}>Đã duyệt</Text>
          </View>
        );
      case 'Rejected':
        return (
          <View style={[styles.statusWrapper, {backgroundColor: '#cc2a36'}]}>
            <Text style={styles.statusText}>Hủy duyệt</Text>
          </View>
        );
      default:
        return null;
    }
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    const day = ('0' + date.getDate()).slice(-2); // Thêm số 0 phía trước nếu cần và lấy hai ký tự cuối
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const renderRightActions = (id: string) => {
    return (
      <RectButton style={styles.deleteButton} onPress={(e) => console.log(e)}>
        <Icon name='trash-outline' size={moderateScale(20)} color={'#fff'} />
        <Text style={styles.textWhite}>Delete</Text>
      </RectButton>
    )
  }

  return (
      <FlatList
        data={nghiPhep}
        renderItem={({item}) => (
          <Swipeable
            renderRightActions={() => item.status === 'Pending' ? renderRightActions(item.id) : null}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.boxWrapper}
              onPress={() => navigation.navigate('')}
            >
              <View style={styles.itemWrapper}>
                <View style={styles.contentWrapper}>
                  <Text style={styles.subText}>{item.content}</Text>
                  <Text style={styles.mainText}>
                    Ngày tạo: {moment(item.createdAt).format('DD/MM/YYYY')}
                  </Text>
                  <View style={styles.textDate}>
                    {/* <Text style={styles.mainText}>
                      Ngày nghỉ phép: {moment(item.)}
                    </Text> */}
                  </View>
                </View>
                <View style={styles.statusWrapper}>
                <Text>{checkStatusIcon(item.status)}</Text>
                <View style={styles.icon}>
                  <Icon
                    name="chevron-forward-sharp"
                    size={moderateScale(20)}
                    color={'#aaa'}
                  />
                </View>
              </View>
              </View>
            </TouchableOpacity>
          </Swipeable>
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      />
  );
};

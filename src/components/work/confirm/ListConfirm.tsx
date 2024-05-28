import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Alert,
  RefreshControl
} from 'react-native';
import {TouchableRipple, Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {
  RectButton,
  Swipeable,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import {moderateScale} from '../../../screens/size';
import {showMessage} from 'react-native-flash-message';
import {SCREENS} from '../../../constants/screens';
import AppHeader from '../../navigators/AppHeader';
import moment from 'moment';
import ConfirmService from '../../../services/listWorks/serviceConfirm';
import DatePicker from 'react-native-date-picker';
import {styles} from '../../../assets/css/ConfirmScreen/_listConfirm';
import Pagination from '../../../constants/pagination';

interface XacNhan {
  id: string;
  content: string;
  dateNeedConfirm: string;
  type: string;
  status: string;
  createdByUserId: string;
  createdByUsername: string;
  startDate: string | null;
  endDate: string | null;
  createdAt: string;
}

interface ViewConfirmProps {
  xacNhan: XacNhan[];
  onDelete: (id: string) => void;
  refreshing: boolean;
  onRefresh: () => void;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>
  totalItems: number
}

const ListConfirm: React.FC = () => {
  const navigation = useNavigation();
  const [index, setIndex] = useState(0);
  const [listXacNhan, setListXacNhan] = useState<XacNhan[]>([]);
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [refreshing, setRefreshing] = useState(false)
  const [showFromDatePicker, setShowFromDatePicker] = useState(false);
  const [showToDatePicker, setShowToDatePicker] = useState(false);

  // Phan trang tung trang thai
  const [allPage, setAllPage] = useState(1)
  const [pendingPage, setPendingPage] = useState(1)
  const [approvedPage, setApprovedPage] = useState(1)
  const [rejectedPage, setRejectedPage] = useState(1)

  const itemsPerPage  = 5
  
  const routes = [
    {key: 'all', title: 'Tất cả', icon: ''},
    {
      key: 'pending',
      title: 'Chưa duyệt',
      icon: 'ellipse-sharp',
      color: '#3366ff',
    },
    {
      key: 'appvored',
      title: 'Đã duyệt',
      icon: 'ellipse-sharp',
      color: '#27b376',
    },
    {
      key: 'reject',
      title: 'Hủy duyệt',
      icon: 'ellipse-sharp',
      color: '#cc2a36',
    },
  ];


  // useEffect(() => {
  //   paginateData()
  // }, [listXacNhan, page])

  // const paginateData = () => {
  //   const startIndex = (page - 1) * pageSize
  //   const endIndex = startIndex + pageSize
  //   setDisplayedXacNhan(listXacNhan.slice(startIndex, endIndex))
  // }

  useEffect(() => {
    fetchConfirmList()
  }, [])

 
  const fetchConfirmList = async () => {
    try {
      if (!fromDate || !toDate) {
        // Load toàn bộ dữ liệu nếu không chọn ngày
        const response: any = await ConfirmService.getConfirmList('', '');
        const sortedResponse = response.sort((a: XacNhan, b: XacNhan) => {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        })
        setListXacNhan(sortedResponse);
      } else {
        const formattedFromDate = moment(fromDate).format('DD/MM/YYYY');
        const formattedToDate = moment(toDate).format('DD/MM/YYYY');
        const response: any = await ConfirmService.getConfirmList(
          formattedFromDate,
          formattedToDate,
        );

        const sortedResponse = response.sort((a: XacNhan, b: XacNhan) => {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        })
        setListXacNhan(sortedResponse);
      }
    } catch (error) {
      console.error('Error fetching list confirm', error);
      setListXacNhan([]);
    }
  }

  const handleToChangeDate = (date: Date) => {
    setToDate(date)
    const newFromDate = new Date(date)
    // newFromDate.setDate(newFromDate.getDate() - 30)
    setFromDate(newFromDate)
  }

  const handleDelete = async (id: string) => {
    Alert.alert(
      'Xác nhận xóa',
      'Bạn chắc chắn muốn xóa mục này',
      [
        {
          text: 'Hủy',
          onPress: () => console.log('Cancel'),
          style: 'cancel',
        },
        {
          text: 'Đồng ý',
          onPress: async () => {
            try {
              await ConfirmService.deleteConfirm(id);
              setListXacNhan(prevState =>
                prevState.filter(item => item.id !== id),
              );
              showMessage({
                message: 'Success',
                description: 'Xóa đơn xác nhận thành công',
                type: 'success',
              });
            } catch (error) {
              showMessage({
                message: 'Error',
                description: 'Xóa đơn thất bại',
                type: 'danger',
              });
            }
          },
        },
      ],
      {cancelable: false},
    );
  };

  const onRefresh = useCallback(async  () => {
    setRefreshing(true)
    await fetchConfirmList()
    setRefreshing(false)
  }, [fromDate, toDate])  

  const handleReloadData = async () => {
    setFromDate(null)
    setToDate(null)
    await fetchConfirmList()
  }

  const renderScene = SceneMap({
    all: () => (
      <ViewTask 
      xacNhan={listXacNhan.slice((allPage - 1) * itemsPerPage, allPage * itemsPerPage)} 
      onDelete={handleDelete} 
      refreshing={refreshing}  
      onRefresh={onRefresh}
      page={allPage}
      setPage={setAllPage}
      totalItems={listXacNhan.length}
      />
    ),
    pending: () => (
      <ViewTask
        xacNhan={listXacNhan.filter(item => item.status === 'Pending').slice((pendingPage - 1) * itemsPerPage, pendingPage * itemsPerPage)}
        onDelete={handleDelete}
        refreshing={refreshing}
        onRefresh={onRefresh}
        page={pendingPage}
        setPage={setPendingPage}
        totalItems={listXacNhan.filter(item => item.status === 'Pending').length}
      />
    ),
    appvored: () => (
      <ViewTask
        xacNhan={listXacNhan.filter(item => item.status === 'Approved').slice((approvedPage - 1) * itemsPerPage, approvedPage * itemsPerPage)}
        onDelete={handleDelete}
        refreshing={refreshing}
        onRefresh={onRefresh}
        page={approvedPage}
        setPage={setApprovedPage}
        totalItems={listXacNhan.filter(item => item.status === 'Approved').length}
      />
    ),
    reject: () => (
      <ViewTask
        xacNhan={listXacNhan.filter(item => item.status === 'Reject').slice((rejectedPage - 1) * itemsPerPage, rejectedPage * itemsPerPage)}
        onDelete={handleDelete}
        refreshing={refreshing}
        onRefresh={onRefresh}
        page={rejectedPage}
        setPage={setRejectedPage}
        totalItems={listXacNhan.filter(item => item.status === 'Reject').length}
      />
    ),
  });

  return (
    <GestureHandlerRootView style={styles.container}>
      <AppHeader
        title="Xin xác nhận"
        showButtonBack={true}
        actions={
          <TouchableRipple
            rippleColor={'transparent'}
            onPress={() =>
              //@ts-ignore
              navigation.navigate(SCREENS.TAO_DON_XAC_NHAN.KEY)
            }>
            <Icon
              name="add-circle-outline"
              size={moderateScale(25)}
              color={'#2179A9'}
            />
          </TouchableRipple>
        }
      />
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: Dimensions.get('window').width}}
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorStyle={{backgroundColor: '#2179A9'}}
            style={{backgroundColor: '#ffffff', elevation: 0}}
            labelStyle={{color: 'black'}}
            renderLabel={({route, focused, color}) => (
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon
                  name={route.icon}
                  size={moderateScale(10)}
                  color={route.color}
                />
                <Text style={{color: 'black', marginLeft: moderateScale(5)}}>
                  {route.title}
                </Text>
              </View>
            )}
          />
        )}
      />

      <DatePicker
        modal
        open={showFromDatePicker}
        date={fromDate || new Date()}
        mode="date"
        // maximumDate={toDate ? new Date(toDate.getTime() - (30 * 24 * 60 * 1000)) : undefined}
        onConfirm={date => {
          setShowFromDatePicker(false);
          setFromDate(date);
        }}
        onCancel={() => {
          setShowFromDatePicker(false);
        }}
      />
      <DatePicker
        modal
        open={showToDatePicker}
        date={toDate || new Date()}
        mode="date"
        // minimumDate={fromDate ? new Date(fromDate.getTime() + (30 * 24 * 60 * 1000)) : undefined}
        onConfirm={date => {
          setShowToDatePicker(false);
          setToDate(date);
          // handleToChangeDate(date)
        }}
        onCancel={() => {
          setShowToDatePicker(false);
        }}
      />
 
      <View style={styles.datePickerContainer}>
        <View style={styles.flexDatePicker}>
        <TouchableOpacity onPress={() => setShowFromDatePicker(true)} style={styles.btnDate}>
        <Icon name="today-outline" size={moderateScale(20)} color={'#2179A9'} />
          <Text style={styles.datePickerText}>
            {fromDate ? moment(fromDate).format('DD/MM/YYYY') : 'Ngày bắt đầu'}
          </Text>
        </TouchableOpacity>
        <Text>&nbsp;&nbsp;&nbsp;&nbsp;</Text>
        <TouchableOpacity onPress={() => setShowToDatePicker(true)} style={styles.btnDate}>
        <Icon name="today-outline" size={moderateScale(20)} color={'#2179A9'} />
          <Text style={styles.datePickerText}>
            {toDate ? moment(toDate).format('DD/MM/YYYY') : 'Ngày kết thúc'}
          </Text>
          
        </TouchableOpacity>
        <Button onPress={fetchConfirmList}>
          <Icon name="search-sharp" size={moderateScale(20)} color={'#2179A9'} />
        </Button>
        </View>
        
        <Button onPress={handleReloadData}>
          <Icon name="reload-outline" size={moderateScale(20)} color={'#2179A9'} />
        </Button>
      </View>
    </GestureHandlerRootView>
  );
};

export default ListConfirm;

const ViewTask: React.FC<ViewConfirmProps> = ({xacNhan, onDelete, refreshing, onRefresh, page, setPage, totalItems}) => {
  const navigation: any = useNavigation();

  const checkStatusIcon = (status: string) => {
    switch (status) {
      case 'Approved':
        return (
          <View style={[styles.statusWrapper, {backgroundColor: '#27b376'}]}>
            <Text style={styles.statusText}>Đã duyệt</Text>
          </View>
        );
      case 'Pending':
        return (
          <View style={[styles.statusWrapper, {backgroundColor: '#3366ff'}]}>
            <Text style={styles.statusText}>Chưa duyệt</Text>
          </View>
        );
      case 'Reject':
        return (
          <View style={[styles.statusWrapper, {backgroundColor: '#cc2a36'}]}>
            <Text style={styles.statusText}>Hủy duyệt</Text>
          </View>
        );
      default:
        return null;
    }
  };

  const renderRightActions = (id: string) => {
    return (
      <>
        <RectButton style={styles.deleteButton} onPress={() => onDelete(id)}>
        <Icon name="trash-outline" size={moderateScale(20)} color={'#fff'}/>
          <Text style={styles.textWhite}>Delete</Text>
        </RectButton>
        <RectButton style={styles.editButton} onPress={() => navigation.navigate(SCREENS.EDIT_XAC_NHAN.KEY, {item: xacNhan.find(x => x.id === id)})}>
          <Icon name="brush-outline" size={moderateScale(20)} color={'#fff'} />
          <Text style={styles.textWhite}>Edit</Text>
        </RectButton>
      </>
    );
  };

  return (
    <>
    <FlatList
      data={xacNhan}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <Swipeable
          renderRightActions={() =>
            item.status === 'Pending' ? renderRightActions(item.id) : null
          }>
          <TouchableOpacity
            style={styles.boxWrapper}
            onPress={() =>
              navigation.navigate(SCREENS.DETAIL_XAC_NHAN.KEY, {item: item})
            }>
            <View style={styles.itemWrapper}>
              <View style={styles.contentWrapper}>
                <Text style={styles.subText}>{item.content}</Text>
                <Text style={styles.mainText}>
                  Ngày tạo: {moment(item.createdAt).format('DD/MM/YYYY')}
                </Text>
                <View style={styles.textDate}>
                  <Text style={styles.mainText}>
                    Ngày xác nhận:
                    {moment(item.dateNeedConfirm).format('DD/MM/YYYY')}
                  </Text>
                  <Text
                    style={[
                      styles.fontSize,
                      {
                        color:
                          item.status === 'Pending'
                            ? '#3366ff'
                            : item.status === 'Approved'
                            ? '#27b376'
                            : '#cc2a36',
                      },
                    ]}>
                    {item.type}
                  </Text>
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

    {totalItems > 5 && (
      <Pagination 
        page={page}
        totalItems={totalItems}
        onPressNext={() => setPage(page + 1)}
        onPressPrev={() => setPage(page - 1)}
      />
    )}
    </>
  );
};

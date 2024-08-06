import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  Alert,
} from 'react-native';

import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/Ionicons';
import {moderateScale} from '../../../screens/size';
import {
  RectButton,
  Swipeable,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import moment from 'moment';
import ServiceTakeLeave from '../../../services/listWorks/serviceTakeLeave';
import {styles} from '../../../assets/css/ListWorksScreen/_listWork';
import {showMessage} from 'react-native-flash-message';
import { SCREENS } from '../../../constants/screens';
import AppHeader from '../../../components/navigators/AppHeader';

interface NghiPhep {
  id: string;
  content: string;
  handOverContent: string;
  handOverToUserId: string;
  approvedBy: string | null;
  approvedAt: string | null;
  typeApplication: string;
  status: string;
  createdByUserId: string;
  createdByUserName: string;
  createdByName: string;
  createdAt: string;
  leaveApplicationDetails: {
    leaveAt: string;
    timeType: number;
  }[]; 
}

interface ViewTakeLeaveProps {
  nghiPhep: NghiPhep[];
  onDelete: (id: string) => void;
  refreshing: boolean;
  onRefresh: () => void;
  onLoadMore: () => void;
  loadingMore: boolean;
  flatListRef: React.MutableRefObject<FlatList<any> | null>;
}

interface RouteDateParams {
  fromDate?: string;
  toDate?: string;
}

const ListTakeLeave: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<{params: RouteDateParams}, 'params'>>();

  const {fromDate: initialFromDate = '', toDate: initialToDate = ''} =
    route.params || {};

  const flatListRef = useRef<FlatList>(null);

  const [index, setIndex] = useState(0);
  const [listNghiPhep, setListNghiPhep] = useState<NghiPhep[]>([]);
  const [fromDate, setFromDate] = useState<Date | null>(
    initialFromDate ? moment(initialFromDate, 'DD/MM/YYYY').toDate() : null,
  );
  const [toDate, setToDate] = useState<Date | null>(
    initialToDate ? moment(initialToDate, 'DD/MM/YYYY').toDate() : null,
  );
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0)
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const routes = useMemo(
    () => [
      {key: 'all', title: 'Tất cả', icon: ''},
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
    ],
    [],
  );

  useEffect(() => {
    const fromDateValue = initialFromDate ? moment(initialFromDate, 'DD/MM/YYYY').toDate() : null;
    const toDateValue = initialToDate ? moment(initialToDate, 'DD/MM/YYYY').toDate() : null;

    setFromDate(fromDateValue);
    setToDate(toDateValue);
    fetchListTakeLeave(fromDateValue, toDateValue, 1);
  }, [initialFromDate, initialToDate]);

  const fetchListTakeLeave = async (
    fromDate: Date | null,
    toDate: Date | null,
    page: number,
  ) => {
    try {
      setLoading(page === 1);
      setLoadingMore(page > 1);
      const formattedFromDate = fromDate  ? moment(fromDate).format('DD/MM/YYYY') : '';
      const formattedToDate = toDate ? moment(toDate).format('DD/MM/YYYY') : '';

      const response: any = await ServiceTakeLeave.getListTakeLeave(
        formattedFromDate,
        formattedToDate,
        page,
        pageSize,
      );
      const sortedResponse = response.sort((a: NghiPhep, b: NghiPhep) => {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });
      if (page === 1) {
        setListNghiPhep(sortedResponse);
      } else {
        setListNghiPhep(prevState => [...prevState, ...sortedResponse]);
      }
      setPageNumber(page);
      setTotalItems(response.length === 0 ? 0 : response.length)
      setHasMore(response.length === pageSize); // Cập nhật hasMore
    } catch (error) {
      console.error('Error fetching listTakeLeave', error);
      if (page === 1) setListNghiPhep([]);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // Ham xoa item Nghi Phep

  const handleDelete = async (id: string) => {
    Alert.alert(
      'Xác nhận xóa',
      'Bạn có chắc chắn muốn xóa mục này',
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
              await ServiceTakeLeave.deleteTakeLeave(id);
              setListNghiPhep(prevState =>
                prevState.filter(item => item.id !== id),
              );
              showMessage({
                message: 'Success',
                description: 'Xóa đơn nghỉ phép thành công',
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

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchListTakeLeave(fromDate, toDate, 1);
    setRefreshing(false);
  }, [initialFromDate, initialToDate]);

  const handleReloadData = useCallback(async () => {
    // @ts-ignore
    navigation.setParams({ fromDate: '', toDate: '' });
    setFromDate(null);
    setToDate(null);
    await fetchListTakeLeave(null, null, 1);
  }, [navigation, fetchListTakeLeave]);


  const loadMoreData = useCallback(async () => {
    if (!loadingMore && hasMore) {
      setLoadingMore(true);
      await fetchListTakeLeave(fromDate, toDate, pageNumber + 1);
      setLoadingMore(false);
    }
  }, [loadingMore, hasMore, fromDate, toDate, pageNumber]);

  const renderScene = SceneMap({
    all: () => (
      <ViewTask
        nghiPhep={listNghiPhep}
        onDelete={handleDelete}
        refreshing={refreshing}
        onRefresh={onRefresh}
        onLoadMore={loadMoreData}
        loadingMore={loadingMore}
        flatListRef={flatListRef}
      />
    ),
    pending: () => (
      <ViewTask
        nghiPhep={listNghiPhep.filter(item => item.status === 'Pending')}
        onDelete={handleDelete}
        refreshing={refreshing}
        onRefresh={onRefresh}
        onLoadMore={loadMoreData}
        loadingMore={loadingMore}
        flatListRef={flatListRef}
      />
    ),
    approved: () => (
      <ViewTask
        nghiPhep={listNghiPhep.filter(item => item.status === 'Approved')}
        onDelete={handleDelete}
        refreshing={refreshing}
        onRefresh={onRefresh}
        onLoadMore={loadMoreData}
        loadingMore={loadingMore}
        flatListRef={flatListRef}
      />
    ),
    rejected: () => (
      <ViewTask
        nghiPhep={listNghiPhep.filter(item => item.status === 'Reject')}
        onDelete={handleDelete}
        refreshing={refreshing}
        onRefresh={onRefresh}
        onLoadMore={loadMoreData}
        loadingMore={loadingMore}
        flatListRef={flatListRef}
      />
    ),
  });


  return (
    <GestureHandlerRootView style={styles.container}>
      <AppHeader
        title="Danh sách đơn nghỉ phép"
        showButtonBack={true}
        backgroundColor="#fff"
        titleColor="#000"
        actions={
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={
                //@ts-ignore
                () => navigation.navigate(SCREENS.SEARCH_DON_NGHI_PHEP.KEY)
              }>
              <Icon
                name="search-outline"
                size={moderateScale(24)}
                color={'#2179A9'}
              />
            </TouchableOpacity>
            <Text>&nbsp;&nbsp;&nbsp;</Text>
            <TouchableOpacity onPress={handleReloadData}>
              <Icon
                name="reload-outline"
                size={moderateScale(24)}
                color={'#2179A9'}
              />
            </TouchableOpacity>
            <Text>&nbsp;&nbsp;&nbsp;</Text>
            <TouchableOpacity 
              //@ts-ignore
              onPress={() => navigation.navigate(SCREENS.TAO_DON_NGHI_PHEP.KEY)}>
              <Icon
                name="add-circle-outline"
                size={moderateScale(24)}
                color={'#2179A9'}
              />
            </TouchableOpacity>
          </View>
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
            style={{
              backgroundColor: '#fff',
              borderBottomColor: '#cecece',
              borderBottomWidth: 1,
            }}
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
      {loading && !refreshing ? (
        <View style={styles.spinnerContainer}>
          <ActivityIndicator size="large" color="#2179A9" />
        </View>
      ) : null}
    </GestureHandlerRootView>
  );
};

const ViewTask: React.FC<ViewTakeLeaveProps> = ({
  nghiPhep,
  onDelete,
  refreshing,
  onRefresh,
  onLoadMore,
  loadingMore,
  flatListRef
}) => {
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

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    const day = ('0' + date.getDate()).slice(-2); // Thêm số 0 phía trước nếu cần và lấy hai ký tự cuối
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const renderRightActions = (id: string) => {
    return (
      <RectButton style={styles.deleteButton} onPress={() => onDelete(id)}>
        <Icon name="trash-outline" size={moderateScale(20)} color={'#fff'} />
        <Text style={styles.textWhite}>Delete</Text>
      </RectButton>
    );
  };


  return (
    <FlatList
      ref={flatListRef}
      data={nghiPhep}
      renderItem={({item}) => (
        <Swipeable
          renderRightActions={() =>
            item.status === 'Pending' ? renderRightActions(item.id) : null
          }>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.boxWrapper}
            onPress={() => navigation.navigate(SCREENS.EDIT_NGHI_PHEP.KEY, { item: item })}>
            <View style={styles.boxContent}>
            <View style={styles.itemWrapper}>
              <View style={styles.contentWrapper}>
                <Text style={styles.subText}>{item.content}</Text>
                <Text style={styles.mainText}>
                  Ngày tạo: {moment(item.createdAt).format('DD/MM/YYYY')}
                </Text>
                
                <View style={styles.textDate}>
                  <Text style={styles.mainText}>
                    Tổng số ngày nghỉ: <Text style={styles.textSum}>{item.tongSoNgayNghi}</Text>
                  </Text>
                
                </View>
                <View style={styles.textDate}>
                  <Text style={styles.mainText}>
                    Ngày nghỉ phép:
                    {moment(item?.detail && item?.detail[0]?.leaveAt).format('DD/MM/YYYY')}
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
            </View>
         
          </TouchableOpacity>
        </Swipeable>
      )}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      maintainVisibleContentPosition={{ minIndexForVisible: 0 }}
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.5}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={15}
      ListFooterComponent={
        loadingMore ? 
        <View style={styles.flexDateBetween}>
        <Text style={styles.textDate}>Đang tải dữ liệu</Text>
        <ActivityIndicator size="small" color="#2179A9" />
      </View>
        : null
      }
    />
  );
};

export default ListTakeLeave;
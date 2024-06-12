import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  RefreshControl,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import {
  RectButton,
  Swipeable,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import { moderateScale } from '../../../screens/size';
import { showMessage } from 'react-native-flash-message';
import { SCREENS } from '../../../constants/screens';
import AppHeader from '../../navigators/AppHeader';
import moment from 'moment';
import ServiceConfirm from '../../../services/listWorks/serviceConfirm';
import { styles } from '../../../assets/css/ListWorksScreen/_listWork';

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
  onLoadMore: () => void;
  loadingMore: boolean;
  flatListRef: React.MutableRefObject<FlatList<any> | null>;
}

interface RouteParams {
  fromDate?: string;
  toDate?: string;
}

const ListConfirm: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<{ params: RouteParams }, 'params'>>();

  const { fromDate: initialFromDate = '', toDate: initialToDate = '' } = route.params || {};

  const flatListRef = useRef<FlatList>(null);

  const [index, setIndex] = useState(0);
  const [listXacNhan, setListXacNhan] = useState<XacNhan[]>([]);
  const [fromDate, setFromDate] = useState<Date | null>(initialFromDate ? moment(initialFromDate, 'DD/MM/YYYY').toDate() : null);
  const [toDate, setToDate] = useState<Date | null>(initialToDate ? moment(initialToDate, 'DD/MM/YYYY').toDate() : null);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(10);
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
    fetchConfirmList(fromDateValue, toDateValue, 1);
  }, [initialFromDate, initialToDate]);

  const fetchConfirmList = useCallback(async (fromDate: Date | null, toDate: Date | null, page: number) => {
    try {
      if (page === 1) setLoading(true);
      setLoadingMore(page > 1);

      const formattedFromDate = fromDate ? moment(fromDate).format('DD/MM/YYYY') : '';
      const formattedToDate = toDate ? moment(toDate).format('DD/MM/YYYY') : '';

      const response: any = await ServiceConfirm.getConfirmList(formattedFromDate, formattedToDate, page, pageSize);
      const sortedResponse = response.sort((a: XacNhan, b: XacNhan) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });

      if (page === 1) {
        setListXacNhan(sortedResponse);
      } else {
        setListXacNhan(prevState => [...prevState, ...sortedResponse]);
      }
      setPageNumber(page);
      setHasMore(response.length === pageSize);
    } catch (error) {
      console.error('Error fetching list confirm', error);
      if (page === 1) setListXacNhan([]);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [pageSize]);

  const handleDelete = useCallback(async (id: string) => {
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
              await ServiceConfirm.deleteConfirm(id);
              setListXacNhan(prevState => prevState.filter(item => item.id !== id));
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
      { cancelable: false },
    );
  }, []);


  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchConfirmList(fromDate, toDate, 1);
    setRefreshing(false);
  }, [fromDate, toDate, fetchConfirmList]);

  const handleReloadData = useCallback(async () => {
    // @ts-ignore
    navigation.setParams({ fromDate: '', toDate: '' });
    setFromDate(null);
    setToDate(null);
    await fetchConfirmList(null, null, 1);
  }, [navigation, fetchConfirmList]);

  const loadMoreData = useCallback(async () => {
    if (!loadingMore && hasMore) {
      setLoadingMore(true);
      await fetchConfirmList(fromDate, toDate, pageNumber + 1);
      setLoadingMore(false);
    }
  }, [loadingMore, hasMore, fromDate, toDate, pageNumber]);

  const renderScene = SceneMap({
    all: () => (
      <ViewTask
        xacNhan={listXacNhan}
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
        xacNhan={listXacNhan.filter((item) => item.status === 'Pending')}
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
        xacNhan={listXacNhan.filter((item) => item.status === 'Approved')}
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
        xacNhan={listXacNhan.filter((item) => item.status === 'Reject')}
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
        title="Xin xác nhận"
        showButtonBack={true}
        backgroundColor='#fff'
        titleColor='#000'
        actions={
          <View style={{ flexDirection: 'row' }}>
            <TouchableRipple
              rippleColor={'transparent'}
              onPress={
                 //@ts-ignore
                () => navigation.navigate(SCREENS.SEARCH_DON_XAC_NHAN.KEY)}>
              <Icon name="search-outline" size={moderateScale(24)} color={'#2179A9'} />
            </TouchableRipple>
            <Text>&nbsp;&nbsp;&nbsp;</Text>
            <TouchableRipple
              rippleColor={'transparent'}
              onPress={handleReloadData}>
              <Icon name="reload-outline" size={moderateScale(24)} color={'#2179A9'} />
            </TouchableRipple>
            <Text>&nbsp;&nbsp;&nbsp;</Text>
            <TouchableRipple
              rippleColor={'transparent'}
              onPress={() =>
                //@ts-ignore
                navigation.navigate(SCREENS.TAO_DON_XAC_NHAN.KEY)
              }>
              <Icon
                name="add-circle-outline"
                size={moderateScale(24)}
                color={'#2179A9'}
              />
            </TouchableRipple>
          </View>
        }
      />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get('window').width }}
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: '#2179A9' }}
            style={{ backgroundColor: '#ffffff', elevation: 0, borderBottomColor: '#cecece', borderBottomWidth: 1 }}
            labelStyle={{ color: 'black' }}
            renderLabel={({ route }) => (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon
                  name={route.icon}
                  size={moderateScale(10)}
                  color={route.color}
                />
                <Text style={{ color: 'black', marginLeft: moderateScale(5) }}>
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

const ViewTask: React.FC<ViewConfirmProps> = ({ xacNhan, onDelete, refreshing, onRefresh, onLoadMore, loadingMore, flatListRef }) => {
  const navigation: any = useNavigation();

  const checkStatusIcon = (status: string) => {
    switch (status) {
      case 'Approved':
        return (
          <View style={[styles.statusWrapper, { backgroundColor: '#27b376' }]}>
            <Text style={styles.statusText}>Đã duyệt</Text>
          </View>
        );
      case 'Pending':
        return (
          <View style={[styles.statusWrapper, { backgroundColor: '#3366ff' }]}>
            <Text style={styles.statusText}>Chưa duyệt</Text>
          </View>
        );
      case 'Reject':
        return (
          <View style={[styles.statusWrapper, { backgroundColor: '#cc2a36' }]}>
            <Text style={styles.statusText}>Hủy duyệt</Text>
          </View>
        );
      default:
        return null;
    }
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
      data={xacNhan}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <Swipeable
          renderRightActions={() =>
            item.status === 'Pending' ? renderRightActions(item.id) : null
          }>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.boxWrapper}
            onPress={() =>
              navigation.navigate(SCREENS.EDIT_XAC_NHAN.KEY, { item: item })
            }>
            <View style={styles.itemWrapper}>
              <View style={styles.contentWrapper}>
                <Text style={styles.subText}>{item.content}</Text>
                <Text style={styles.mainText}>
                  Ngày tạo: {moment(item.createdAt).format('DD/MM/YYYY')}
                </Text>
                <View style={styles.textDate}>
                  <Text style={styles.mainText}>
                    Ngày xác nhận: {moment(item.dateNeedConfirm).format('DD/MM/YYYY')}
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
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.5}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={15}
      maintainVisibleContentPosition={{ minIndexForVisible: 0 }}
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

export default ListConfirm;

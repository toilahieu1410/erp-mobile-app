import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"

import { View, Text, FlatList, Alert, Dimensions, TouchableOpacity } from "react-native"
import { ActivityIndicator, TouchableRipple } from 'react-native-paper';
import moment from "moment"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { ServiceWorkFromHome } from "../../../services/listWorks/serviceWorkFromHome"
import { showMessage } from "react-native-flash-message"
import Icon from 'react-native-vector-icons/Ionicons';
import { TabView, SceneMap, TabBar } from "react-native-tab-view"
import { RectButton, Swipeable, GestureHandlerRootView, RefreshControl } from "react-native-gesture-handler"
import { styles } from '../../../assets/css/ListWorksScreen/_listWork';
import AppHeader from "../../navigators/AppHeader"
import { moderateScale } from "../../../screens/size";

interface WorkFromHome {
  id: string,
  code: string,
  content: string,
  equipmentBorrow: string,
  startDate: string,
  endDate: string,
  createdByUserId: string,
  createdByUsername: string,
  createdByName: string,
  status: string,
  approvedBy: string | null,
  approvedAt: string | null,
  createdAt: string
}

interface ViewWorkFromHomeProps {
  workFromHome: WorkFromHome[]
  onDelete: (id: string) => void
  refreshing: boolean
  onRefresh: () => void
  onLoadMore: () => void
  loadingMore: boolean
  flatListRef: React.MutableRefObject<FlatList<any> | null>
}

interface RouteDateParams {
  fromDate: string,
  toDate: string
}


const ListWorkFromHome: React.FC = () => {
  const navigation = useNavigation()
  const route = useRoute<RouteProp<{params: RouteDateParams}, 'params'>>()

  const {fromDate: initialFromDate = '', toDate: initialToDate = ''} = route.params || {}

  const flatListRef = useRef<FlatList>(null)

  const [index, setIndex] = useState(0)
  const [listWorkFromHome, setListWorkFromHome] = useState<WorkFromHome[]>([])
  const [fromDate, setFromDate] = useState<Date | null>(initialFromDate ? moment(initialFromDate, 'DD/MM/YYYY').toDate() : null)
  const [toDate, setToDate] = useState<Date | null>(initialToDate ? moment(initialToDate, 'DD/MM/YYYY').toDate() : null)
  const [refreshing, setRefreshing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize] = useState(10)
  const [totalItems, setTotalItems] = useState(0)
  const [loadingMore, setLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const routes = useMemo(
    () => [
      {key: 'all', title: 'Tất cả', icon: ''},
      {key: 'pending', title: 'Chưa duyệt', icon: 'ellipse-sharp', color: '#3366ff'},
      {key: 'approved', title: 'Đã duyệt', icon: 'ellipse-sharp', color: '#27b376'},
      {key: 'rejected', title: 'Hủy duyệt', icon: 'ellipse-sharp', color: '#cc2a36'},
    ],
    []
  )

  useEffect(() => {
    const fromDateValue = initialFromDate ? moment(initialFromDate, 'DD/MM/YYYY').toDate() : null
    const toDateValue = initialToDate ? moment(initialToDate, 'DD/MM/YYYY').toDate() : null
    setFromDate(fromDateValue)
    setToDate(toDateValue)
    fetchListWorkFromHome(fromDateValue, toDateValue, 1);
  },[initialFromDate, initialToDate])

  const fetchListWorkFromHome = useCallback(async (fromDate: Date | null, toDate: Date | null, page: number) => {
    try {
      if (page === 1) setLoading(true)
      setLoadingMore(page > 1)

      const formattedFromDate = fromDate ? moment(fromDate).format('DD/MM/YYYY') : ''
      const formattedToDate = toDate ? moment(toDate).format('DD/MM/YYYY') : ''

      const response: any = await ServiceWorkFromHome.getListWorkFromHome(formattedFromDate, formattedToDate, page, pageSize)
      const sortedResponse = response.sort((a: WorkFromHome, b: WorkFromHome) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      })

      if(page === 1) {
        setListWorkFromHome(sortedResponse)
      } else {
        setListWorkFromHome(prevState => [...prevState, ...sortedResponse])
      }

      setPageNumber(page)
      setHasMore(response.length === pageSize);
    } catch (error) {
      console.error('Error fetching list confirm', error);
      if (page === 1) setListWorkFromHome([])
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }, [pageSize])

  const handleDelete = useCallback(async (id: string) => {
    Alert.alert(
      'Xác nhận xóa',
      'Bạn chắc chắn muốn xóa mục này',
      [
        {
          text: 'Hủy',
          onPress: () => console.log('Cancel'),
          style: 'cancel'
        }, 
        {
          text: 'Đồng ý',
          onPress: async () => {
            try {
              await ServiceWorkFromHome.deleteWorkFromHome(id)
              setListWorkFromHome(prevState => prevState.filter(item => item.id !== id))
              showMessage({
                message: 'Success',
                description: 'Xóa đơn xin làm việc tại nhà thành công',
                type: 'success',
              });
            } catch (error) {
              showMessage({
                message: 'Error',
                description: 'Xóa đơn thất bại',
                type: 'danger',
              });
            }
          }
        }
      ],
      { cancelable: false },
    )
  }, [])

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchListWorkFromHome(fromDate, toDate, 1)
    setRefreshing(false)
  }, [fromDate, toDate, fetchListWorkFromHome])

  const loadMoreData = useCallback(async () => {
    if (!loadingMore && hasMore) {
      setLoadingMore(true)
      await fetchListWorkFromHome(fromDate, toDate, pageNumber + 1)
      setLoadingMore(false)
    }
  }, [loadingMore, hasMore, fromDate, toDate, pageNumber])

  const renderScene = SceneMap({
    all: () => (
      <ViewTask
      workFromHome={listWorkFromHome}
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
      workFromHome={listWorkFromHome.filter((item) => item.status === 'Pending')}
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
      workFromHome={listWorkFromHome.filter((item) => item.status === 'Approved')}
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
      workFromHome={listWorkFromHome.filter((item) => item.status === 'Reject')}
      onDelete={handleDelete}
      refreshing={refreshing}
      onRefresh={onRefresh}
      onLoadMore={loadMoreData}
      loadingMore={loadingMore}
      flatListRef={flatListRef}
    />
    ),
  })

  return (
    <GestureHandlerRootView style={styles.container}>
      <AppHeader 
        title="Xin làm việc tại nhà"
        showButtonBack={true}
        backgroundColor="#fff"
        titleColor="#000"
        actions={
          <View style={{ flexDirection: 'row' }}>
          {/* <TouchableRipple
            rippleColor={'transparent'}
            onPress={
               //@ts-ignore
              () => navigation.navigate(SCREENS.SEARCH_DON_XAC_NHAN.KEY)}>
            <Icon name="search-outline" size={moderateScale(24)} color={'#2179A9'} />
          </TouchableRipple> */}
          <Text>&nbsp;&nbsp;&nbsp;</Text>
          {/* <TouchableRipple
            rippleColor={'transparent'}
            onPress={handleReloadData}>
            <Icon name="reload-outline" size={moderateScale(24)} color={'#2179A9'} />
          </TouchableRipple> */}
          {/* <Text>&nbsp;&nbsp;&nbsp;</Text> */}
          <TouchableRipple
            rippleColor={'transparent'}
            onPress={() =>
              //@ts-ignore
              navigation.navigate('')
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
          <ActivityIndicator size="small" color="#2179A9" />
        </View>
      ) : null}
    </GestureHandlerRootView>
  )
}

const ViewTask: React.FC<ViewWorkFromHomeProps> = ({
  workFromHome,
  onDelete,
  refreshing,
  onRefresh,
  onLoadMore,
  loadingMore,
  flatListRef,
}) => {
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
      data={workFromHome}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <Swipeable
          renderRightActions={() => 
            item.status === 'Pending' ? renderRightActions(item.id) : null
          }
        >
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.boxWrapper}
            
          >
            <View style={styles.itemWrapper}>
              <View style={styles.contentWrapper}>
                <Text style={styles.subText}>{item.content}</Text>
                <Text style={styles.mainText}>
                  Từ ngày: {moment(item.startDate).format('DD/MM/YYYY')}
                </Text>
                <Text style={styles.mainText}>
                  Đến ngày: {moment(item.endDate).format('DD/MM/YYYY')}
                </Text>
               
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
  )
}

export default ListWorkFromHome
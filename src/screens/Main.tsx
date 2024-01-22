import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {IMAGES} from '../../constans/images';
import {SCREENS} from '../../constans/screens';
import {Image, Text, View} from 'react-native';
import {COLORS} from '../../constans/colors';
import NotificationScreen from './navigators/NotificationScreen';
import HomeStack from './stack/HomeStack';
import AccountStack from './stack/AccountStack';
import TaskStack from './stack/TaskStack';

const Main = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName={SCREENS.HOMESTACK.KEY}
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}>
      <Tab.Screen
        name={SCREENS.HOMESTACK.KEY}
        component={HomeStack}
        options={{
          tabBarLabel: SCREENS.HOMESTACK.NAME,
          tabBarShowLabel: true,
          tabBarLabelStyle: {fontSize: 12},
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Image
              source={IMAGES.HOME}
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? COLORS.PRIMARY : COLORS.GRAY,
              }}
            />
          ),
          tabBarActiveTintColor: COLORS.PRIMARY,
          tabBarInactiveTintColor: COLORS.GRAY,
        }}
      />
      <Tab.Screen
        name={SCREENS.TASKSTACK.KEY}
        component={TaskStack}
        options={{
          headerShown: false,
          tabBarLabel: SCREENS.TASKSTACK.NAME,
          tabBarShowLabel: true,
          tabBarLabelStyle: {fontSize: 12},
          tabBarIcon: ({focused}) => (
            <Image
              source={IMAGES.TASK}
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? COLORS.PRIMARY : COLORS.GRAY,
              }}
            />
          ),
          tabBarActiveTintColor: COLORS.PRIMARY,
          tabBarInactiveTintColor: COLORS.GRAY,
        }}
      />
      <Tab.Screen
        name={SCREENS.NOTIFICATION.KEY}
        component={NotificationScreen}
        options={{
          headerShown: false,
          tabBarLabel: SCREENS.NOTIFICATION.NAME,
          tabBarShowLabel: true,
          tabBarLabelStyle: {fontSize: 12},
          tabBarIcon: ({focused}) => (
            <View className="relative">
              <Image
                source={IMAGES.NOTIFICATION}
                style={{
                  width: 30,
                  height: 30,
                  tintColor: focused ? COLORS.PRIMARY : COLORS.GRAY,
                }}
              />
              <Text
                className="absolute right-0 bg-red-500 rounded-full w-[18px] h-[18px] text-center text-xs font-bold text-white top-[1px] p-[1px]"
                style={{borderRadius: 999999}}>
                0
              </Text>
            </View>
          ),
          tabBarActiveTintColor: COLORS.PRIMARY,
          tabBarInactiveTintColor: COLORS.GRAY,
        }}
      />
      <Tab.Screen
        name={SCREENS.ACCOUNTSTACK.KEY}
        component={AccountStack}
        options={{
          headerShown: false,
          tabBarLabel: SCREENS.ACCOUNTSTACK.NAME,
          tabBarShowLabel: true,
          tabBarLabelStyle: {fontSize: 12},
          tabBarIcon: ({focused}) => (
            <Image
              source={IMAGES.USER}
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? COLORS.PRIMARY : COLORS.GRAY,
              }}
            />
          ),
          tabBarActiveTintColor: COLORS.PRIMARY,
          tabBarInactiveTintColor: COLORS.GRAY,
        }}
      />
    </Tab.Navigator>
  );
};

export default Main;

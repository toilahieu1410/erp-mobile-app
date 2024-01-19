import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './navigators/HomeScreen';
import Login from './login/LoginScreen';
import {IMAGES} from '../../constans/images';
import {SCREENS} from '../../constans/screens';
import {Image, StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../../constans/colors';
import WorkScreen from './navigators/WorkScreen';
import NotificationScreen from './navigators/NotificationScreen';
import ProfileScreen from './navigators/ProfileScreen';

const Main = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName={SCREENS.HOME.KEY}
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}>
      <Tab.Screen
        name={SCREENS.HOME.KEY}
        component={HomeScreen}
        options={{
          tabBarLabel: `${SCREENS.HOME.NAME}`,
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
        name={SCREENS.WORK.KEY}
        component={WorkScreen}
        options={{
          headerShown: false,
          tabBarLabel: `${SCREENS.WORK.NAME}`,
          tabBarShowLabel: true,
          tabBarLabelStyle: {fontSize: 12},
          tabBarIcon: ({focused}) => (
            <Image
              source={IMAGES.WORK}
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
          tabBarLabel: `${SCREENS.NOTIFICATION.NAME}`,
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
              <Text className="absolute right-0 bg-red-500 rounded-full w-4 h-4 text-center text-xs font-bold text-white top-[1px] p-[1px]">
                1
              </Text>
            </View>
          ),
          tabBarActiveTintColor: COLORS.PRIMARY,
          tabBarInactiveTintColor: COLORS.GRAY,
        }}
      />
      <Tab.Screen
        name={SCREENS.PROFILE.KEY}
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarLabel: `${SCREENS.PROFILE.NAME}`,
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

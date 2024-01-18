import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './home/HomeScreen';
import ProfileScreen from './profile';
import Login from './login/LoginScreen';
import {IMAGES} from '../../constans/images';
import {SCREENS} from '../../constans/screens';
import {Image} from 'react-native';
import {COLORS} from '../../constans/colors';

const Main = () => {
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName={SCREENS.HOME}>
        <Tab.Screen
          name={SCREENS.HOME}
          component={HomeScreen}
          options={{
            title: 'Trang chủ',
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
          name={SCREENS.PROFILE}
          component={ProfileScreen}
          options={{
            title: 'Profile',
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
    </NavigationContainer>
  );
};

export default Main;

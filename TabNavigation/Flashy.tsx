import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AnimatedTabBar, {
  TabsConfig,
  FlashyTabBarItemConfig,
} from '@gorhom/animated-tabbar';
import HomeSVG from './svg/HomeSVG';
import ReportSVG from './svg/ReportSVG';
import SearchSVG from './svg/SearchSVG';
import ProfileSVG from './svg/ProfileSVG';
import HomeScreen from "../screens/HomeScreen"
import ReportScreen from "../screens/ReportScreen"
import DoctorScreen from "../screens/DoctorScreen"
import ProfileScreen from "../screens/ProfileScreen"
const Tab = createBottomTabNavigator();

const tabs: TabsConfig<FlashyTabBarItemConfig> = {
  Home: {
    labelStyle: {
      color: '#fff',
    },
    icon: {
      component: HomeSVG,
      color: 'black',
    },
  },
  Report: {
    labelStyle: {
      color: '#fff',
    },
    icon: {
      component: ReportSVG,
      color: 'black',
    },
  },
  Search: {
    labelStyle: {
      color: '#fff',
    },
    icon: {
      component: SearchSVG,
      color: 'black',
    },
  },
  Profile: {
    labelStyle: {
      color: '#fff',
    },
    icon: {
      component: ProfileSVG,
      color: 'black',
    },
  },
};

const FlashyScreen = () => {
  return (
    <Tab.Navigator
    tabBarOptions={{
      style: {
        backgroundColor: '#7ec0ee',
        borderRadius:50,
        marginBottom:5,
        marginHorizontal:10
      },
    }}
      tabBar={props => (
        <AnimatedTabBar 
        preset="flashy" 
        tabs={tabs} 
        iconSize={25}
        itemOuterSpace={9}
        itemInnerSpace={9}
        {...props} />
      )}
    >
      <Tab.Screen
        name="Home"
        initialParams={{
          backgroundColor: tabs.Home.labelStyle.color,
          nextScreen: 'Report',
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        name="Report"
        initialParams={{
          backgroundColor: tabs.Report.labelStyle.color,
          nextScreen: 'Search',
        }}
        component={ReportScreen}
      />
      <Tab.Screen
        name="Search"
        initialParams={{
          backgroundColor: tabs.Search.labelStyle.color,
          nextScreen: 'Profile',
        }}
        component={DoctorScreen}
      />
      <Tab.Screen
        name="Profile"
        initialParams={{
          backgroundColor: tabs.Profile.labelStyle.color,
          nextScreen: 'Home',
        }}
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};

export default FlashyScreen;

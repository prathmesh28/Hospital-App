import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AnimatedTabBar, {
  TabsConfig,
  FlashyTabBarItemConfig,
} from '@gorhom/animated-tabbar';
import HomeSVG from './svg/HomeSVG';
import LikeSVG from './svg/LikeSVG';
import SearchSVG from './svg/SearchSVG';
import ProfileSVG from './svg/ProfileSVG';
import { MainTabsParams } from './types';
import HomeScreen from "../screens/HomeScreen"
import ReportScreen from "../screens/ReportScreen"
import DoctorScreen from "../screens/DoctorScreen"
import ProfileScreen from "../screens/ProfileScreen"
import Doctor from "../assets/doctor.svg"
const Tab = createBottomTabNavigator<MainTabsParams>();

const tabs: TabsConfig<FlashyTabBarItemConfig, MainTabsParams> = {
  Home: {
    labelStyle: {
      color: '#5B37B7',
    },
    icon: {
      component: HomeSVG,
      color: 'rgba(91,55,183,0.5)',
    },
  },
  Likes: {
    labelStyle: {
      color: '#C9379D',
    },
    icon: {
      component: LikeSVG,
      color: 'rgba(201,55,157,0.5)',
    },
  },
  Search: {
    labelStyle: {
      color: '#E6A919',
    },
    icon: {
      component: SearchSVG,
      color: 'rgba(230,169,25,0.5)',
    },
  },
  Profile: {
    labelStyle: {
      color: '#1194AA',
    },
    icon: {
      component: ProfileSVG,
      color: 'rgba(17,148,170,0.5)',
    },
  },
};

const FlashyScreen = () => {
  return (
    <Tab.Navigator
      tabBar={props => (
        <AnimatedTabBar preset="flashy" tabs={tabs} {...props} />
      )}
    >
      <Tab.Screen
        name="Home"
        initialParams={{
          backgroundColor: tabs.Home.labelStyle.color,
          nextScreen: 'Likes',
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        name="Likes"
        initialParams={{
          backgroundColor: tabs.Likes.labelStyle.color,
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

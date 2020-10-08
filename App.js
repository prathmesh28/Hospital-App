import React from "react"
import { createAppContainer, createSwitchNavigator } from "react-navigation"
import { createStackNavigator } from "react-navigation-stack"
import { createBottomTabNavigator } from "react-navigation-tabs"
// import { Asset } from 'expo-asset';
import { AppLoading } from 'expo';
import Ionicons from "react-native-vector-icons/Ionicons"
import Fontisto from 'react-native-vector-icons/Fontisto'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import LoadingScreen from "./screens/LoadingScreen"
import LoginScreen from "./screens/LoginScreen"
import HomeScreen from "./screens/HomeScreen"
import ReportScreen from "./screens/ReportScreen"
import DoctorScreen from "./screens/DoctorScreen"
import ProfileScreen from "./screens/ProfileScreen"
const AuthStack = createStackNavigator({
    Login: LoginScreen,
}) 

const AppTabNavigator = createBottomTabNavigator(
    {
        Home: {
            screen: HomeScreen,
            navigationOptions: {
              tabBarIcon: ({ tintColor }) => <Ionicons name="ios-home" size={30} color={tintColor} />
            }
        },
        Reports: {
            screen: ReportScreen,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => <FontAwesome name="history" size={30} color={tintColor} />
            }
        },
        Doctors: {
            screen: DoctorScreen,
            navigationOptions: {
             tabBarIcon: ({ tintColor }) => <Fontisto name="world" size={30} color={tintColor} />
            }
        },
        Profile: {
            screen: ProfileScreen,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => <Ionicons name="ios-person" size={30} color={tintColor} />
            }
        }
    },
    {
        tabBarOptions: {
          
            activeTintColor: "#0AC4BA",
            inactiveTintColor: "#8d9096",
            style:{height:60,paddingVertical:10}
            //showLabel: false,
            
        }
    }
)
const Container = createAppContainer(

    createSwitchNavigator(
        {
            Loading: LoadingScreen,
            Auth: AuthStack,
            App: AppTabNavigator
            
        },
        {
            initialRouteName: "Loading"
        }
    )
) 
class App extends React.Component {
    render() {
          return <Container/>
    }
  }
  
  export default App
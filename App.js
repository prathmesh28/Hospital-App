import React from "react"
import { createAppContainer, createSwitchNavigator } from "react-navigation"
import { createStackNavigator } from "react-navigation-stack"
import { View, Text, ActivityIndicator,StatusBar,Dimensions, StyleSheet } from "react-native"
import LoadingScreen from "./screens/LoadingScreen"
import LoginScreen from "./screens/LoginScreen/LoginScreen"
import PhoneAuth from "./screens/LoginScreen/PhoneAuth"
import WelcomeScreen from './screens/WelcomeScreen/WelcomeScreen'
import TabScreen from "./TabBar/App"
import Report from "./screens/ReportScreen/screens/Reports"
import Notification from "./screens/ProfileScreen/screens/Notification"
import Details from "./screens/HomeScreen/screens/Details"
import History from "./screens/HomeScreen/screens/History"

const AuthStack = createStackNavigator({
    Intro:WelcomeScreen,
    Login: LoginScreen,
    Phone:PhoneAuth
  },
  {
    header: null,
    headerMode: 'none'
}); 
const TabStack = createStackNavigator({
  Apptab:TabScreen,
  Details:Details,
  Report:Report,
  Notification:Notification,
  History:History
//  Appointment:Appointment
},
{
  header: null,
  headerMode: 'none'
}); 
const Container = createAppContainer(

    createSwitchNavigator(
        {
          
            Loading: LoadingScreen,
            Auth: AuthStack,
            App:TabStack
            // App:TabScreen,
            // Report:Report

            
        },
        {
            initialRouteName: "Loading"
        }
    )
 ) ;  
class App extends React.Component {
  _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
          isReady: false,
        };
      }
      async componentDidMount() {
        this._isMounted = true;
        if (this._isMounted) {
          this.setState({ isReady: true });
        }
      }
      componentWillUnmount() {
        this._isMounted = false;
      }
    render() {
        if (!this.state.isReady) {
            return <View><Text>Loading</Text></View>
          }
          return <Container/>
    }
  }
  
  export default App
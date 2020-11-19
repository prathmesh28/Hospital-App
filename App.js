import React from "react"
import { createAppContainer, createSwitchNavigator } from "react-navigation"
import { createStackNavigator } from "react-navigation-stack"
import { View, Text, ActivityIndicator,StatusBar,Dimensions, StyleSheet } from "react-native"
import LoadingScreen from "./screens/LoadingScreen"
import LoginScreen from "./screens/LoginScreen/LoginScreen"
import WelcomeScreen from './screens/WelcomeScreen/WelcomeScreen'
import TabScreen from "./TabBar/App"
import Report from "./screens/ReportScreen/screens/Reports"
import Notification from "./screens/ProfileScreen/screens/Notification"

const AuthStack = createStackNavigator({
    Intro:WelcomeScreen,
    Login: LoginScreen,
}) 
const TabStack = createStackNavigator({
  Apptab:TabScreen,
  Report:Report,
  Notification:Notification,
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
        // await Font.loadAsync({
        //   Roboto: require('native-base/Fonts/Roboto.ttf'),
        //   Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
        //   ...Ionicons.font,
        // });
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
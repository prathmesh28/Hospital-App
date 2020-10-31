/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useRef} from 'react';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Animated
} from 'react-native';

import TabBar from './TabBar';
import HomeScreen from '../screens/HomeScreen'
import ReportScreen from'../screens/ReportScreen'
import DoctorScreen from '../screens/DoctorScreen'
import ProfileScreen from '../screens/ProfileScreen'
const {width, height} = Dimensions.get("window");

import {SafeAreaView, SafeAreaProvider, initialWindowMetrics} from "react-native-safe-area-context";

const tabs = [
  {icon: "hospital"},
  {icon: "file-alt"},
  {icon: "medicinebox"},
  {icon: "user"}
]

const TabScreen = () => {

  const [activeIndex, setActiveIndex] = useState(0);
  const AnimationValue = useRef(new Animated.Value(0));

  function setCurrentIndex(i){
    console.log(i)
    setActiveIndex(i);
  }
  function ThisScreen() {
   
    
    
  }


  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
     
      <SafeAreaView edges={["left", "bottom", "right"]} style={{position: "relative", width}}>
      <View  style={{  backgroundColor: "#fff",   width, height: "100%"}} >
      
      {(() => {
                switch (activeIndex) {
                  case 0:
                    return <HomeScreen/>
                  case 1:
                    return <ReportScreen/>
                  case 2:
                    return <DoctorScreen/>
                  case 3:
                    return <ProfileScreen/>
                  default:
                    return console.log('default')
                  }




            })()}




       
       
        
        <View style={styles.container}>
          <TabBar AnimationValue={AnimationValue} onPressTab={setCurrentIndex} activeIndex={activeIndex} tabs={tabs} />
        </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
  //  height: "20%",
    marginBottom:0,
    bottom:0,
    backgroundColor:"#87CEEB",
   // backgroundColor:'#fff',
    //backgroundColor: "#ff0034",
    position: "absolute",
  }
});

export default TabScreen;

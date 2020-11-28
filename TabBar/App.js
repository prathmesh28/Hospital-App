import React, {useState, useRef, useEffect} from 'react';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ActivityIndicator,
  Animated
} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import TabBar from './TabBar';
import HomeScreen from '../screens/HomeScreen/HomeScreen'
import ReportScreen from'../screens/ReportScreen/ReportScreen'
import DoctorScreen from '../screens/DoctorScreen/DoctorScreen'
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen'
const {width, height} = Dimensions.get("window");

import {SafeAreaView, SafeAreaProvider, initialWindowMetrics} from "react-native-safe-area-context";

const tabs = [
  {icon: "home"},
  {icon: "profile"},
  {icon: "medicinebox"},
  {icon: "user"}
]

const TabScreen = () => {

  const [activeIndex, setActiveIndex] = useState(0);
  const AnimationValue = useRef(new Animated.Value(0));

  function setCurrentIndex(i){
    // console.log(i)
    setActiveIndex(i);
  }
  


  const [data, setData] = useState(null);
  const [doc, setDoc] = useState(null);
  const [loading, setLoading] = useState(true);

 
  useEffect(() => {

    const { uid } = auth().currentUser

    const onValueChange = database().ref('/Users/'+uid).on('value', async(snapshot) => {
          await setData(snapshot.val())
          setLoading(false) 
      });
    const onValueChangeDoc = database().ref('/Doctors/').on('value', async(snapshot) => {
        await setDoc(snapshot.val())
      //  setLoading(false) 
    });
    
    return () => {
      database().ref('/Users/'+uid).off('value', onValueChange)
      database().ref('/Doctors/').off('value', onValueChangeDoc)
    }

  }, []);




  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <StatusBar backgroundColor={'#87CEEB'} />
     
      <SafeAreaView edges={["left", "bottom", "right"]} style={{position: "relative", width}}>
      <View  style={{  
      //  backgroundColor: "#fff",   
        width, height: "100%"}} >
      
      {loading===true?<View style={styles.containerapp}>
                        <Text>Loading App...{'\n'}
                        </Text>
                        <Text style={{textAlign:"center"}}>
                      If app is not loading please check your internet connection or restart the app.</Text>
                    <ActivityIndicator size="large">
                      
                    </ActivityIndicator>
                </View>:(() => {
                switch (activeIndex) {
                  case 0:
                    return <HomeScreen data={data} />
                  case 1:
                    return <ReportScreen data={data} />
                  case 2:
                    return <DoctorScreen data={doc} />
                  case 3:
                    return <ProfileScreen data={data}/>
                  default:
                    return <HomeScreen data={data} />
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
    marginBottom:0,
    bottom:0,
    backgroundColor:"#45b3e0",
    position: "absolute",
  },
  containerapp: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf:"center",
    width:width,
    padding:20,
    backgroundColor:'#d3edf8'
}
});

export default TabScreen;

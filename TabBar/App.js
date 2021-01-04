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
import moment from "moment"
import _ from 'lodash'

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

  // function setCurrentIndex(i){
  //   // console.log(i)
  //   setActiveIndex(i);
  // }
  


  const [data, setData] = useState(null);
  const [doc, setDoc] = useState(null);
  const [appt, setAppt] = useState(null)
  const [tempappt, settempAppt] = useState(null)
  const [apptNow, setApptNow] = useState(null)
  const [today, setDate] = useState(new Date()); 
  
  const [loading, setLoading] = useState(true);
//   useEffect(() => {
    
//   return () => {
//     clearInterval(timer); // Return a funtion to clear the timer so that it will stop being called on unmount
//   }
// }, []);
 
  useEffect(() => {

    const { uid } = auth().currentUser


    const onValueChange = database().ref('/Users/'+uid).on('value', async(snapshot) => {
          await setData(snapshot.val())
          
      })
    const onValueChangeDoc = database().ref('/Doctors/').on('value', async(snapshot) => {
        await setDoc(snapshot.val())
      //  setLoading(false) 
    })

    const onAppt = database().ref('Appointments/').on('value', async (snapshot) => {
      const newcheck = _.map(snapshot.val(), (e) => {
        if(e.data.uid===uid)
          return e.data   
      })
      const allApptTemp = _.filter(newcheck)
     // _.filter(allApptTemp)
      const allAppt = _.sortBy(allApptTemp, [function(o) { return o.timeValue }]);
      setAppt(allAppt)

    //  await filterArray(allAppt)
     
   //   newcheck.sort((a, b) => a.timeValue.tostring().localeCompare(b.timeValue.tostring()));
      const liveAppt = await _.filter(allAppt, (e) => {
        if(e.done===false && e.status===true){
          return e
        }
         
      })
      setApptNow(liveAppt)
      
    //  setLoading(false) 
    })


    // const timer = setInterval((tempappt) => { 
    //   filterArray(tempappt)
    // }, 1000);
   
   
   
    
    
    return () => {
      database().ref('/Users/'+uid).off('value', onValueChange)
      database().ref('/Doctors/').off('value', onValueChangeDoc)
      database().ref('Appointments/').off('value', onAppt)
     // clearInterval(timer);
    }

  }, []);




  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <StatusBar backgroundColor={'#45b3e0'} />
     
      <SafeAreaView edges={["left", "bottom", "right"]} style={{position: "relative", width}}>
      <View  style={{  
      //  backgroundColor: "#fff",   
        width, height: "100%"}} >
      
      {(data===null && doc===null && appt===null && apptNow===null) ?<View style={styles.containerapp}>
      <ActivityIndicator size="large" color="#45b3e0" />

                        <Text>Loading App...{'\n'}
                        </Text>
                        <Text style={{textAlign:"center"}}>
                      If app is not loading please check your internet connection or restart the app.</Text>
                </View>:(() => {
                switch (activeIndex) {
                  case 0:
                    return <HomeScreen data={data} appt={apptNow}/>
                  case 1:
                    return <ReportScreen data={data} />
                  case 2:
                    return <DoctorScreen data={doc} userData={data} appt={appt}/>
                  case 3:
                    return <ProfileScreen data={data}/>
                  default:
                    return <HomeScreen data={data} appt={apptNow}/>
                  }



            })()}
       
       
        
        <View style={styles.container}>
          <TabBar AnimationValue={AnimationValue} onPressTab={(i)=>{setActiveIndex(i)}} activeIndex={activeIndex} tabs={tabs} />
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

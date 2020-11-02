import React, { Component } from "react"  
import Constants from 'expo-constants'

import {
  SafeAreaView,
  Dimensions,
  StatusBar,
  ActivityIndicator,
  AsyncStorage,
  TouchableOpacity,
  StyleSheet,
  View,
  FlatList,Image,ImageBackground
} from "react-native"  
import { Container, Header, Content, Card, CardItem, Body, Text,Left,Button} from 'native-base';
import MainSVG from '../TabBar/Main'

const { height, width } = Dimensions.get('screen')  
import Firebase from '../firebase'
import { style } from "d3";
import { withNavigation } from "react-navigation";
import GraduationSvg from "../assets/GraduationSvg"
import SpecialistSvg from "../assets/MedicalSpecialistSvg"
import SuitcaseSvg from "../assets/SuitcaseSvg"
import DoctordpSvg from "../assets/DoctordpSvg"
import DoctorFemaleSvg from "../assets/DoctorFemaleSvg";

var img=require('../assets/favicon.png');
const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Dr Harsh Desai',
    qualification:'MBBS' ,
    spicialist:'Pedistrician',
    place:'Vision Hospital',
    
    
    
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Dr Om Prakash',
    qualification:'BDS',
    spicialist:'Neurologist',
    place:'Vision Hospital',
    
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Dr shaikh Ansari',
    qualification:'BYNS',
    spicialist:'Heart Surgeon',
    place:'Vision Hospital',
    
   }
  
];
const image=0;
 class DoctorScreen extends Component {


  renderItem = ({item}) => {
    
    
    return( 

      <Card style={{padding:5,width:width*.85,alignSelf:"center",height:height*0.22,borderRadius:10}}>
            <CardItem >
              <Body>
              <CardItem>
             
                 <Image source={item.grnder===male?<DoctordpSvg/>:<DoctorFemaleSvg/>} style={{  
                        marginTop:-40,marginHorizontal:-20, 
                        height: height*0.08, width: width*0.22,
                        borderRadius: 40,resizeMode:"contain",alignSelf:'center'
                  }}/>
                        
                  <View style={{ width:width*.55}}>
                            <View style={{marginHorizontal:40,marginTop:-20}}>
                         
                                <Text style={{fontWeight:"bold",fontSize:18}}>

                                {item.title}{'\n'}
                                 </Text>
                      
                            <View style={{display:'flex',flexDirection:'row'}}>
                               <GraduationSvg />
                               <Text style={{fontSize:13,color:"grey"}}>
                                  {'\t'} {item.qualification}{'\n'}
                               </Text>
                            </View>

                            <View style={{display:'flex',flexDirection:'row'}}>
                              <SpecialistSvg/>
                              <Text style={{fontSize:13,color:"grey"}} >
                              {'\t'} {item.spicialist}{'\n'}
                              </Text>
                           </View>

                            <View style={{display:'flex',flexDirection:'row'}}>
                              <SuitcaseSvg/>
                              <Text style={{fontSize:13,color:"grey"}}>
                              {'\t'} {item.place}{'\n'}
                              </Text>
                            </View>
                    </View>
                      
                      
                      <View style={{width:width*0.85,}}>
                 
                        <TouchableOpacity style={{width:width*0.80,borderWidth:1,borderColor:"#87ceeb",height:35,marginHorizontal:-82,borderRadius:10,marginBottom:-25,backgroundColor:"#6DD5FA"}} 
                            onPress={()=>this.props.navigation.navigate("Appointment")}>

                            <Text style={{fontWeight:"bold",textAlign:"center",color:"black",marginTop:5}}>Appointment</Text> 

                         </TouchableOpacity>
                   </View>

                       

                 </View> 
                 
                 
                 

       </CardItem>

       </Body>

       </CardItem>

    </Card>
          
  )
}


  render() {
   
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={'#87CEEB'} />

      <MainSVG width={width} height={150}></MainSVG>
      
        <View style={{alignItems:"center",width:width*0.5,elevation:7,
              backgroundColor:"#87CEEB",textAlign:"center",alignSelf:"center",
              borderRadius:10,justifyContent:"center",alignContent:"center",alignItems:"center",
              height:30,margin:5}}>
          <Text style={{fontWeight:"bold",fontSize:18}}>
            Book Appointment
          </Text>
        </View>
                  
             
                <FlatList
                  data={DATA}
                  renderItem={this.renderItem}
                  keyExtractor={item => item.id}
                />
              </View>
    )  
  }
}

export default withNavigation(DoctorScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fff'

  
  },

})  
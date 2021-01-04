import React, { Component } from "react"

import {
  SafeAreaView,
  Dimensions,
  StatusBar,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  View,
  FlatList, Image, ImageBackground
} from "react-native"
import { Container, Header, Content, Card, CardItem, Body, Text, Left, Button } from 'native-base';
import MainSVG from '../../TabBar/Main'
import _ from 'lodash';
const { height, width } = Dimensions.get('screen')
import { withNavigation } from "react-navigation";
import GraduationSvg from "./assets/GraduationSvg"
import SpecialistSvg from "./assets/MedicalSpecialistSvg"
import SuitcaseSvg from "./assets/SuitcaseSvg"
import DoctordpSvg from "./assets/DoctordpSvg"
import DoctorFemaleSvg from "./assets/DoctorFemaleSvg";
import IoniconsIcon from 'react-native-vector-icons/Ionicons';

import AllAppt from './screens/AllAppt'


class DoctorScreen extends Component {
  _isMounted = false;
  state = {
    data: null,
    screen:false
  }
  componentDidMount() {
    // this.setState({ data:this.props.data })
   // console.log(this.props.appt)
    this._isMounted = true;
    const doctors = _.map(this.props.data, (e) => {
      return e.data
    })
    // console.log(doctors)
    if (this._isMounted) {
    this.setState({ data: doctors })
    }
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  renderItem = ({ item }) => {


    return (

      <Card style={{
        padding: 5, width: width * .85, alignSelf: "center", borderRadius: 10
      }}>
        <Body>

          <CardItem>
            <View>

           

            <View style={{
              display: 'flex', flexDirection: 'row',justifyContent:'space-between'
            }}>
              <View style={{
                width: width * 0.2,
                marginRight:10
              }}
              >
                {item.gender === "male" ? <DoctordpSvg width={70} height={70} /> : <DoctorFemaleSvg width={70} height={70} />}
              </View>

              <View style={{
                width: width * .50,
                display:'flex',flexDirection:'column',
                justifyContent:'space-evenly'
              }}>


                <Text style={{ fontWeight: "bold", fontSize: 18 }}>

                  {item.name}
                </Text>

                <View style={{ display: 'flex', flexDirection: 'row',marginVertical:3 }}>
                  <GraduationSvg />
                  <Text style={{ fontSize: 13, color: "grey" }}>
                    {'\t'} {item.qualification}
                  </Text>
                </View>

                <View style={{ display: 'flex', flexDirection: 'row',marginVertical:3 }}>
                  <SpecialistSvg />
                  <Text style={{ fontSize: 13, color: "grey" }} >
                    {'\t'} {item.specialization}
                  </Text>
                </View>

                <View style={{ display: 'flex', flexDirection: 'row',marginVertical:3 }}>
                <IoniconsIcon style={{ fontSize: 23,color:'grey' }} name="time-outline" />
                  <Text style={{ fontSize: 13, color: "grey" }}>
                    &nbsp; {item.MorworkFrom} - {item.MorworkTo} 
                    {'\n'}
                    &nbsp; {item.EvnworkFrom} - {item.EvnworkTo}
                  </Text>
                </View>
                
                
        

              </View>
             
              
              
            </View>


         {item.Available===true?
         <Button rounded block info
         style={{width:width*0.5,alignSelf:'center',marginTop:10,height:33}}
    
         onPress={() => this.props.navigation.navigate('Appointment',{data:item,userData:this.props.userData, onGoBack: () => {
          this.setState({screen:true})
      }}
         )}>
         <Text>Book Appointment</Text>
       
       </Button>:<Text style={{fontStyle:'italic',paddingHorizontal:30}}>Doctor not available for appointments.</Text>}
                
            
</View>
          </CardItem>

        </Body>



      </Card>

    )
  }


  displayScreen=(data)=>{
    return(
      <SafeAreaView style={{flex: 1,paddingBottom:60,marginTop:30}}>
              <FlatList
              
                data={data}
                renderItem={this.renderItem}
                keyExtractor={item => item.id}
                ListHeaderComponent={this.renderHeader}
              />
            </SafeAreaView>
    )
  }

  renderHeader = () => {
    return <View style={{height:100}}>

    </View>
  };

  render() {
    const data = this.state.data
    
    return (
      <View style={styles.container}>
       
        <StatusBar backgroundColor={'#45b3e0'} />
             {
              this.state.screen?<AllAppt appointments={this.props.appt}/>:this.displayScreen(data)
            }

            <View style={{ backgroundColor: '#45b3e0', height: 50,position:"absolute" }}>
              <MainSVG width={width*1.01} height={150}></MainSVG>
              <Text style={{fontSize:25,position:"absolute",marginLeft:20,top:20,color:'#171717',fontWeight:'400'}}>
                    { this.state.screen?'Appointments':'Doctors'}
              </Text>
              <TouchableOpacity onPress={()=>this.setState({screen:!this.state.screen})}
                  style={{position:"absolute",top:10,right:5, elevation:7, backgroundColor: '#87CEEB',borderRadius:50,marginRight:5}}>
              <Text style={{fontSize:16,color:'#000',fontWeight:'400',margin:8}}>
              { this.state.screen?'Doctors':'Appointments'}
              </Text>
              </TouchableOpacity>
            
            </View>

      </View>
    )
  }
}

export default withNavigation(DoctorScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,

    //flexDirection:"row",
    backgroundColor:'#d3edf8'


  },
  // doctors: {
  //   bottom:60,
  // //  height:height*0.8
  // }



})  
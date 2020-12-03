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



class DoctorScreen extends Component {
  _isMounted = false;
  state = {
    data: null
  }
  componentDidMount() {
    // this.setState({ data:this.props.data })
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
            <View style={{
              display: 'flex', flexDirection: 'row'
            }}>
              <View style={{
                width: width * 0.2,
              }}
              >
                {item.gender === "male" ? <DoctordpSvg width={70} height={70} /> : <DoctorFemaleSvg width={70} height={70} />}
              </View>

              <View style={{
                width: width * .55,
                // display:'flex',flexDirection:'column'
              }}>


                <Text style={{ fontWeight: "bold", fontSize: 18 }}>

                  {item.name}{'\n'}
                </Text>

                <View style={{ display: 'flex', flexDirection: 'row' }}>
                  <GraduationSvg />
                  <Text style={{ fontSize: 13, color: "grey" }}>
                    {'\t'} {item.qualification}{'\n'}
                  </Text>
                </View>

                <View style={{ display: 'flex', flexDirection: 'row' }}>
                  <SpecialistSvg />
                  <Text style={{ fontSize: 13, color: "grey" }} >
                    {'\t'} {item.specialization}{'\n'}
                  </Text>
                </View>

                <View style={{ display: 'flex', flexDirection: 'row' }}>
                  <SuitcaseSvg />
                  <Text style={{ fontSize: 13, color: "grey" }}>
                    {'\t'} {item.registered}{'\n'}
                  </Text>
                </View>
                
                <View style={{height:30,marginHorizontal:-75,width:width*0.75}}>
              <Button rounded block info
               onPress={() => this.props.navigation.navigate('Appointment')}>
            <Text>Appointment</Text>
            
          </Button>
              </View>
        

              </View>
              
              
            </View>


          </CardItem>

        </Body>



      </Card>

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
            <SafeAreaView style={{flex: 1,paddingBottom:60,marginTop:30}}>
              <FlatList
              
                data={data}
                renderItem={this.renderItem}
                keyExtractor={item => item.id}
                ListHeaderComponent={this.renderHeader}
              />
            </SafeAreaView>
            <View style={{ backgroundColor: '#45b3e0', height: 50,position:"absolute" }}>
              <MainSVG width={width} height={150}></MainSVG>
              <Text style={{fontSize:25,position:"absolute",marginLeft:20,top:20,color:'#171717',fontWeight:'400'}}>
                  Doctors
              </Text>
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
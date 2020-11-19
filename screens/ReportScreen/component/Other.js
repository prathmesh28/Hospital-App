import React, { Component } from "react"  

import {
  SafeAreaView,
  Dimensions,
  StatusBar,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  
  View,
  ImageBackground,
  Linking

} from "react-native"  
import { withNavigation } from 'react-navigation';
import { Container, Header, Content, Card, CardItem, Text, Body,Title,Button,Right,Icon,Accordion } from 'native-base';
import _ from 'lodash';

const { height, width } = Dimensions.get('screen')  

class ReportScreen extends Component {
  _isMounted = false;
  state = {
    historyData:null
  }
  async componentDidMount (){
      //  console.log(this.props.data.data.history)
      this._isMounted = true;
       const checkData  = await _.map( this.props.data.data.history, (e) => {
        
       return e.sethistory
     
      })
      checkData.splice(0,1)
      if (this._isMounted) {
        this.setState({historyData:checkData})
      }
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  openReport=async(url)=>{
   
        const supported = await Linking.canOpenURL(url);
    
        if (supported) {
          // Opening the link with some app, if the URL scheme is "http" the web link should be opened
          // by some browser in the mobile
          await Linking.openURL(url);
        } else {
          Alert.alert(`Don't know how to open this URL: ${url}`);
        }
    
    
  
  }



   _renderHeader(item, expanded) {
    return (
      <View style={{
        flexDirection: "row",
        padding: 15,
        justifyContent: "space-between",
        alignItems: "center" ,
        backgroundColor: "#87CEEB" }}>
      <Text style={{ fontWeight: "bold" }}>
          {" "}{item.Date.toLocaleString().substr(0, 10)}
        </Text>
        {expanded
          ? <Icon style={{ fontSize: 18 }} name="remove-circle" />
          : <Icon style={{ fontSize: 18 }} name="add-circle" />}
      </View>
    );
  }
  _renderContent(item) {
    return (
      <View style={{padding:10}}>

      
        <View>
          <Text >
            <Text style={{fontWeight:'bold'}}>
            Remarks: &nbsp;
            </Text>
            {item.Remark}
            </Text>

        </View>

        <View style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          backgroundColor:'#fff',height:'auto'
        }}>

          <View style={{ height: 70,justifyContent:"center",backgroundColor:'#fff'}}>
            <Button small style={{backgroundColor:'#45b3e0'}}
              onPress={()=>{this.openReport(item.reportAvatarURL)}}
              >
            <Text>Report</Text>

            </Button>
          </View>
          <View style={{height: 70 ,justifyContent:"center", backgroundColor:'#fff'}} >
          <Button small style={{backgroundColor:'#45b3e0'}}  onPress={()=>{this.openReport(item.PrescriptionAvatarURL)}}>
            <Text>Prescription</Text>
            </Button>
          </View>
        </View>
      
      </View>
   

    );
  }


  render() {
    if(this.props.data.data.history){
  const date = this.props.data.data.history[Object.keys(this.props.data.data.history)[0]].sethistory.Date.toLocaleString().substr(0, 10)
  const Remark = this.props.data.data.history[Object.keys(this.props.data.data.history)[0]].sethistory.Remark
  const report = this.props.data.data.history[Object.keys(this.props.data.data.history)[0]].sethistory.reportAvatarURL
  const Prescription = this.props.data.data.history[Object.keys(this.props.data.data.history)[0]].sethistory.PrescriptionAvatarURL
  
    return (
    <View style={styles.container}>

   

        <Card style={{width:width*0.85,alignSelf:"center",borderTopLeftRadius:20,borderTopRightRadius:20}}>
            <CardItem header style={{borderTopStartRadius:20,borderTopEndRadius:20,backgroundColor:'#45b3e0'}}>
              <Title>Checkup Details</Title>
            </CardItem>
          
                <>
                  <CardItem>
                
              <Body>
                <Text style={{fontWeight:'700'}}>
                    
                 
                  Your last checkup was on {date}
                </Text>
               
                <Text >
                    <Text style={{fontWeight:'bold'}}>
                    Remarks: &nbsp;
                    </Text>
                 
                
                   {Remark}
                  
                </Text>
                </Body>
                </CardItem>
                <CardItem>
                  <Body style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    backgroundColor:'#fff',height:'auto'
                    
                  }}>

                  <View style={{ height: 50,justifyContent:"center",backgroundColor:'#fff'}}>
                    <Button style={{backgroundColor:'#45b3e0'}}
                       onPress={()=>{this.openReport(report)}}
                       >
                    <Text>Report</Text>

                    </Button>
                  </View>
                  <View style={{height: 50 ,justifyContent:"center", backgroundColor:'#fff'}} >
                  <Button style={{backgroundColor:'#45b3e0'}}  onPress={()=>{this.openReport(Prescription)}}>
                    <Text>Prescription</Text>
                    </Button>
                  </View>






              </Body> 
              </CardItem>
              <CardItem  
                  >
            
              <Accordion
              dataArray={this.state.historyData}
                renderHeader={this._renderHeader}
                renderContent={this._renderContent}
                headerStyle={{ backgroundColor: "#b7daf8" }}
                contentStyle={{ backgroundColor: "#ddecf8" }}
                icon="arrow-forward"
                expandedIcon="remove"
                iconStyle={{ color: "green" }}
                expandedIconStyle={{ color: "red" }}
              />



            </CardItem>
              </>
           
            
         </Card>
   </View>
    ) 
  } else{
    return (
          <Card style={{width:width*0.85,alignSelf:"center",borderTopLeftRadius:20,borderTopRightRadius:20}}>
            <CardItem header style={{borderTopStartRadius:20,borderTopEndRadius:20,backgroundColor:'#45b3e0'}}>
              <Title>Checkup Details</Title>
            </CardItem>
            <CardItem>
                
              <Body>
                <Text style={{fontWeight:'700'}}>
                    
                 
                  No data to display ;)
                </Text>
                </Body>
                </CardItem>
            </Card>
    )
  }
  }

  
}
export default withNavigation(ReportScreen);
const styles = StyleSheet.create({
  container: {
  
   // flex: 1,
  
  },

 
})  
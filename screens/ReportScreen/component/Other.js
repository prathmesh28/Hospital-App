import React, { Component } from "react"  

import {
  SafeAreaView,
  Dimensions,
  StatusBar,
  ActivityIndicator,
  AsyncStorage,
  TouchableOpacity,
  StyleSheet,
  Button,
  View,
  ImageBackground
} from "react-native"  
import { withNavigation } from 'react-navigation';
import { Container, Header, Content, Card, CardItem, Text, Body,Title } from 'native-base';
import RNUrlPreview from 'react-native-url-preview';

const { height, width } = Dimensions.get('screen')  

class ReportScreen extends Component {

  componentDidMount(){
    //   console.log(this.props.data)
  }
  render() {
  //  this.props.data.data.history
  const date = this.props.data.data.history[Object.keys(this.props.data.data.history)[0]].sethistory.Date.toLocaleString().substr(0, 9)
  const Remark = this.props.data.data.history[Object.keys(this.props.data.data.history)[0]].sethistory.Remark
  const report = this.props.data.data.history[Object.keys(this.props.data.data.history)[0]].sethistory.reportAvatarURL

    return (
    <View style={styles.container}>

   

        <Card style={{width:width*0.85,alignSelf:"center",borderRadius:20}}>
            <CardItem header style={{borderTopStartRadius:20,borderTopEndRadius:20,backgroundColor:'#45b3e0'}}>
              <Title>Checkup Details</Title>
            </CardItem>
            <CardItem>
                {this.props.data.data.history?
                
                
              <Body>
                <Text style={{fontWeight:'700'}}>
                    
                   { console.log( Remark )}
                  Your last checkup was on {date}
                </Text>
               
                <Text >
                    <Text style={{fontWeight:'bold'}}>
                    Remarks: &nbsp;
                    </Text>
                 
                
                   {Remark}
                  
                </Text>
                <View style={{display:"flex",flexDirection:'row',justifyContent:'space-evenly',}}>

                    <View>
                    <Text>
                       { console.log(report)}
                    <RNUrlPreview
                            text={report} 
                        titleStyle={styles.linktitle}
                            titleNumberOfLines={3}
                        containerStyle={styles.linkcontainer}
                        imageStyle={styles.linkimage}
                        descriptionStyle={styles.discript}
                        descriptionNumberOfLines={4}
                        />
                    </Text>
                    </View>
                   <View>
                   <Text>
                    prescription
                    </Text>
                   </View>
                </View>
              </Body>:
              <Body>
              <Text>
                  NO data to display ;)
              </Text>
          </Body>}
            </CardItem>
            {/* <CardItem footer style={{borderBottomStartRadius:20,borderBottomEndRadius:20,borderColor:'#87CEEB',backgroundColor:'#87CEEB',borderWidth:1}}>
              <Text>View All &gt; </Text>
            </CardItem> */}
         </Card>
   </View>
    )  
  }

  
}
export default withNavigation(ReportScreen);
const styles = StyleSheet.create({
  container: {
  
   // flex: 1,
  
  },
  linktitle: {
    //  textAlign:"center",
      fontWeight: "bold",
      fontSize:17
    },
    linkcontainer: {
     // fontSize:15,
      backgroundColor: "transparent",
    },
    linkimage: {
      display: "none",
    },
    discript: {
      
      
      padding:1
      //dont remove
    },
 
})  
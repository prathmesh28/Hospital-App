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
const { height, width } = Dimensions.get('screen')  

class ReportScreen extends Component {

  componentDidMount(){
      console.log(this.props.data)
  }
  render() {
   
    return (
    <View style={styles.container}>

   

        <Card style={{width:width*0.85,alignSelf:"center",borderRadius:20}}>
            <CardItem header style={{borderTopStartRadius:20,borderTopEndRadius:20,backgroundColor:'#879ceb'}}>
              <Title>Checkup Details</Title>
            </CardItem>
            <CardItem>
              <Body>
                <Text>
                  Your last checkup was on 12/12/12
                </Text>
                <Text>
                  remarks:
                </Text>
                <View style={{display:"flex",flexDirection:'row',justifyContent:'space-evenly',}}>

                    <View>
                    <Text>
                    report
                    </Text>
                    </View>
                   <View>
                   <Text>
                    prescription
                    </Text>
                   </View>
                </View>
              </Body>
            </CardItem>
            <CardItem footer style={{borderBottomStartRadius:20,borderBottomEndRadius:20,borderColor:'#87CEEB',backgroundColor:'#87CEEB',borderWidth:1}}>
              <Text>View All &gt; </Text>
            </CardItem>
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
 
})  
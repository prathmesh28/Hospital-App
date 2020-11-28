import React, { Component } from "react"  

import {
  SafeAreaView,
  Dimensions,
  StatusBar,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  View,
  ImageBackground,
  Linking

} from "react-native"  
import { withNavigation } from 'react-navigation';
import { Container, Header, Content, Card, CardItem, Text, Body,Title,Button,Right,Icon,Accordion } from 'native-base';
import _ from 'lodash';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";


const { height, width } = Dimensions.get('screen')  

class Peadiatric extends Component {

  state = {
    historyData:null
  }
  async componentDidMount (){
      //  console.log(this.props.data.data.history)
    
       const checkData  = await _.map( this.props.data.data.history, (e) => {
        
       return e.sethistory
     
      })
      checkData.splice(0,1)
     // this.setState({historyData:checkData})
  }

  





  render() {
  // const date = this.props.data.data.history[Object.keys(this.props.data.data.history)[0]].sethistory.Date.toLocaleString().substr(0, 9)
  // const Remark = this.props.data.data.history[Object.keys(this.props.data.data.history)[0]].sethistory.Remark
  // const report = this.props.data.data.history[Object.keys(this.props.data.data.history)[0]].sethistory.reportAvatarURL
  // const Prescription = this.props.data.data.history[Object.keys(this.props.data.data.history)[0]].sethistory.PrescriptionAvatarURL
    return (
    <View style={styles.container}>



<ScrollView
  horizontal={true}
  style={{paddingHorizontal:10}}
  >
<LineChart
    data={{
      labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "Octomber", "November", "December"],
      datasets: [
        {
          data: [
            2,
            3,
            5,
            7,
            9,
            10,
            12,
            14,
            16,
            17,
            18,
            20
          ],
          strokeWidth: 2
        }
      ]
    }}
    width={800} // from react-native
    height={220}
  //  yAxisLabel="$"
    yAxisSuffix="kg"
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      backgroundColor: "#45b3e0",
      backgroundGradientFrom: "#45b3e0",
      backgroundGradientTo: "#d3edf8",
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16,
        padding:5
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  />

</ScrollView>
   </View>
    )  
  }

  
}
export default withNavigation(Peadiatric);
const styles = StyleSheet.create({
  container: {
  
   // flex: 1,
  
  },

 
})  
 
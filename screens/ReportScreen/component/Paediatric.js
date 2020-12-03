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
// const {height,width}= Dimensions.get('screen')
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

const data = {
  labels: ["January", "February", "March", "April", "May", 
  // "June", "july", "august", "saptember", "oct", "Nov"
],
  datasets: [
    {
      data: [ 2,
        3,
        5,
        7,
        9,],
      color: (opacity = 1) => `#5A71E2`, // optional
      strokeWidth: 2 // optional
    }
  ],
  legend: ["Weight"] // optional
};
const data1 = {
  labels: ["January", "February", "March", "April", "May", 
  // "June", "july", "august", "saptember", "oct", "Nov"
],
  datasets: [
    {
      data: [10,
        15,
        20,
        25,
        30,],
      color: (opacity = 1) => `#5A71E2`, // optional
      strokeWidth: 2 // optional
    }
  ],
  
  legend: ["Height"] // optional
};

const chartConfig = {
  backgroundColor: "#45b3e0",
  backgroundGradientFrom: "#45b3e0",

  backgroundGradientTo: "#d3edf8",
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
  
};

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

<ScrollView >
    
    <ScrollView
      horizontal={true}
      style={{ paddingHorizontal: 10 }}
      
    >
      <Card style={{borderRadius:15,backgroundColor:'#45b3e0'}}>
        <CardItem style={{borderRadius:15,backgroundColor:'transparent'}}>
        <Text style={{fontSize:18,fontWeight:'800',color:'#fff'}}>Weight</Text>
        </CardItem>
      <LineChart
        data={data}
        width={Dimensions.get("window").width-20}
        height={180}
        yAxisSuffix=" kg"
        chartConfig={chartConfig}
        style={{borderRadius:15}}
        bezier
      />
      </Card>
      
    </ScrollView>
    
    <ScrollView
      horizontal={true}
      style={{ paddingHorizontal: 10 }}
      
    >
        <Card style={{borderRadius:15,backgroundColor:'#45b3e0'}}>
        <CardItem style={{borderRadius:15,backgroundColor:'transparent'}}>
        <Text style={{fontSize:18,fontWeight:'800',color:'#fff'}}>height</Text>
        </CardItem>
      <LineChart
      
        data={data1}
        width={Dimensions.get("window").width-20}
        height={200}
        yAxisSuffix=" in"
      //  horizontalLabelRotation={30}
        // verticalLabelRotation={30}
        chartConfig={chartConfig}
        bezier
        style={{borderRadius:15}}
      />
     
      </Card>
    </ScrollView>
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
 
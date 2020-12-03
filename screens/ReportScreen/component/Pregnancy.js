import React, { Component } from "react"

import {
  Text,
  SafeAreaView,

  StatusBar,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  Button,
  View,
  ScrollView,
  ImageBackground
} from "react-native"
import { Container, Header, Content, Card, CardItem, Body, Left, Row, Right, Fab, Icon } from 'native-base';

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import { withNavigation } from 'react-navigation';
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;
// const { height, width } = Dimensions.get('screen')  
const data = {
  labels: ["January", "February", "March", "April", "May", 
  // "June", "july", "august", "saptember", "oct", "Nov"
],
  datasets: [
    {
      data: [20, 45, 28, 80, 99],
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
      data: [20, 45, 28, 80, 99],
      color: (opacity = 1) => `#5A71E2`, // optional
      strokeWidth: 2 // optional
    }
  ],
  
  legend: ["BP"] // optional
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

export default class Pregnancy extends Component {

  componentDidMount() {
  }
  render() {

    return (
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
            <Text style={{fontSize:18,fontWeight:'800',color:'#fff'}}>Blood Pressure</Text>
            </CardItem>
          <LineChart
          
            data={data1}
            width={Dimensions.get("window").width-20}
            height={200}
            yAxisSuffix="Hg"
          //  horizontalLabelRotation={30}
            // verticalLabelRotation={30}
            chartConfig={chartConfig}
            bezier
            style={{borderRadius:15}}
          />
         
          </Card>
        </ScrollView>
      </ScrollView>
    )
  }


}
const styles = StyleSheet.create({
  container: {
  
    //flex: 1,

  },

})  
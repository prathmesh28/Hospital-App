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
  labels: ["January", "February", "March", "April", "May", "June", "july", "august", "saptember", "oct", "Nov"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
      strokeWidth: 2 // optional
    }
  ],
  legend: ["Weight"] // optional
};
const data1 = {
  labels: ["January", "February", "March", "April", "May", "June", "july", "august", "saptember", "oct", "Nov"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
      strokeWidth: 2 // optional
    }
  ],
  legend: ["BP"] // optional
};

const chartConfig = {
  backgroundColor: "#45b3e0",
  backgroundGradientFrom: "#45b3e0",

  backgroundGradientTo: "#d3edf8",
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false // optional
};

export default class Pregnancy extends Component {

  componentDidMount() {
  }
  render() {

    return (
      <ScrollView >
       <View style={{alignItems:"center",margin:15,width:screenWidth}}>
          <Text>Weight</Text></View>

        <ScrollView
          horizontal={true}
          style={{ paddingHorizontal: 10 }}
          
        >
          <LineChart
            data={data}
            width={800}
            height={180}
            yAxisSuffix=" kg"
            chartConfig={chartConfig}
          />
          
        </ScrollView>
        <View style={{alignItems:"center",height:20,margin:20,width:screenWidth}}>
          <Text>Blood Pressure</Text></View>
        <ScrollView
          horizontal={true}
          style={{ paddingHorizontal: 10 }}
          
        >
          
          <LineChart
          
  data={data1}
  width={800}
  height={200}
  yAxisSuffix="Hg"
  horizontalLabelRotation={30}
  // verticalLabelRotation={30}
  chartConfig={chartConfig}
  bezier
/>
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
import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar,Dimensions, ImageBackground,Image } from "react-native";
import Svg, { Path,G } from 'react-native-svg';
const { height, width } = Dimensions.get('screen') 
const GraduationSvg = ({ width, height }) => {
  return (
    <Svg id="Layer_1"  height="15" viewBox="0 0 500.441 500.441" width="15">
        <G>
            <Path fill="grey" d="m255.721 347.484-165.501-80.733v106.57l165.51 73.503 165.509-73.503v-106.579z"/>
    <Path fill="grey" d="m511.441 189.361-255.72-124.744-255.721 124.744 255.721 124.744 195.522-95.378v111.032h30v-125.667z"/></G></Svg>
  )}
  export default GraduationSvg;

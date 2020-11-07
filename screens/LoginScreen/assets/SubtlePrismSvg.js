import * as React from 'react'
import Svg ,{Path,G,Stop,Pattern,Polygon,LinearGradient,Defs,Rect} from 'react-native-svg'

const LoginSvgOne=({height,width,color})=>{
    return(
       
        <Svg height={height} width={width} viewBox="0 0 1440 320"><Path fill={color} fill-opacity="1" d="M0,64L34.3,58.7C68.6,53,137,43,206,85.3C274.3,128,343,224,411,218.7C480,213,549,107,617,101.3C685.7,96,754,192,823,234.7C891.4,277,960,267,1029,256C1097.1,245,1166,235,1234,240C1302.9,245,1371,267,1406,277.3L1440,288L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z"></Path></Svg>
        )}

const LoginSvgTwo=({height,width,color})=>{
    return(
  

<Svg  height={height} width={width} viewBox="0 0 1440 320"><Path fill={color} fill-opacity="1"  d="M0,32L40,42.7C80,53,160,75,240,80C320,85,400,75,480,85.3C560,96,640,128,720,128C800,128,880,96,960,117.3C1040,139,1120,213,1200,213.3C1280,213,1360,139,1400,101.3L1440,64L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></Path></Svg>

)}
export { LoginSvgOne, LoginSvgTwo}
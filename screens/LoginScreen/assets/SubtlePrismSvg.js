import * as React from 'react'
import Svg ,{Path,G,Stop,Pattern,Polygon,LinearGradient,Defs,Rect} from 'react-native-svg'

const LoginSvgOne=({height,width,color})=>{
    return(
       
        <Svg  height={height} width={width} viewBox="0 0 1440 320">
<Path fill={color} fill-opacity="1" d="M0,96L80,117.3C160,139,320,181,480,176C640,171,800,117,960,128C1120,139,1280,213,1360,250.7L1440,288L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z" data-darkreader-inline-fill="" style="--darkreader-inline-fill:#007acc;">
    </Path>        
</Svg>
       

        )}

const LoginSvgTwo=({height,width,color})=>{
    return(
  

<Svg  height={height} width={width} viewBox="0 0 1440 320"><Path fill={color} fillOpacity="1"  d="M0,32L40,42.7C80,53,160,75,240,80C320,85,400,75,480,85.3C560,96,640,128,720,128C800,128,880,96,960,117.3C1040,139,1120,213,1200,213.3C1280,213,1360,139,1400,101.3L1440,64L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></Path></Svg>

)}
export { LoginSvgOne, LoginSvgTwo}
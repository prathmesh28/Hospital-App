import * as React from 'react';
import Animated from 'react-native-reanimated';
import Svg, { Path, PathProps,Circle, G, Rect } from 'react-native-svg';
import { SVGProps } from './types';

const AnimatedPath = (Animated.createAnimatedComponent(
  Path
) as any) as React.ComponentClass<
  Animated.AnimateProps<{}, PathProps & { style?: any }>
>;

Animated.addWhitelistedNativeProps({
  stroke: true,
});

const HomeSVG = ({ color, size }: SVGProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
     <Svg height={size} viewBox="0 0 512 512" width={size} ><G id="Flat"><Path d="m152 168h208v320h-208z" fill="#d3e1e9"/><Path d="m152 384h208v104h-208z" fill="#8acce7"/><Rect fill="#ffbd8e" height="32" rx="16" width="256" x="128" y="136"/><Path d="m168 24h176v112h-176z" fill="#8acce7"/><Circle cx="256" cy="80" fill="#c4d4e0" r="56"/><Path d="m288 64h-16v-16h-32v16h-16v32h16v16h32v-16h16z" fill="#e44b4d"/><Path d="m248 400h16v88h-16z" fill="#ffbd8e"/><Path d="m224 432h16v24h-16z" fill="#395166"/><Path d="m272 432h16v24h-16z" fill="#395166"/><Path d="m40 224h112a0 0 0 0 1 0 0v32a0 0 0 0 1 0 0h-112a16 16 0 0 1 -16-16 16 16 0 0 1 16-16z" fill="#ffbd8e"/><Path d="m40 256h112v232h-112z" fill="#c4d4e0"/><Path d="m72 288h80v144h-80z" fill="#8acce7"/><Path d="m376 224h112a0 0 0 0 1 0 0v32a0 0 0 0 1 0 0h-112a16 16 0 0 1 -16-16 16 16 0 0 1 16-16z" fill="#ffbd8e" transform="matrix(-1 0 0 -1 848 480)"/><Path d="m360 256h112v232h-112z" fill="#c4d4e0" transform="matrix(-1 0 0 -1 832 744)"/><Path d="m360 288h80v144h-80z" fill="#8acce7" transform="matrix(-1 0 0 -1 800 720)"/><Path d="m120 288h-16v40h-32v16h32v32h-32v16h32v40h16v-40h32v-16h-32v-32h32v-16h-32z" fill="#ffbd8e"/><Path d="m440 344v-16h-32v-40h-16v40h-32v16h32v32h-32v16h32v40h16v-40h32v-16h-32v-32z" fill="#ffbd8e"/><Path d="m184 208h144v160h-144z" fill="#8acce7"/><Path d="m328 256v-16h-64v-32h-16v32h-64v16h64v24h-64v16h64v24h-64v16h64v32h16v-32h64v-16h-64v-24h64v-16h-64v-24z" fill="#ffbd8e"/><Rect fill="#2d80b3" height="32" rx="16" width="256" x="128" y="368"/><Path d="m144 400h32v88h-32z" fill="#396795"/><Path d="m336 400h32v88h-32z" fill="#396795"/><Path d="m16 480h480v16h-480z" fill="#395166"/></G></Svg>
    </Svg>
  );
};

export default HomeSVG;

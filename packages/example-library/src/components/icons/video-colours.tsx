import React from 'react'
import {
  Svg,
  Defs,
  LinearGradient,
  Stop,
  ClipPath,
  Rect,
  G,
  Path,
  Circle,
} from 'react-native-svg'

import { genColoursIcon } from './gen'

const VideoColours = genColoursIcon(({ size, color, strokeWidth }, props) => {
  return (
    <Svg {...props} viewBox="0 0 24 24" fill="none" width={size} height={size}>
      <Defs>
        <LinearGradient id="bc2da__b" y2="1" x2=".5" y1="0" x1=".5">
          <Stop stopOpacity="0" stopColor="#864DBF" offset="0%" />
          <Stop stopColor="#7A4DBF" offset="100%" />
        </LinearGradient>
        <ClipPath id="bc2da__a">
          <Rect rx="0" height="24" width="24" />
        </ClipPath>
      </Defs>
      <G clipPath="url(#bc2da__a)">
        <Path
          fill="#9366E2"
          d="M2.25 23.25c0 .414.336.75.75.75h18a.75.75 0 0 0 .75-.75V6.75h-6A.75.75 0 0 1 15 6V0H3a.75.75 0 0 0-.75.75v22.5Z"
        />
        <Path
          fill="#FFF"
          d="M10.5 17.47a.3.3 0 0 0 .454.257l2.867-1.72a.3.3 0 0 0 0-.514l-2.867-1.72a.3.3 0 0 0-.454.257v3.44Z"
        />
        <Path
          fill="url(#bc2da__b)"
          d="M21.75 26.25h6l-6-9.75v9.75Z"
          transform="rotate(180 21.75 16.5)"
        />
        <Path fill="#F0E1FF" d="M15 6c0 .414.336.75.75.75h6L15 0v6Z" />
        <Circle strokeWidth="1.2" stroke="#FFF" cy="15.75" cx="12" r="4.5" />
      </G>
    </Svg>
  )
})
export default VideoColours

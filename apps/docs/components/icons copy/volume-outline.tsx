import React from 'react'
import { Svg, Path } from 'react-native-svg'

import { genOutlineIcon } from './gen'

const VolumeOutline = genOutlineIcon(({ size, color, strokeWidth }, props) => {
  return (
    <Svg {...props} viewBox="0 0 24 24" fill="none" width={size} height={size}>
      <Path
        d="M12 3 3 9.98v4L12 21V3Z"
        stroke={color}
        strokeWidth={strokeWidth || 2}
        strokeLinejoin="round"
      />
      <Path
        d="M15.5 8.5c.9 2.37.892 4.703 0 7M19 7c2 2 2 8 0 10"
        stroke={color}
        strokeWidth={strokeWidth || 2}
        strokeLinecap="round"
      />
    </Svg>
  )
})
export default VolumeOutline

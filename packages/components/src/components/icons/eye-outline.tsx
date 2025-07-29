import React from 'react'
import { Svg, Path } from 'react-native-svg'

import { genOutlineIcon } from './gen'

const EyeOutline = genOutlineIcon(({ size, color, strokeWidth }, props) => {
  return (
    <Svg {...props} viewBox="0 0 24 24" fill="none" width={size} height={size}>
      <Path
        d="M12 18c5.523 0 10-6 10-6s-4.477-6-10-6-10 6-10 6 4.477 6 10 6Z"
        stroke={color}
        strokeWidth={strokeWidth || 2}
        strokeLinejoin="round"
      />
      <Path
        d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
        stroke={color}
        strokeWidth={strokeWidth || 2}
        strokeLinejoin="round"
      />
    </Svg>
  )
})
export default EyeOutline

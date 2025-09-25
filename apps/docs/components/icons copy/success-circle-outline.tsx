import React from 'react'
import { Svg, Path } from 'react-native-svg'

import { genOutlineIcon } from './gen'

const SuccessCircleOutline = genOutlineIcon(
  ({ size, color, strokeWidth }, props) => {
    return (
      <Svg
        {...props}
        viewBox="0 0 24 24"
        fill="none"
        width={size}
        height={size}>
        <Path
          d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2Z"
          stroke={color}
          strokeWidth={strokeWidth || 2}
          strokeLinejoin="round"
        />
        <Path
          d="m16 10-5.464 5.465L7 11.929"
          stroke={color}
          strokeWidth={strokeWidth || 2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    )
  },
)
export default SuccessCircleOutline

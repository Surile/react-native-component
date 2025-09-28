import React from 'react'
import { Svg, Path } from 'react-native-svg'

import { genOutlineIcon } from './gen'

const SwapRightOutline = genOutlineIcon(
  ({ size, color, strokeWidth }, props) => {
    return (
      <Svg
        {...props}
        viewBox="0 0 24 24"
        fill="none"
        width={size}
        height={size}>
        <Path
          d="M3 14h18l-4.821-6"
          stroke={color}
          strokeWidth={strokeWidth || 2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    )
  },
)
export default SwapRightOutline

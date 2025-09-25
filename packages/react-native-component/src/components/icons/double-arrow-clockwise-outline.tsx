import React from 'react'
import { Svg, Path } from 'react-native-svg'

import { genOutlineIcon } from './gen'

const DoubleArrowClockwiseOutline = genOutlineIcon(
  ({ size, color, strokeWidth }, props) => {
    return (
      <Svg
        {...props}
        viewBox="0 0 24 24"
        fill="none"
        width={size}
        height={size}>
        <Path
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeWidth={strokeWidth || 2}
          stroke={color}
          d="M3.183 10.186c.12-.586.297-1.15.524-1.69a9.015 9.015 0 0 1 1.93-2.86A8.972 8.972 0 0 1 12 3a8.972 8.972 0 0 1 6.364 2.636C19.193 6.465 20.5 8 20.5 8m.5 6a9.014 9.014 0 0 1-2.453 4.55 8.972 8.972 0 0 1-6.364 2.636 8.972 8.972 0 0 1-6.364-2.637c-.83-.828-2.136-2.363-2.136-2.363"
        />
        <Path
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeWidth={strokeWidth || 2}
          stroke={color}
          d="M21 4.5v4h-4M3.183 19.686v-4h4"
        />
      </Svg>
    )
  },
)
export default DoubleArrowClockwiseOutline

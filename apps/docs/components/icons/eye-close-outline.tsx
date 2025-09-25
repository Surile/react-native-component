import React from 'react'
import { Svg, Path } from 'react-native-svg'

import { genOutlineIcon } from './gen'

const EyeCloseOutline = genOutlineIcon(
  ({ size, color, strokeWidth }, props) => {
    return (
      <Svg
        {...props}
        viewBox="0 0 24 24"
        fill="none"
        width={size}
        height={size}>
        <Path
          d="M4.929 9C3.119 10.5 2 12 2 12s4.477 6 10 6c.685 0 2-.254 2-.254M10.016 6.25A8.223 8.223 0 0 1 12 6c5.523 0 10 6 10 6l-2.929 3"
          stroke={color}
          strokeWidth={strokeWidth || 2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M9.773 10A2.997 2.997 0 0 0 9 12.016C9 13.664 10.317 15 11.941 15A2.91 2.91 0 0 0 14 14.147M21 21 3 3"
          stroke={color}
          strokeWidth={strokeWidth || 2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    )
  },
)
export default EyeCloseOutline

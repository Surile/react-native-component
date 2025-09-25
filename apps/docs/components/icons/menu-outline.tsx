import React from 'react'
import { Svg, Path } from 'react-native-svg'

import { genOutlineIcon } from './gen'

const MenuOutline = genOutlineIcon(({ size, color, strokeWidth }, props) => {
  return (
    <Svg {...props} viewBox="0 0 24 24" fill="none" width={size} height={size}>
      <Path
        d="M3 5h18M3 12h14M3 19h18"
        stroke={color}
        strokeWidth={strokeWidth || 2}
        strokeLinecap="round"
      />
    </Svg>
  )
})
export default MenuOutline

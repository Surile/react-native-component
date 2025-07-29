import React from 'react'
import { Svg, Path } from 'react-native-svg'

import { genOutlineIcon } from './gen'

const SearchOutline = genOutlineIcon(({ size, color, strokeWidth }, props) => {
  return (
    <Svg {...props} viewBox="0 0 24 24" fill="none" width={size} height={size}>
      <Path
        d="M11 20a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"
        stroke={color}
        strokeWidth={strokeWidth || 2}
      />
      <Path
        d="m18 18 3 3"
        stroke={color}
        strokeWidth={strokeWidth || 2}
        strokeLinecap="round"
      />
    </Svg>
  )
})
export default SearchOutline

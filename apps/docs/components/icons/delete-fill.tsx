import React from 'react'
import { Svg, Circle, Path } from 'react-native-svg'

import { genFillIcon } from './gen'

const DeleteFill = genFillIcon(({ size, color, strokeWidth }, props) => {
  return (
    <Svg {...props} viewBox="0 0 24 24" fill="none" width={size} height={size}>
      <Circle r="10" cx="12" cy="12" fill={color} />
      <Path d="M8 13h8v-2H8v2Z" fill="#FFF" />
    </Svg>
  )
})
export default DeleteFill

import React from 'react'
import { Svg, Path } from 'react-native-svg'

import { genOutlineIcon } from './gen'

const SuccessOutline = genOutlineIcon(({ size, color, strokeWidth }, props) => {
  return (
    <Svg {...props} viewBox="0 0 24 24" fill="none" width={size} height={size}>
      <Path
        fill={color}
        fillRule="evenodd"
        d="M6.097 12.447a.437.437 0 0 0 .047.598L9.86 16.64c.273.264.709.276.974.019l8.525-8.25c.178-.173.19-.435.02-.6l-.195-.189a.486.486 0 0 0-.615-.023l-7.943 6.246a.553.553 0 0 1-.58.027l-3.005-1.944a.463.463 0 0 0-.597.095l-.347.425Z"
      />
    </Svg>
  )
})
export default SuccessOutline

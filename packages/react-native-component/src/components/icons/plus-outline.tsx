import React from 'react';
import { Svg, Path } from 'react-native-svg';

import { genOutlineIcon } from './gen';

const PlusOutline = genOutlineIcon(({ size, color, strokeWidth }, { hitSlop, ...props }) => {
  return (
    <Svg {...props} viewBox='0 0 24 24' fill='none' width={size} height={size}>
      <Path
        d='M3 12h18m-9 8.999v-18'
        stroke={color}
        strokeWidth={strokeWidth || 2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  );
});
export default PlusOutline;

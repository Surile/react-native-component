import React from 'react';
import { Svg, Path } from 'react-native-svg';

import { genOutlineIcon } from './gen';

const CircleOutline = genOutlineIcon(({ size, color, strokeWidth }, { hitSlop, ...props }) => {
  return (
    <Svg {...props} viewBox='0 0 24 25' fill='none' width={size} height={size}>
      <Path
        d='M12.043 2.012c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10-4.5-10-10-10Z'
        stroke={color}
        strokeWidth={strokeWidth || 2}
        strokeLinejoin='round'
      />
    </Svg>
  );
});
export default CircleOutline;

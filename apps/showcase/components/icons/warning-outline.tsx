import React from 'react';
import { Svg, Path } from 'react-native-svg';

import { genOutlineIcon } from './gen';

const WarningOutline = genOutlineIcon(({ size, color, strokeWidth }, props) => {
  return (
    <Svg {...props} viewBox='0 0 24 24' fill='none' width={size} height={size}>
      <Path d='M12 21.5a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Z' fill={color} />
      <Path
        d='M12 3v13'
        stroke={color}
        strokeWidth={strokeWidth || 2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  );
});
export default WarningOutline;

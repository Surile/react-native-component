import React from 'react';
import { Svg, Path } from 'react-native-svg';

import { genFillIcon } from './gen';

const ArrowRightFill = genFillIcon(({ size, color, strokeWidth }, { hitSlop, ...props }) => {
  return (
    <Svg {...props} viewBox='0 0 1024 1024' fill={color} width={size} height={size}>
      <Path
        d='M755.2 544 390.4 874.667c-17.067 14.933-44.8 14.933-59.733-2.134-6.4-8.533-10.667-19.2-10.667-29.866V181.333c0-23.466 19.2-42.666 42.667-42.666 10.666 0 21.333 4.266 27.733 10.666L753.067 480c17.066 14.933 19.2 42.667 2.133 59.733 2.133 2.134 0 2.134 0 4.267z'
        fill={color}
      />
    </Svg>
  );
});
export default ArrowRightFill;

import React from 'react';
import { Svg, Circle, Path } from 'react-native-svg';

import { genFillIcon } from './gen';

const CrossFill = genFillIcon(({ size, color, strokeWidth }, props) => {
  return (
    <Svg {...props} viewBox='0 0 24 24' fill='none' width={size} height={size}>
      <Circle r='10' cx='12' cy='12' fill={color} />
      <Path
        d='M9.707 8.293a1 1 0 0 0-1.414 1.414l1.414-1.414Zm4.42 7.247a1 1 0 0 0 1.413-1.414l-1.414 1.414ZM8.292 9.707l5.833 5.833 1.414-1.414-5.833-5.833-1.414 1.414Z'
        fill='#FFF'
      />
      <Path
        d='M8.293 14.126a1 1 0 1 0 1.414 1.414l-1.414-1.414Zm7.247-4.419a1 1 0 0 0-1.414-1.414l1.414 1.414ZM9.707 15.54l5.833-5.833-1.414-1.414-5.833 5.833 1.414 1.414Z'
        fill='#FFF'
      />
    </Svg>
  );
});
export default CrossFill;

import { Svg, Path } from 'react-native-svg';

import { genFillIcon } from './gen';

const SuccessFill = genFillIcon(({ size, color }, { hitSlop, ...props }) => {
  return (
    <Svg {...props} viewBox='0 0 24 24' fill='none' width={size} height={size}>
      <Path
        fill={color}
        d='M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10Z'
      />
      <Path
        fill='#FFF'
        d='M7.08 12.372a.365.365 0 0 0 .04.499l3.097 2.997c.227.22.59.23.811.015l7.104-6.875c.149-.144.16-.362.017-.5l-.163-.157a.405.405 0 0 0-.512-.02l-6.619 5.206a.46.46 0 0 1-.483.022l-2.504-1.62a.386.386 0 0 0-.498.08l-.29.353Z'
      />
    </Svg>
  );
});
export default SuccessFill;

import { size } from 'lodash';
import { Svg, Path } from 'react-native-svg';

const ArrowLeftOutline = ({ color, strokeWidth, size, ...props }: any) => {
  return (
    <Svg {...props} viewBox='0 0 24 24' fill='none' width={size} height={size}>
      <Path
        d='m16 20-8-8 8-8'
        stroke={color}
        strokeWidth={strokeWidth || 2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  );
};
export default ArrowLeftOutline;

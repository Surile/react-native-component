import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function Error(props: any) {
  return (
    <Svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      width={32}
      height={32}
      viewBox='0 0 32 32'
      {...props}
    >
      <Path
        d='M30 16c0-7.732-6.268-14-14-14S2 8.268 2 16s6.268 14 14 14 14-6.268 14-14zM4 16C4 9.373 9.373 4 16 4s12 5.373 12 12-5.373 12-12 12S4 22.627 4 16zm10.586 0l-4.624 4.624 1.414 1.414L16 17.414l4.624 4.624 1.414-1.414L17.414 16l4.624-4.624-1.414-1.414L16 14.586l-4.624-4.624-1.414 1.414L14.586 16z'
        fillRule='evenodd'
        fill='#FFF'
      />
    </Svg>
  );
}

export default Error;

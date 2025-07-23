import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function Warn(props: any) {
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
        d='M16 2c7.732 0 14 6.268 14 14s-6.268 14-14 14S2 23.732 2 16 8.268 2 16 2zm0 26c6.627 0 12-5.373 12-12S22.627 4 16 4 4 9.373 4 16s5.373 12 12 12zm-1-9V8h2v11h-2zm2.188 4.4V21h-2.4v2.4h2.4z'
        fillRule='evenodd'
        fill='#FFF'
      />
    </Svg>
  );
}

export default Warn;

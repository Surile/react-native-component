import React, { useMemo, memo } from 'react';
import { Fade } from 'rn-placeholder';

const SkeletonActive: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <Fade style={{ backgroundColor: '#EDEFF2' }}>{children}</Fade>;
};

export default memo(SkeletonActive);

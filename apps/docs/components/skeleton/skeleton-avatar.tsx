import React, { useMemo, memo } from 'react';
import type { ViewStyle } from 'react-native';
import { PlaceholderMedia } from 'rn-placeholder';

import type { SkeletonAvatarProps } from './interface';
import SkeletonActive from './skeleton-active';

const SkeletonAvatar: React.FC<SkeletonAvatarProps> = ({
  theme,
  active = true,
  size = 40,
  shape = 'circle',
  testID,
}) => {
  const style = useMemo<ViewStyle>(
    () => ({
      height: size,
      width: size,
      backgroundColor: '#EDEFF2',
      borderRadius: shape === 'circle' ? size / 2 : 4,
    }),
    [shape, size]
  );
  const nodeJSX = <PlaceholderMedia testID={testID} style={style} />;

  if (active) {
    return <SkeletonActive>{nodeJSX}</SkeletonActive>;
  }

  return nodeJSX;
};

export default memo(SkeletonAvatar);

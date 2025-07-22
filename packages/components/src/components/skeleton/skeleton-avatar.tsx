import { cva } from 'class-variance-authority';
import React, { memo } from 'react';
import { View } from 'react-native';
import { cn } from '../../lib/utils';

import type { SkeletonAvatarProps } from './interface';
import SkeletonActive from './skeleton-active';

const skeletonAvatarVariants = cva('bg-gray-3', {
  variants: {
    shape: {
      circle: '',
      square: 'rounded-s',
    },
  },
  defaultVariants: {
    shape: 'circle',
  },
});

const SkeletonAvatar: React.FC<SkeletonAvatarProps> = ({
  active = true,
  size = 40,
  shape = 'circle',
  testID,
  className,
}) => {
  const nodeJSX = (
    <View
      testID={testID}
      className={cn(
        skeletonAvatarVariants({ shape }),
        shape === 'circle' && `rounded-[${size / 2}px]`,
        className
      )}
      style={{
        height: size,
        width: size,
      }}
    />
  );

  if (active) {
    return <SkeletonActive>{nodeJSX}</SkeletonActive>;
  }

  return nodeJSX;
};

export default memo(SkeletonAvatar);

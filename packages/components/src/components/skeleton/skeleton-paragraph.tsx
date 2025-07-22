import React, { memo } from 'react';
import { View } from 'react-native';
import { cn } from '../../lib/utils';

import type { SkeletonParagraphProps } from './interface';
import SkeletonActive from './skeleton-active';

const SkeletonParagraph: React.FC<SkeletonParagraphProps> = ({
  active = true,
  rows = 3,
  className,
}) => {
  const nodeJSX = (
    <View className={cn('space-y-2', className)}>
      {Array(rows)
        .fill('')
        .map((_, index) => (
          <View
            key={index}
            className={cn('h-4 bg-gray-3', index === rows - 1 ? 'w-3/4' : 'w-full')}
          />
        ))}
    </View>
  );

  if (active) {
    return <SkeletonActive>{nodeJSX}</SkeletonActive>;
  }

  return nodeJSX;
};

export default memo(SkeletonParagraph);

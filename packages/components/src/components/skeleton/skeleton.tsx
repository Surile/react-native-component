import isBoolean from 'lodash/isBoolean';
import React, { memo } from 'react';
import { View } from 'react-native';
import { cn } from '../../lib/utils';

import type { SkeletonProps } from './interface';
import SkeletonActive from './skeleton-active';
import SkeletonAvatar from './skeleton-avatar';
import SkeletonParagraph from './skeleton-paragraph';

const Skeleton: React.FC<SkeletonProps> = ({
  active = true,
  avatar = false,
  paragraph = true,
  className,
  children,
}) => {
  const hasAvatar = !!avatar;
  const hasParagraph = !!paragraph;

  let avatarNode: React.ReactNode;
  if (hasAvatar) {
    const avatarProps = isBoolean(avatar) ? {} : avatar;
    avatarNode = <SkeletonAvatar {...avatarProps} active={false} />;
  }

  let paragraphNode: React.ReactNode;
  if (hasParagraph) {
    const paragraphProps = isBoolean(paragraph) ? {} : paragraph;
    paragraphNode = <SkeletonParagraph {...paragraphProps} active={false} />;
  }

  const content = (
    <View className={cn('flex-row', className)}>
      {avatarNode && <View className='mr-3'>{avatarNode}</View>}
      {paragraphNode && <View className='flex-1'>{paragraphNode}</View>}
    </View>
  );

  if (active) {
    return <SkeletonActive>{content}</SkeletonActive>;
  }

  return content;
};

export default memo(Skeleton);

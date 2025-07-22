import React, { memo } from 'react';
import { View, Animated } from 'react-native';
import { cn } from '../../lib/utils';
import { useLoop } from '../../hooks/useLoop';

const SkeletonActive: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const opacity = useLoop({
    duration: 1000,
    fromValue: 1,
    toValue: 0.3,
  });

  return (
    <View className='relative'>
      {children}
      <Animated.View className='absolute inset-0 bg-gray-1' style={{ opacity }} />
    </View>
  );
};

export default memo(SkeletonActive);

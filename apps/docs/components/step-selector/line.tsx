import React, { memo } from 'react';
import { View } from 'react-native';

import type { StepSelectorLineProps } from './interface';
import { cn } from '../../lib/utils';

const StepSelectorLine: React.FC<StepSelectorLineProps> = ({ index, total, active = false }) => {
  return (
    <View className='w-5 h-full'>
      {index !== 0 ? (
        <View className='w-[1px] h-1/2 -ml-[0.5px] absolute left-1/2 bg-primary-5 top-0' />
      ) : null}
      <View
        className={cn(
          'w-[10px] h-[10px] rounded-[5px] border-primary-5 border-hairline absolute left-1/2 top-1/2 -ml-[5px] -mt-[5px] bg-white',
          {
            'bg-primary-5 border-0': active,
          }
        )}
      />
      {index !== total - 1 ? (
        <View className='w-[1px] h-1/2 -ml-[0.5px] absolute left-1/2 bg-primary-5 bottom-0' />
      ) : null}
    </View>
  );
};

export default memo(StepSelectorLine);

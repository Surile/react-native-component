import React, { memo } from 'react';
import { TouchableOpacity, View } from 'react-native';

import type { PopoverItemProps } from './interface';
import { cn } from '../../lib/utils';

const PopoverItem = <T,>({
  children,
  value,
  disabled,
  dark,
  style,
  divider = false,

  onSelect,
}: React.PropsWithChildren<PopoverItemProps<T>>) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled}
      onPress={() => {
        if (typeof onSelect === 'function') {
          onSelect(value);
        }
      }}
      style={style}
    >
      <View
        className={cn('py-3 mx-3', {
          'border-b-hairline border-b-gray-200': divider,
          'border-b-[rgba(255,255,255,0.15)]': dark,
        })}
      >
        {children}
      </View>
    </TouchableOpacity>
  );
};

export default memo(PopoverItem) as <T>(
  p: React.PropsWithChildren<PopoverItemProps<T>>
) => React.ReactElement;

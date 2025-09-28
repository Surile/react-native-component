import React, { memo } from 'react';
import { Text } from 'react-native';

import type { PopoverTextProps } from './interface';
import PopoverItem from './popover-item';
import { cn } from '../../lib/utils';

const PopoverText: React.FC<PopoverTextProps> = ({
  theme,
  text,
  onSelect,
  dark,
  disabled,
  divider = false,

  style,
  ...restProps
}) => {
  return (
    <PopoverItem value={text} onSelect={onSelect} disabled={disabled} divider={divider} dark={dark}>
      <Text
        {...restProps}
        className={cn('text-gray-800 text-lg', {
          'text-white': dark,
        })}
      >
        {text}
      </Text>
    </PopoverItem>
  );
};

export default memo(PopoverText);

import React, { memo } from 'react';
import isNil from 'lodash/isNil';
import { Text, TouchableOpacity, View } from 'react-native';
import { useDropdownConfig } from './context';
import DropdownBadge from './dropdown-badge';
import type { DropdownTextProps } from './interface';
import { getArrowOutline } from '../../helpers';
import { cn } from '../../lib/utils';

const DropdownText: React.FC<DropdownTextProps> = ({
  disabled = false,
  title,
  active = false,
  pressable = true,
  direction,
  badge,
  activeOpacity,
  activeColor,
  iconClassName,
  ...restProps
}) => {
  const config = useDropdownConfig();

  const showBadge = !active && !isNil(badge) && badge !== false;

  const ArrowFill = getArrowOutline(active ? (direction === 'up' ? 'down' : 'up') : direction);

  const ctxJSX = (
    <View className='flex-1 flex-row items-center justify-between'>
      <View className='max-w-full shrink'>
        <Text
          className={cn(
            'shrink text-[15px]',
            {
              'mr-[4px]': !showBadge,
              'text-[#8C9199]': disabled,
              'text-primary': active,
              'text-[#5A6068]': !active,
            },
            config.titleTextClassName
          )}
          numberOfLines={1}
        >
          {title}
        </Text>
      </View>

      {showBadge ? <DropdownBadge className='-mt-2 ml-0.5 mr-1' /> : null}

      <ArrowFill className={iconClassName} size={12} color={active ? activeColor : '#8C9199'} />
    </View>
  );

  if (pressable) {
    return (
      <TouchableOpacity
        {...restProps}
        className={cn(
          'flex-1 flex-row items-center justify-center',
          config.titleClassName,
          restProps?.className
        )}
        disabled={disabled}
        activeOpacity={activeOpacity}
      >
        {ctxJSX}
      </TouchableOpacity>
    );
  }

  return (
    <View
      {...restProps}
      className={cn(
        'flex-1 flex-row items-center justify-center',
        config.titleClassName,
        restProps?.className
      )}
    >
      {ctxJSX}
    </View>
  );
};

export default memo(DropdownText);

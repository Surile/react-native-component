import isNil from 'lodash/isNil';
import React, { memo, useMemo } from 'react';
import { View, Text } from 'react-native';

import type { BadgeProps } from './interface';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const badgeVariants = cva('rounded-full', {
  variants: {
    status: {
      primary: 'bg-primary-5',
      success: 'bg-success-4',
      warning: 'bg-warning-4',
      error: 'bg-danger-5',
    },
    size: {
      small: 'w-2 h-2 min-w-[0px]',
      medium: 'w-4 h-4',
      large: 'w-7.5 h-4',
    },
  },
  defaultVariants: {
    status: 'error',
    size: 'medium',
  },
});

/**
 * Badge 徽标
 * @description 在右上角展示徽标数字或小红点。
 */
const Badge: React.FC<BadgeProps> = ({
  children,
  count,
  dot,
  max,
  color,
  countClassName,
  countTextClassName,
  loading = false,
  showZero = false,
  offset,
  status,
  size,
  ...restProps
}) => {
  if (!isNil(max) && typeof count === 'number' && count > max) {
    count = `${max}+`;
  }
  // 根据 dot 和 count 判断 badge 的 size
  const badgeSize = useMemo(() => {
    if (dot) {
      return 'small';
    }

    if (count && count.toString().length > 1) {
      return 'large';
    }

    return size;
  }, [dot, count]);

  const hasCount = !isNil(count) && (count === 0 ? showZero : true);
  const badgeJSX =
    !loading && (hasCount || dot) ? (
      <View
        className={cn(
          badgeVariants({ status, size: badgeSize }),
          !isNil(children) && {
            'absolute right-0 top-0 z-[2] translate-x-2 -translate-y-2': true,
            'translate-x-1 -translate-y-1': dot,
          },
          countClassName
        )}
        style={
          !isNil(offset)
            ? {
                transform: [{ translateX: offset[0] }, { translateY: offset[1] }],
              }
            : null
        }
      >
        {dot ? null : (
          <Text
            className={cn(
              'text-base leading-[16px] text-white font-medium text-center',
              countTextClassName
            )}
          >
            {count}
          </Text>
        )}
      </View>
    ) : null;

  return (
    <View {...restProps} collapsable={false}>
      {badgeJSX}
      {children}
    </View>
  );
};

export default memo(Badge);

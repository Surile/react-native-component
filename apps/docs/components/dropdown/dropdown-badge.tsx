import React, { memo } from 'react';
import isNil from 'lodash/isNil';
import { Text } from 'react-native';
import type { DropdownBadgeProps } from './interface';
import { cn } from '../../lib/utils';

const DropdownBadge: React.FC<DropdownBadgeProps> = ({ count, ...restProps }) => {
  if (isNil(count)) {
    return null;
  }

  if (count === true) {
    return (
      <Text {...restProps} className={cn('size-[8px] rounded bg-danger-4', restProps.className)} />
    );
  }

  return (
    <Text {...restProps} className={cn('text-danger-4 text-sm', restProps.className)}>
      {count}
    </Text>
  );
};

export default memo(DropdownBadge);

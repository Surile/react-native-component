import React, { memo } from 'react';
import type { CheckboxIconProps } from './interface';
import { getDefaultValue } from '../../helpers';
import { CircleOutline, SuccessFill } from '../icons';

const CheckboxIcon: React.FC<CheckboxIconProps> = ({
  active,
  disabled,
  size,
  activeColor,
  hitSlop,
  ...restProps
}) => {
  size = getDefaultValue(size, 24);
  activeColor = getDefaultValue(activeColor, '#4080FF');

  if (active) {
    return (
      <SuccessFill
        {...restProps}
        size={size}
        color={disabled ? '#B9BEC5' : activeColor}
        disabled={disabled}
      />
    );
  }

  return (
    <CircleOutline
      {...restProps}
      size={size}
      disabled={disabled}
      color={disabled ? '#B9BEC5' : '#8C9199'}
    />
  );
};

export default memo(CheckboxIcon);

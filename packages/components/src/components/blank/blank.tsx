import React, { memo } from 'react';
import { View } from 'react-native';
import type { BlankProps } from './interface';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const blankClass = cva('', {
  variants: {
    size: {
      s: 'h-1',
      m: 'h-2',
      l: 'h-4',
    },
    type: {
      margin: 'my-0',
      padding: 'py-0',
    },
    top: {
      true: 'mt-2',
      false: '',
    },
    bottom: {
      true: 'mb-2',
      false: '',
    },
    left: {
      true: 'ml-2',
      false: '',
    },
    right: {
      true: 'mr-2',
      false: '',
    },
  },
  defaultVariants: {
    size: 'm',
    type: 'margin',
    left: true,
    right: true,
    top: false,
    bottom: false,
  },
});

const Blank: React.FC<BlankProps> = ({
  left = true,
  right = true,
  top = false,
  bottom = false,
  size = 'm',
  type = 'margin',

  children,
  style,
  ...restProps
}) => {
  const className = blankClass({
    size,
    type,
    top: !!top,
    bottom: !!bottom,
    left: !!left,
    right: !!right,
  });

  return (
    <View {...restProps} className={cn(className, restProps.className)}>
      {children}
    </View>
  );
};

export default memo(Blank);

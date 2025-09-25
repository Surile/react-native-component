import React, { memo } from 'react';
import { View } from 'react-native';
import type { BlankProps } from './interface';

const getGapValue = (v: boolean | number, initialValue: number) => {
  return typeof v === 'boolean' ? (v ? initialValue : 0) : v;
};

const sizeMap = {
  m: 8,
  s: 4,
  l: 16,
};

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
  // 重置值
  left = getGapValue(left, sizeMap[size]);
  right = getGapValue(right, sizeMap[size]);
  top = getGapValue(top, sizeMap[size]);
  bottom = getGapValue(bottom, sizeMap[size]);

  return (
    <View
      {...restProps}
      style={[
        {
          [`${type}Left`]: left,
          [`${type}Right`]: right,
          [`${type}Top`]: top,
          [`${type}Bottom`]: bottom,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

export default memo(Blank);

import React, { memo, Children, isValidElement } from 'react';
import { View } from 'react-native';
import { cva } from 'class-variance-authority';
import type { SpaceProps } from './interface';

// 1. 用 cva 定义变体
const spaceClass = cva('', {
  variants: {
    direction: {
      vertical: 'flex-col',
      horizontal: 'flex-row',
    },
    wrap: {
      true: 'flex-wrap',
      false: 'flex-nowrap',
    },
    justify: {
      start: 'justify-start',
      end: 'justify-end',
      center: 'justify-center',
      between: 'justify-between',
      around: 'justify-around',
      evenly: 'justify-evenly',
    },
    align: {
      start: 'items-start',
      end: 'items-end',
      center: 'items-center',
      baseline: 'items-baseline',
      stretch: 'items-stretch',
    },
    shrink: {
      true: 'shrink',
      false: '',
    },
  },
  defaultVariants: {
    direction: 'vertical',
    wrap: false,
    justify: 'start',
    align: 'center',
    shrink: false,
  },
});

const gapMap = {
  s: 'gap-1',
  m: 'gap-2',
  l: 'gap-4',
};

export const Space: React.FC<SpaceProps> = ({
  direction = 'vertical',
  wrap = false,
  gap = 's',
  justify = 'start',
  align = 'stretch',
  shrink = false,
  minWidth,
  style,
  children,
  ...restProps
}) => {
  // 2. 生成 className
  const className =
    spaceClass({ direction, wrap, justify, align, shrink }) +
    ' ' +
    (typeof gap === 'string' ? gapMap[gap] : '');

  // 3. minWidth 只能用 style 传递
  const itemStyle = minWidth ? { minWidth } : undefined;

  const childArray = Children.toArray(children);

  return (
    <View className={className} style={style} {...restProps}>
      {childArray.map((child, index) => {
        let key: React.Key = index;
        if (isValidElement(child)) {
          key = child.key ?? index;
        }
        return (
          <View key={key} style={itemStyle}>
            {child}
          </View>
        );
      })}
    </View>
  );
};

export default memo(Space);

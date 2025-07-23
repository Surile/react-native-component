import React, { memo, Children, isValidElement } from 'react';
import { View } from 'react-native';
import { cva } from 'class-variance-authority';
import type { SpaceProps } from './interface';
import { cn } from '../../lib/utils';
import { getDefaultValue } from '../../helpers';

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

const sizeMap = {
  s: 8,
  m: 12,
  l: 16,
};

const getMarginGap = (d: boolean | number | undefined, gap: number) =>
  d ? (typeof d === 'number' ? d : gap) : 0;

export const Space: React.FC<SpaceProps> = ({
  direction = 'vertical',
  wrap = false,
  gap = 's',
  justify = 'start',
  align = 'stretch',
  shrink = false,
  minWidth,
  gapHorizontal,
  style,
  children,
  gapVertical,
  className,
  head,
  tail,
  ...restProps
}) => {
  const isVertical = direction === 'vertical';
  const itemStyle = minWidth ? { minWidth } : undefined;

  const childArray = Children.toArray(children);

  const defaultGap = sizeMap[gap as keyof typeof sizeMap];

  const _gapVertical = getDefaultValue(gapVertical, defaultGap)!;
  const _gapHorizontal = getDefaultValue(gapHorizontal, defaultGap)!;

  return (
    <View
      className={cn(
        spaceClass({ direction, wrap, justify, align, shrink }),
        className,
        typeof gap === 'string' ? gapMap[gap] : ''
      )}
      style={{
        ...(isVertical
          ? {
              paddingTop: getMarginGap(head, _gapVertical),
              paddingBottom: getMarginGap(tail, _gapVertical),
            }
          : {
              paddingLeft: getMarginGap(head, _gapHorizontal),
              paddingRight: getMarginGap(tail, _gapHorizontal),
            }),

        ...(shrink && direction === 'horizontal'
          ? {
              marginBottom: -_gapVertical,
            }
          : {}),
      }}
      {...restProps}
    >
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

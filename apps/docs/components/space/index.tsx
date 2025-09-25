import React, { memo, Children, isValidElement } from 'react';
import type { ViewStyle } from 'react-native';
import { View } from 'react-native';

import type { SpaceProps } from './interface';
import { getDefaultValue } from '../../helpers';

const NO_GAP = 0;

const getMarginGap = (d: boolean | number | undefined, gap: number) =>
  d ? (typeof d === 'number' ? d : gap) : 0;

const blankSize = {
  s: 8,
  m: 12,
  l: 16,
};

/**
 * Space 间距
 */
const Space: React.FC<SpaceProps> = ({
  direction = 'vertical',
  wrap = false,
  gap = 's',
  gapVertical,
  gapHorizontal,
  head,
  tail,
  justify,
  align,
  minWidth,
  shrink = false,

  style,
  children,

  ...restProps
}) => {
  const defaultGap: number = typeof gap === 'string' ? blankSize[gap] : gap;
  const isVertical = direction === 'vertical';
  const _gapVertical = getDefaultValue(gapVertical, defaultGap)!;
  const _gapHorizontal = getDefaultValue(gapHorizontal, defaultGap)!;
  const wrapperStyle: ViewStyle = {
    flexDirection: isVertical ? 'column' : 'row',
    flexWrap: wrap ? 'wrap' : 'nowrap',
    justifyContent: justify,
    alignItems: align,
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
  };
  const itemStyle: ViewStyle = {
    marginBottom: isVertical || wrap ? _gapVertical : 0,
    marginRight: isVertical ? 0 : _gapHorizontal,
    minWidth,
  };

  const childArray = Children.toArray(children);
  const count = childArray.length;

  return (
    <View {...restProps} style={[wrapperStyle, style]}>
      {childArray.map((child, index) => {
        let key: React.Key = index;
        if (isValidElement(child)) {
          key = child.key ?? index;
        }
        return (
          <View
            key={key}
            style={[
              itemStyle,
              index + 1 === count
                ? isVertical
                  ? {
                      marginBottom: NO_GAP,
                    }
                  : {
                      marginRight: NO_GAP,
                    }
                : null,
            ]}
          >
            {child}
          </View>
        );
      })}
    </View>
  );
};

export default memo(Space);

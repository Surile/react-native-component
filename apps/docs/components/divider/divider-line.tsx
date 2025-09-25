import React, { memo, useMemo } from 'react';
import { DimensionValue, View, ViewStyle } from 'react-native';
import type { DividerLineProps } from './interface';

/**
 * 分割线
 */
const DividerLine: React.FC<DividerLineProps> = ({
  color,
  position,
  adaptive = true,
  direction = 'horizontal',
  className,
}) => {
  const isVertical = direction === 'vertical';

  const viewStyle = useMemo(() => {
    if (isVertical) {
      return {
        flex: 1,
        width: 1,
        height: '100%' as DimensionValue,
        backgroundColor: color,
      };
    }

    const s: ViewStyle = {
      flex: 1,
      maxWidth: 'auto',
      height: 1,
      backgroundColor: color,
    };

    if (position === 'left') {
      s.marginRight = 16;
    }

    if (position === 'right') {
      s.marginLeft = 16;
    }

    if (!adaptive) {
      s.maxWidth = position === 'left' ? '10%' : '10%';
    }

    return s;
  }, [adaptive, color, isVertical, position]);

  return <View style={viewStyle} className={className} />;
};

export default memo(DividerLine);

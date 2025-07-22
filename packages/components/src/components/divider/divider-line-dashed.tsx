import React, { memo, useCallback, useState } from 'react';
import type { LayoutChangeEvent } from 'react-native';
import { useWindowDimensions, View } from 'react-native';
import { Line, Svg } from 'react-native-svg';
import type { DividerLineProps } from './interface';
import { cn } from '../../lib/utils';

/**
 * 分割线
 */
const DividerLineDashed: React.FC<DividerLineProps> = ({
  position,
  adaptive = true,
  direction = 'horizontal',
  className,
  color,
}) => {
  const isVertical = direction === 'vertical';
  const { width } = useWindowDimensions();

  const [size, setSize] = useState(isVertical ? 12 : width);

  const onLayout = useCallback(
    (e: LayoutChangeEvent) => {
      setSize(e.nativeEvent.layout[isVertical ? 'height' : 'width']);
    },
    [isVertical]
  );

  return (
    <View
      onLayout={onLayout}
      className={cn(className, {
        'flex-1 w-[1px] h-full': isVertical,
        'flex-1 max-w-[auto] mr-[16px]': position === 'left',
        'flex-1 max-w-[auto] ml-[16px]': position === 'right',
        'flex-1 max-w-[10%]': !adaptive,
      })}
    >
      {isVertical ? (
        <Svg width={1} height={size} viewBox={`0 0 1 ${size}`}>
          <Line
            x1='0.5'
            y1='0'
            x2='0.5'
            y2={size}
            strokeWidth={1}
            strokeDasharray='2 2'
            stroke={color}
          />
        </Svg>
      ) : (
        <Svg width={size} height={1} viewBox={`0 0 ${size} 1`}>
          <Line
            x1='0'
            y1='0.5'
            x2={size}
            y2='0.5'
            strokeWidth={1}
            strokeDasharray='2 2'
            stroke={color}
          />
        </Svg>
      )}
    </View>
  );
};

export default memo(DividerLineDashed);

import React, { memo } from 'react';
import isNil from 'lodash/isNil';
import { Text, View } from 'react-native';
import DividerLine from './divider-line';
import DividerLineDashed from './divider-line-dashed';
import type { DividerProps } from './interface';
import { getDefaultValue } from '../../helpers';
import { cn } from '../../lib/utils';

/**
 * Divider 分割线
 * @description 用于将内容分隔为多个区域。
 */
const Divider: React.FC<DividerProps> = ({
  children,
  type = 'light',
  direction = 'horizontal',
  dashed = false,
  color,
  contentPosition = 'center',
  ...restProps
}) => {
  const isVertical = direction === 'vertical';
  const Line = dashed ? DividerLineDashed : DividerLine;

  color = getDefaultValue(color, type === 'dark' ? '#E3E5E8' : '#EFF3F9')!;

  return (
    <View {...restProps} className={cn('flex-row items-center', restProps.className)}>
      {isVertical ? (
        <Line
          color={color}
          position='center'
          direction={direction}
          className={restProps.className}
        />
      ) : !isNil(children) ? (
        <>
          <Line
            color={color}
            position='left'
            adaptive={contentPosition !== 'left'}
            className={restProps.className}
          />

          <Text>{children}</Text>

          <Line
            color={color}
            position='right'
            adaptive={contentPosition !== 'right'}
            className={restProps.className}
          />
        </>
      ) : (
        <Line color={color} position='center' className={restProps.className} />
      )}
    </View>
  );
};

export default memo(Divider);

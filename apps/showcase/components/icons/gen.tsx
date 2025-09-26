import isNil from 'lodash/isNil';
import omit from 'lodash/omit';
import pick from 'lodash/pick';
import React, { memo } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import type { ViewStyle, TouchableWithoutFeedbackProps, ViewProps, ColorValue } from 'react-native';
import type { SvgProps } from 'react-native-svg/lib/typescript/elements/Svg';
import { cn } from '../../lib/utils';
import { cssInterop } from 'nativewind';
import Svg, { Circle, Rect } from 'react-native-svg';

cssInterop(Svg, {
  className: {
    target: 'style',
    nativeStyleToProp: { width: true, height: true },
  },
});

cssInterop(Circle, {
  className: {
    target: 'style',
    nativeStyleToProp: { width: true, height: true, stroke: true, strokeWidth: true, fill: true },
  } as any,
});

cssInterop(Rect, {
  className: {
    target: 'style',
    nativeStyleToProp: { width: true, height: true, stroke: true, strokeWidth: true, fill: true },
  } as any,
});

export interface IconCommonProps extends SvgProps {
  /**
   * 图标大小
   * @default 24
   */
  size?: number;

  /**
   * 图片颜色
   * @default '#5A6068'
   */
  color?: ColorValue;

  /**
   * Outline 的路径宽
   */
  strokeWidth?: number;

  /**
   * svg 内部的样式
   */
  svgStyle?: ViewProps['style'];

  /**
   * 可点击的范围大小
   * @default 44
   */
  touchableSize?: number;
  className?: string;
  iconClassName?: string;
}

export type IconOutlineProps = IconCommonProps;

export type IconFillProps = Omit<IconCommonProps, 'strokeWidth'>;

export type IconColoursProps = Omit<IconCommonProps, 'color'>;

type IconRender = (
  config: { size: number; color?: ColorValue; strokeWidth?: number },
  props: ViewProps
) => React.ReactElement;

const defaultStyle: ViewStyle = {
  alignSelf: 'center',
  justifyContent: 'center',
  alignItems: 'center',
};

const defaultDisabledStyle: ViewStyle = {
  opacity: 0.4,
};

const getDefaultValue = <T,>(value: T, defaultValue: T): T => {
  return value !== undefined ? value : defaultValue;
};

/** 可点击元素的属性字段 */
const touchablePropsFields: (keyof TouchableWithoutFeedbackProps)[] = [
  'delayLongPress',
  'delayPressIn',
  'delayPressOut',
  'disabled',
  'hitSlop',
  'onBlur',
  'onFocus',
  'onLongPress',
  'onPress',
  'onPressIn',
  'onPressOut',
  'pressRetentionOffset',
];

/**
 * 挑选出点击事件的属性
 */
export const pickTouchablePropsField = (
  props: Partial<ViewProps & TouchableWithoutFeedbackProps>
) => {
  return pick(props, touchablePropsFields);
};

/**
 * 排除点击事件的属性
 */
export const omitTouchablePropsField = (props: ViewProps) => {
  return omit(props, touchablePropsFields);
};

/**
 * 生成一个 Outline 类型的 icon 组件
 */
export const genIcon = (render: IconRender): React.FC<IconCommonProps> => {
  return memo(
    ({
      size = 24,
      color = '#5A6068',
      strokeWidth,
      svgStyle,
      touchableSize = 44,
      className,
      iconClassName,
      style,
      hitSlop,
      ...restProps
    }) => {
      const hitSlopSize = (touchableSize - size) / 2;
      const iconHitSlop = getDefaultValue(hitSlop, {
        left: hitSlopSize,
        right: hitSlopSize,
        top: hitSlopSize,
        bottom: hitSlopSize,
      });

      const touchableOpacityProps = pickTouchablePropsField(restProps);
      const svgProps = omitTouchablePropsField(restProps);

      return (
        <TouchableWithoutFeedback {...touchableOpacityProps} hitSlop={iconHitSlop}>
          <View
            className={cn(
              'items-center justify-center',
              restProps.disabled && 'opacity-40',
              className
            )}
            style={style}
            pointerEvents={!isNil(touchableOpacityProps.onPress) ? svgProps.pointerEvents : 'none'}
          >
            {render(
              {
                color,
                size,
                strokeWidth,
              },
              {
                className: iconClassName,
                ...svgProps,
              }
            )}
          </View>
        </TouchableWithoutFeedback>
      );
    }
  );
};

export const genFillIcon = (render: IconRender): React.FC<IconFillProps> => genIcon(render);

export const genOutlineIcon = (render: IconRender): React.FC<IconOutlineProps> => genIcon(render);

export const genColoursIcon = (render: IconRender): React.FC<IconColoursProps> => genIcon(render);

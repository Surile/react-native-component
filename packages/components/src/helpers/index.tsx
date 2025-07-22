import { isValidElement } from 'react';
import { isNil, isUndefined } from 'lodash';
import { Text, TextProps } from 'react-native';

export { default as childrenToArray } from './children/to-array';
export { default as easing } from './easing';

/** 获取默认值 */
export const getDefaultValue = <T,>(value: T, defaultValue: T): T => {
  return !isUndefined(value) ? value : defaultValue;
};

/** 渲染类文字的 JSX */
export const renderTextLikeJSX = (
  node: React.ReactNode,
  className?: string,
  restProps?: Omit<TextProps, 'className'>,
) => {
  return !isNil(node) ? (
    isValidElement(node) ? (
      node
    ) : (
      <Text {...restProps} className={className}>
        {node}
      </Text>
    )
  ) : null;
};

export * from './z-index';
export * from './attach-properties-to-component';
export * from './typeof';
export * from './interceptor';
export * from './arrow';

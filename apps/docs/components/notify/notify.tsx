import isNil from 'lodash/isNil';
import React, { isValidElement, memo } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Popup from '../popup/popup';

import type { NotifyProps } from './interface';
import { cn } from '../../lib/utils';
import { cva } from 'class-variance-authority';

const notifyTypeVar = cva('', {
  variants: {
    type: {
      primary: 'bg-primary-5',
      success: 'bg-success-5',
      error: 'bg-danger-5',
      warning: 'bg-warning-5',
    },
  },
  defaultVariants: {
    type: 'primary',
  },
});

/**
 * Notify 消息提示
 * @description 在页面顶部展示消息提示，支持函数调用和组件调用两种方式。
 * @description 原计划 Notify 的 Props 继承 TouchableWithoutFeedbackProps，更贴近 React Native 提供的组件，这里需要把 Popup 中通用的属性提取出来，如果以后涉及到改动，有点麻烦，等大部分组件完整后看看怎么优化。
 */
const Notify: React.FC<React.PropsWithChildren<NotifyProps>> = ({
  children,
  theme,
  style,
  textClassName,
  type = 'primary',
  message,
  color,
  backgroundColor,
  onPress,
  ...restProps
}) => {
  const insets = useSafeAreaInsets();

  const messageJSX = !isNil(message) ? (
    isValidElement(message) ? (
      message
    ) : (
      <Text
        className={cn('text-xl', textClassName)}
        style={{
          color: !isNil(color) ? color : 'white',
        }}
        numberOfLines={1}
      >
        {message}
      </Text>
    )
  ) : (
    children
  );

  return (
    <Popup {...restProps} overlay={false} position='top'>
      <TouchableWithoutFeedback onPress={onPress}>
        <View
          className={cn(
            'items-center justify-center px-4 py-2',
            notifyTypeVar({ type })
          )}
          style={[
            {
              paddingTop: insets.top > 8 ? insets.top : 8,
            },
            !isNil(backgroundColor) && {
              backgroundColor,
            },
            style,
          ]}
        >
          {messageJSX}
        </View>
      </TouchableWithoutFeedback>
    </Popup>
  );
};

export default memo(Notify);

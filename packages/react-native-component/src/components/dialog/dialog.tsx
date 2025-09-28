import isNil from 'lodash/isNil';
import React, { useRef, useCallback, memo, isValidElement } from 'react';
import { View, Text, Animated } from 'react-native';

import Button from '../button';
import Popup from '../popup/popup';

import type { DialogProps } from './interface';
import { easing, getDefaultValue, renderTextLikeJSX } from '../../helpers';
import { usePersistFn } from '../../hooks';
import { cn } from '../../lib/utils';
import { CrossOutline } from '../icons';

const defaultOnRequestClose = () => {
  return true;
};

/**
 * Dialog 弹出框
 * @description 弹出模态框，常用于消息提示、消息确认，或在当前页面内完成特定的交互操作。
 * @description 弹出框组件支持函数调用和组件调用两种方式。
 */
const Dialog: React.FC<DialogProps> = ({
  children,
  style,
  title,
  message,
  width,
  messageAlign = 'center',
  showConfirmButton = true,
  showCancelButton = false,
  confirmButtonText,
  cancelButtonText,
  confirmTextClassName,
  confirmButtonTextBold = true,
  cancelTextClassName,
  cancelButtonTextBold = false,
  confirmButtonLoading = false,
  cancelButtonLoading = false,
  showClose = false,
  onPressClose,
  buttonReverse = false,
  onPressCancel,
  onPressConfirm,
  duration,
  onOpen: onOpenFn,
  onClose: onCloseFn,
  onRequestClose = defaultOnRequestClose,
  ...resetProps
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const fadeInstance = useRef<Animated.CompositeAnimation | null>(null);

  width = getDefaultValue(width, 300);
  duration = getDefaultValue(duration, 300);

  const showDialog = useCallback(
    (show: boolean) => {
      if (fadeInstance.current) {
        fadeInstance.current.stop();
        fadeInstance.current = null;
      }

      fadeInstance.current = Animated.timing(
        fadeAnim, // 动画中的变量值
        {
          toValue: show ? 1 : 0,
          duration: duration,
          useNativeDriver: true,
          easing: show ? easing.easeOutCirc : easing.easeInCubic,
        }
      );

      fadeInstance.current.start();
    },
    [duration, fadeAnim]
  );
  const onOpenPersistFn = usePersistFn(() => {
    showDialog(true);
    onOpenFn?.();
  });
  const onClosePersistFn = usePersistFn(() => {
    showDialog(false);
    onCloseFn?.();
  });

  const titleJSX = renderTextLikeJSX(
    title,
    cn('text-center text-4xl px-6 pt-6 pb-4 text-gray-800', {
      'pb-0': isNil(message),
    })
  );
  const messageJSX = !isNil(message) ? (
    isValidElement(message) ? (
      message
    ) : (
      <Text
        className={cn('px-6 text-4xl text-gray-800')}
        style={{
          textAlign: messageAlign,
        }}
      >
        {message}
      </Text>
    )
  ) : null;

  const cancelButtonProps = {
    text: cancelButtonText ?? '取消',
    loading: cancelButtonLoading,
    onPress: onPressCancel,
  };

  const confirmButtonProps = {
    text: confirmButtonText ?? '确认',
    loading: confirmButtonLoading,
    onPress: onPressConfirm,
  };

  // TODO 优化逆转按钮变量变换
  const _showCancelButton = buttonReverse ? showConfirmButton : showCancelButton;
  const _showConfirmButton = buttonReverse ? showCancelButton : showConfirmButton;
  const _cancelButtonTextBold = buttonReverse ? confirmButtonTextBold : cancelButtonTextBold;
  const _confirmButtonTextBold = buttonReverse ? cancelButtonTextBold : confirmButtonTextBold;
  const _cancelButtonProps = buttonReverse ? confirmButtonProps : cancelButtonProps;
  const _confirmButtonProps = buttonReverse ? cancelButtonProps : confirmButtonProps;

  console.log('🚀 ~ cn ~ confirmTextClassName:', confirmTextClassName);

  return (
    <Popup
      {...resetProps}
      duration={duration}
      onOpen={onOpenPersistFn}
      onClose={onClosePersistFn}
      onRequestClose={onRequestClose}
    >
      <Animated.View
        className='overflow-hidden bg-white rounded-2xl'
        style={[
          style,
          {
            width,
            transform: [
              {
                scale: fadeAnim.interpolate({
                  inputRange: [0, 0.01, 0.98, 1],
                  outputRange: [0, 0.9, 1.02, 1],
                }),
              },
            ],
          },
        ]}
      >
        {showClose ? (
          <CrossOutline
            className='absolute top-4 right-4'
            onPress={onPressClose}
            color='#11151A'
            size={20}
          />
        ) : null}

        {titleJSX}

        {titleJSX ? (
          messageJSX
        ) : (
          <View className='pt-6 items-center justify-center'>{messageJSX}</View>
        )}

        {children}

        {_showCancelButton || _showConfirmButton ? (
          <View className='flex-row border-t border-gray-200 mt-4'>
            {_showCancelButton ? (
              <Button
                {..._cancelButtonProps}
                type='link'
                size='xl'
                square
                className='flex-1 m-0'
                textClassName={cn(
                  {
                    'font-bold': _cancelButtonTextBold,
                  },
                  cancelTextClassName
                )}
              />
            ) : null}
            {_showConfirmButton ? (
              <Button
                {..._confirmButtonProps}
                type='link'
                size='xl'
                square
                className={cn('flex-1 m-0', {
                  'border-l border-gray-200': _showCancelButton,
                })}
                textClassName={cn(
                  {
                    'font-bold': _confirmButtonTextBold,
                  },
                  confirmTextClassName
                )}
              />
            ) : null}
          </View>
        ) : null}
      </Animated.View>
    </Popup>
  );
};

export default memo(Dialog);

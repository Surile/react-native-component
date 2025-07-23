import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { cva } from 'class-variance-authority';
import noop from 'lodash/noop';
import { Animated, BackHandler, Easing, StyleProp, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getPosition, getTransform } from './helper';
import { PopupProps, State } from './types';
import { cn } from '../../lib/utils';
import { usePersistFn } from '../../hooks';
import * as helpers from '../../helpers';
import Overlay from '../overlay';

const popupPositionVariants = cva('absolute h-auto', {
  variants: {
    position: {
      center: 'inset-0 size-full items-center justify-center bg-transparent opacity-100',
      left: 'inset-y-0 left-0 w-1/2',
      right: 'inset-y-0 right-0 w-1/2',
      top: 'inset-x-0 top-0 min-h-48',
      bottom: 'inset-x-0 bottom-0 min-h-48',
    },
  },
  defaultVariants: {
    position: 'center',
  },
});

/**
 * Popup 弹出层
 * @description 弹出层容器，用于展示弹窗、信息提示等内容，支持多个弹出层叠加展示。
 */
const Popup: React.FC<PopupProps> = ({
  children,
  style,
  className,
  visible = false,
  overlay = true,
  duration,
  closeOnPressOverlay = true,
  position = 'center',
  round = false,
  safeAreaInsetBottom = false,
  safeAreaInsetTop = false,
  lazyRender = true,
  destroyOnClosed = false,
  onPressOverlay: onPressOverlayFn,
  onOpen: onOpenFn,
  onOpened: onOpenedFn,
  onClose: onCloseFn,
  onClosed: onClosedFn,
  onRequestClose,
  overlayClassName,
}) => {
  const insets = useSafeAreaInsets();
  const onPressOverlayPersistFn = usePersistFn(onPressOverlayFn || noop);
  const onOpenPersistFn = usePersistFn(onOpenFn || noop);
  const onOpenedPersistFn = usePersistFn(onOpenedFn || noop);
  const onClosePersistFn = usePersistFn(onCloseFn || noop);
  const onClosedPersistFn = usePersistFn(onClosedFn || noop);

  duration = helpers.getDefaultValue(duration, 300);

  const [state, setState] = useState<State>({
    visible,
    // 遮罩层显示、隐藏单独管理，避免弹出层完成后才触发关闭，两个组件应该同时变化
    overlayVisible: visible,
    zIndex: helpers.getNextZIndex(),
    lazyRender,
  });

  const MountedRef = useRef(false);

  const fadeAnim = useRef(new Animated.Value(getPosition(visible, position))).current;
  const fadeInstance = useRef<Animated.CompositeAnimation | null>(null);

  duration = helpers.getDefaultValue(duration, 300);

  // 监听状态变化，执行动画
  useEffect(() => {
    if (visible) {
      // 弹出弹出，立即响应
      setState({
        visible,
        zIndex: helpers.getNextZIndex(),
        lazyRender: false,
      });
    }

    // 遮罩层状态实时显示
    setState({
      overlayVisible: visible,
    });

    if (MountedRef.current) {
      fadeAnim.setValue(getPosition(!visible, position));

      if (visible) {
        onOpenPersistFn();
      } else {
        onClosePersistFn();
      }

      console.log('getPosition(visible, position)', getPosition(visible, position));

      fadeInstance.current = Animated.timing(
        fadeAnim, // 动画中的变量值
        {
          toValue: getPosition(visible, position),
          duration,
          useNativeDriver: true,
          easing: visible
            ? Easing.bezier(0.075, 0.82, 0.165, 1.0)
            : Easing.bezier(0.075, 0.82, 0.165, 1.0),
        }
      );

      fadeInstance.current.start(({ finished }) => {
        if (finished) {
          fadeInstance.current = null;

          if (!visible) {
            setState({ visible, lazyRender: destroyOnClosed });
            onClosedPersistFn();
          } else {
            onOpenedPersistFn();
          }
        }
      });
    }

    return () => {
      // 停止动画
      if (fadeInstance.current) {
        fadeInstance.current.stop();
        fadeInstance.current = null;
      }
    };
  }, [
    destroyOnClosed,
    duration,
    fadeAnim,
    position,
    onClosedPersistFn,
    onClosePersistFn,
    onOpenedPersistFn,
    onOpenPersistFn,
    visible,
  ]);

  /** 点击遮罩层 */
  const onPressOverlay = useCallback(() => {
    if (closeOnPressOverlay) {
      // 关闭弹层
      onPressOverlayPersistFn();
    }
  }, [closeOnPressOverlay, onPressOverlayPersistFn]);

  // 初始化好组件
  useEffect(() => {
    MountedRef.current = true;
  }, []);

  // Android 返回按钮
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (typeof onRequestClose === 'function' && visible) {
        return onRequestClose();
      }

      return false;
    });

    return () => backHandler.remove();
  }, [onRequestClose, visible]);

  if (state.lazyRender) {
    return null;
  }

  const popupStyles: StyleProp<ViewStyle> = [
    {
      paddingBottom: visible && safeAreaInsetBottom ? insets.bottom : 0,
      paddingTop: visible && safeAreaInsetTop ? insets.top : 0,
    },
    style,
    getTransform(position, fadeAnim),
  ];

  return (
    <>
      {overlay ? (
        <Overlay
          overlayClassName={overlayClassName}
          visible={state.overlayVisible}
          duration={duration}
          onPress={onPressOverlay}
        />
      ) : null}

      <Animated.View
        style={popupStyles}
        className={cn(
          'relative h-0 overflow-hidden bg-white z-10',
          popupPositionVariants({ position }),
          {
            'rounded-tl-2xl': (position === 'bottom' && round) || (position === 'right' && round),
            'rounded-tr-2xl': (position === 'bottom' && round) || (position === 'left' && round),
            'rounded-bl-2xl': (position === 'top' && round) || (position === 'right' && round),
            'rounded-br-2xl': (position === 'top' && round) || (position === 'left' && round),
          },
          className
        )}
        pointerEvents={position !== 'center' ? undefined : 'box-none'}
      >
        {children}
      </Animated.View>
    </>
  );
};

export default memo(Popup);

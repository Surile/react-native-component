import { cva } from 'class-variance-authority';
import React, { memo, useEffect, useRef } from 'react';
import { Animated, Easing, Keyboard, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { cn } from '../../lib/utils';
import type { BottomBarProps } from './interface';

const bottomBarVariants = cva('overflow-hidden', {
  variants: {
    divider: {
      true: 'border-t border-line-1',
    },
  },
  defaultVariants: {
    divider: true,
  },
});

const BottomBar: React.FC<BottomBarProps> = ({
  safeAreaInsetBottom = true,
  backgroundColor = 'bg-fill-white',
  height = 50,
  hidden = false,
  keyboardShowNotRender = true,
  divider = true,
  style,
  className,
  ...restProps
}) => {
  const { bottom } = useSafeAreaInsets();
  const realHeight = height + (safeAreaInsetBottom ? bottom : 0);
  const heightAnimated = useRef(new Animated.Value(realHeight));

  useEffect(() => {
    if (keyboardShowNotRender && Platform.OS === 'android') {
      const keyboardDidShow = Keyboard.addListener('keyboardDidShow', () => {
        Animated.timing(heightAnimated.current, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
          easing: Easing.bezier(0.755, 0.05, 0.855, 0.06),
        }).start();
      });
      const keyboardDidHide = Keyboard.addListener('keyboardDidHide', () => {
        Animated.timing(heightAnimated.current, {
          toValue: realHeight,
          duration: 100,
          useNativeDriver: false,
          delay: 200,
        }).start();
      });

      return () => {
        keyboardDidShow.remove();
        keyboardDidHide.remove();
      };
    }
  }, [keyboardShowNotRender, realHeight]);

  if (hidden) {
    return null;
  }

  return (
    <Animated.View
      {...restProps}
      style={[
        { height: heightAnimated.current },
        { paddingBottom: safeAreaInsetBottom ? bottom : 0 },
        style,
      ]}
      className={cn(bottomBarVariants({ divider }), backgroundColor, className)}
    />
  );
};

export default memo(BottomBar);

import React, { memo, useEffect, useRef } from 'react';
import { cssInterop } from 'nativewind';
import { Animated, Easing, View, ViewProps } from 'react-native';
import { cn } from '../../lib/utils';

cssInterop(Animated.View, {
  className: 'style',
});

export interface SpinnerProps extends ViewProps {
  /**
   * 大小
   */
  size?: number;

  /**
   * 颜色
   */
  colorClassName?: string;
}

const PETAL_COUNT = 8;
const PETALS = new Array(PETAL_COUNT).fill(0);
const A_OPACITY = 1 / PETAL_COUNT;
const A_ROTATE = 360 / PETAL_COUNT;

const useLoop = (
  AnimatedValue: Animated.Value,
  initValue: number,
  config: Pick<Animated.TimingAnimationConfig, 'toValue' | 'duration' | 'easing'>
) => {
  useEffect(() => {
    const spinAnimation = Animated.timing(AnimatedValue, {
      toValue: config.toValue,
      duration: config.duration,
      easing: config.easing,
      useNativeDriver: true,
    });

    Animated.loop(spinAnimation).start();
  }, [AnimatedValue, initValue, config.duration, config.toValue, config.easing]);
};

const Spinner: React.FC<SpinnerProps> = ({
  size = 24,
  colorClassName = 'bg-primary-7',
  ...restProps
}) => {
  const AnimatedSpinnerValue = useRef(new Animated.Value(0)).current;

  useLoop(AnimatedSpinnerValue, 0, {
    toValue: 1,
    duration: 800,
    easing: Easing.linear,
  });

  return (
    <Animated.View
      className={cn('relative justify-center items-center', restProps.className)}
      style={{
        width: size,
        height: size,
        transform: [
          {
            rotateZ: AnimatedSpinnerValue.interpolate({
              inputRange: [0, 1],
              outputRange: ['0deg', '360deg'],
            }),
          },
        ],
      }}
      {...restProps}
    >
      {PETALS.map((_, i) => {
        return (
          <View
            key={i}
            style={{
              opacity: A_OPACITY * (i + 1),
              transform: [
                {
                  rotate: `${A_ROTATE * i}deg`,
                },
              ],
            }}
            className={cn('absolute top-0 left-0 bottom-0 right-0 items-center')}
          >
            <View className={cn('h-[30%] w-[2px]', colorClassName)} />
          </View>
        );
      })}
    </Animated.View>
  );
};

export default memo(Spinner);

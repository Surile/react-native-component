import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

interface UseLoopOptions {
  duration?: number;
  fromValue?: number;
  toValue?: number;
  useNativeDriver?: boolean;
}

export const useLoop = ({
  duration = 1000,
  fromValue = 0,
  toValue = 1,
  useNativeDriver = false,
}: UseLoopOptions = {}) => {
  const animation = useRef(new Animated.Value(fromValue)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue,
          duration,
          useNativeDriver,
        }),
        Animated.timing(animation, {
          toValue: fromValue,
          duration,
          useNativeDriver,
        }),
      ])
    ).start();

    return () => {
      animation.stopAnimation();
    };
  }, [animation, duration, fromValue, toValue, useNativeDriver]);

  return animation;
}; 
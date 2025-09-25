import React, { useState, useCallback, useRef, useEffect, memo } from 'react';
import type { LayoutChangeEvent, ViewStyle } from 'react-native';
import { View, Text, Animated } from 'react-native';

import type { ProgressProps } from './interface';
import { usePersistFn } from '../../hooks';
import { easing, getDefaultValue } from '../../helpers';

type ViewLayout = { width: number; height: number };

/**
 * Progress 进度条
 */
const Progress: React.FC<ProgressProps> = ({
  testID,
  percentage = 0,
  pivotText,
  color,
  trackColor,
  pivotColor,
  textColor,
  strokeHeight,
  inactive = false,
  showPivot = true,
  square = false,
  animated = false,
  animationDuration,
  onAnimationEnd,
}) => {
  const AnimatedValue = useRef(new Animated.Value(0)).current;
  const StartPercentage = useRef(percentage);
  const onAnimationEndPersistFn = usePersistFn((n: number) => {
    onAnimationEnd?.(n);
  });

  // 默认值
  color = getDefaultValue(color, '#4080FF');

  if (inactive) {
    color = '#cacaca';
  }

  trackColor = getDefaultValue(trackColor, '#EDEFF2');
  pivotColor = getDefaultValue(pivotColor, color);
  textColor = getDefaultValue(textColor, '#FFFFFF');
  pivotText = getDefaultValue(pivotText, `${percentage}%`);
  strokeHeight = getDefaultValue(strokeHeight, 4)!;
  animationDuration = getDefaultValue(animationDuration, 300);

  const borderRadius = square ? 0 : strokeHeight / 2;

  const [progressLayout, setProgressLayout] = useState<ViewLayout>({
    width: 0,
    height: 0,
  });
  const [textLayout, setTextLayout] = useState<ViewLayout>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const action = Animated.timing(AnimatedValue, {
      toValue: (progressLayout.width * percentage) / 100,
      duration: animated ? animationDuration : 0,
      easing: easing.easeInCubic,
      useNativeDriver: false,
    });

    action.start(({ finished }) => {
      if (finished) {
        onAnimationEndPersistFn(percentage);
      }
    });

    return () => {
      action.stop();
    };
  }, [
    AnimatedValue,
    percentage,
    animationDuration,
    progressLayout.width,
    animated,
    onAnimationEndPersistFn,
  ]);

  const barStyle: ViewStyle = {
    position: 'absolute',
    left: 0,
    top: 0,
    width: AnimatedValue as unknown as number,
    height: strokeHeight,
    backgroundColor: color,
    borderRadius: borderRadius,
  };
  const textBoxStyle: ViewStyle = {
    position: 'absolute',
    left: AnimatedValue as unknown as number,
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: pivotColor,
    paddingHorizontal: 4,
    borderRadius: 9999,
    transform: [
      {
        translateX: -textLayout.width / 2,
      },
      {
        translateY: -(textLayout.height - strokeHeight) / 2,
      },
    ],
  };

  const onLayoutProgress = useCallback(
    (e: LayoutChangeEvent) => {
      AnimatedValue.setValue((e.nativeEvent.layout.width * StartPercentage.current) / 100);
      setProgressLayout(e.nativeEvent.layout);
    },
    [AnimatedValue]
  );

  const onLayoutText = useCallback((e: LayoutChangeEvent) => {
    setTextLayout(e.nativeEvent.layout);
  }, []);

  return (
    <View
      testID={testID}
      onLayout={onLayoutProgress}
      style={{
        height: strokeHeight,
        backgroundColor: trackColor,
        borderRadius: borderRadius,
      }}
    >
      <Animated.View style={barStyle} />
      {showPivot ? (
        <Animated.View onLayout={onLayoutText} style={textBoxStyle}>
          <Text
            style={{
              color: textColor,
              fontSize: 12,
              lineHeight: 1.6 * 12,
            }}
          >
            {pivotText}
          </Text>
        </Animated.View>
      ) : null}
    </View>
  );
};

export default memo(Progress);

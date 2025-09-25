import isBoolean from 'lodash/isBoolean';
import isNil from 'lodash/isNil';
import { memo, useMemo, useRef } from 'react';
import { View, Animated, useWindowDimensions, PanResponder } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Divider from '../divider';
import type { FloatingPanelProps } from './interface';
import { getDefaultValue, renderTextLikeJSX } from '../../helpers';
import { cn } from '../../lib/utils';

const FloatingPanel: React.FC<React.PropsWithChildren<FloatingPanelProps>> = ({
  anchorStart,
  anchorEnd,
  title,
  titleDivider = true,
  offsetThreshold = 0.2,
  zIndex = 10,
  draggingOnContent = true,
  onAnimationEnd,
  _onMoveShouldSetPanResponder,

  children,
  ...restProps
}) => {
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();

  const hasTitle = !isNil(title);

  const _anchorStart = getDefaultValue(anchorStart, insets.bottom + 12 * 2 + (hasTitle ? 18 : 0))!;
  const _anchorEnd = getDefaultValue(anchorEnd, height - insets.top)!;
  const yMax = _anchorEnd - _anchorStart;
  const yMin = 0;

  const PanAnimated = useRef(new Animated.Value(yMax));
  const Anchor = useRef(_anchorEnd - _anchorStart);

  const panResponder = useMemo(() => {
    return PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        const stop = _onMoveShouldSetPanResponder?.(_, gestureState);

        if (isBoolean(stop)) {
          return stop;
        }

        if (Anchor.current === yMin && gestureState.dy < 0) {
          return false;
        }
        return true;
      },
      onPanResponderMove: (e, gestureState) => {
        let newValue = Anchor.current + gestureState.dy;
        if (newValue > yMax) {
          newValue = yMax;
          e.stopPropagation();
        }
        if (newValue < yMin) {
          newValue = yMin;
          e.stopPropagation();
        }

        PanAnimated.current.setValue(newValue);
      },
      onPanResponderRelease: (_, gestureState) => {
        const triggered = Math.abs(gestureState.dy) >= _anchorEnd * offsetThreshold;
        const newValue = triggered ? (gestureState.dy < 0 ? yMin : yMax) : Anchor.current;

        Animated.timing(PanAnimated.current, {
          toValue: newValue, // 设置动画的属性值
          useNativeDriver: true,
          duration: 200,
        }).start(({ finished }) => {
          if (finished) {
            Anchor.current = newValue;
            onAnimationEnd?.(newValue === yMin);
          }
        });
      },
    });
  }, [_anchorEnd, _onMoveShouldSetPanResponder, offsetThreshold, onAnimationEnd, yMax]);

  return (
    <Animated.View
      {...restProps}
      {...(draggingOnContent ? panResponder.panHandlers : undefined)}
      className={cn(
        'rounded-tl-2xl rounded-tr-2xl bg-white absolute left-0 right-0 bottom-0 overflow-hidden',
        restProps.className
      )}
      style={[
        {
          zIndex,
          height: _anchorEnd,
          transform: [
            {
              translateY: PanAnimated.current,
            },
          ],
        },
        restProps.style,
      ]}
    >
      <View className='px-3' {...(!draggingOnContent ? panResponder.panHandlers : undefined)}>
        {renderTextLikeJSX(title, cn('text-4xl'))}
        <View className='absolute w-6 h-1 bg-[#6F6F6F] rounded-sm top-[10px] left-1/2 -ml-3' />
      </View>
      {titleDivider ? <Divider /> : null}
      {children}
    </Animated.View>
  );
};

export default memo(FloatingPanel);

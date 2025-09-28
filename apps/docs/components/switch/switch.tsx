import isUndefined from 'lodash/isUndefined';
import React, { useEffect, useRef, useMemo, memo, JSX } from 'react';
import type { ViewStyle, ViewProps } from 'react-native';
import { TouchableWithoutFeedback, Animated, View } from 'react-native';

import type { SwitchProps } from './interface';
import { useControllableValue, useDifferentState, usePersistFn } from '../../hooks';
import { callInterceptor, getDefaultValue, renderTextLikeJSX } from '../../helpers';
import { ExcludeUndefined } from '../../helpers/types';
import { cn } from '../../lib/utils';
import Loading from '../loading';

/**
 * Switch 开关
 * @description 用于在打开和关闭状态之间进行切换。
 */
function Switch<ActiveValueT = boolean, InactiveValueT = boolean>({
  size,
  disabled = false,
  loading = false,
  activeValue = true as unknown as ActiveValueT,
  inactiveValue = false as unknown as InactiveValueT,
  activeColor,
  inactiveColor,
  activeChildren,
  inactiveChildren,
  onPress,
  beforeChange,
  testID,
  ...restProps
}: SwitchProps<ActiveValueT, InactiveValueT>) {
  const translateX = useRef(new Animated.Value(0));
  const [value, onChange] = useControllableValue<ActiveValueT | InactiveValueT>(restProps, {
    defaultValue: inactiveValue,
  });
  const unitSize = getDefaultValue(size, 30)!;
  const nodeEdgeDistance = 2;

  const [switchWidth, setSwitchWidth] = useDifferentState(unitSize * 2);
  const [switchHeight, nodeSize, translateXValueEnd, translateXValueStart] = useMemo(() => {
    const _switchHeight = unitSize * 1;
    const _nodeSize = unitSize * 1;
    const _isInnerNode = _switchHeight - _nodeSize < nodeEdgeDistance * 2;
    const _nodeRealSize = _isInnerNode ? _nodeSize - nodeEdgeDistance * 2 : _nodeSize;
    const _innerPadding = _isInnerNode ? nodeEdgeDistance : (_switchHeight - _nodeSize) / 2;
    const _translateXValueEnd = switchWidth - _nodeRealSize - _innerPadding;
    const _translateXValueStart = _innerPadding;

    return [_switchHeight, _nodeRealSize, _translateXValueEnd, _translateXValueStart];
  }, [switchWidth, unitSize]);

  const active = value === activeValue;

  const onPressTouchable = () => {
    onPress?.();
    if (!disabled && !loading) {
      const newValue = active ? inactiveValue : activeValue;
      callInterceptor(beforeChange, {
        args: [newValue],
        done: () => {
          onChange(newValue);
        },
      });
    }
  };

  useEffect(() => {
    const actionValue = Animated.timing(
      translateX.current, // 动画中的变量值
      {
        toValue: active ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
      }
    );

    actionValue.start();

    return () => {
      // 停止动画
      if (actionValue) {
        actionValue.stop();
      }
    };
  }, [active]);

  const nodeStyleSummary: ViewStyle[] = [
    {
      top: nodeEdgeDistance,
      width: nodeSize,
      height: nodeSize,
      borderRadius: nodeSize / 2,
      transform: [
        {
          translateX: translateX.current.interpolate({
            inputRange: [0, 1],
            outputRange: [translateXValueStart, translateXValueEnd],
          }) as any,
        },
      ],
    },
  ];

  const childrenMinEdgeDistance = switchHeight / 3;
  const childrenMaxEdgeDistance = nodeSize + nodeEdgeDistance * 3;
  const activeChildrenStyle: ViewStyle = {
    height: switchHeight,
    paddingLeft: childrenMinEdgeDistance,
    paddingRight: childrenMaxEdgeDistance,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [
      {
        translateX: translateX.current.interpolate({
          inputRange: [0, 1],
          outputRange: [-switchWidth, 0],
        }) as any,
      },
    ],
  };
  const inactiveChildrenStyle: ViewStyle = {
    marginTop: -switchHeight,
    height: switchHeight,
    paddingLeft: childrenMaxEdgeDistance,
    paddingRight: childrenMinEdgeDistance,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [
      {
        translateX: translateX.current.interpolate({
          inputRange: [0, 1],
          outputRange: [0, switchWidth],
        }) as any,
      },
    ],
  };

  const onLayoutChildren = usePersistFn<ExcludeUndefined<ViewProps['onLayout']>>((e) => {
    setSwitchWidth((v) => Math.max(v, e.nativeEvent.layout.width));
  });

  const activeChildrenJSX = renderTextLikeJSX(activeChildren, cn('text-lg text-white'));
  const inactiveChildrenJSX = renderTextLikeJSX(inactiveChildren, cn('text-lg text-white'));

  return (
    <TouchableWithoutFeedback onPress={onPressTouchable} testID={testID}>
      <View className='flex-row overflow-visible' collapsable={false}>
        <View
          className={cn('relative', {
            'opacity-60': disabled,
          })}
          style={{
            minWidth: switchWidth,
            height: switchHeight,
            borderRadius: switchHeight / 2,
            // 当前过渡不支持 color/backgroundColor
            // 参考：https://stackoverflow.com/a/60586628
            backgroundColor: active ? activeColor || '#4080FF' : inactiveColor || '#B9BEC5',
          }}
          collapsable={false}
        >
          <Animated.View
            className='absolute items-center justify-center bg-white'
            style={nodeStyleSummary}
          >
            {loading ? (
              <Loading
                size={(nodeSize / 4) * 3}
                color={
                  active
                    ? !isUndefined(activeColor)
                      ? activeColor
                      : '#4080FF'
                    : !isUndefined(inactiveColor)
                    ? inactiveColor
                    : '#8C9199'
                }
              />
            ) : null}
          </Animated.View>
          <View className='relative overflow-hidden' collapsable={false}>
            <Animated.View style={activeChildrenStyle} onLayout={onLayoutChildren}>
              {activeChildrenJSX}
            </Animated.View>
            <Animated.View style={inactiveChildrenStyle} onLayout={onLayoutChildren}>
              {inactiveChildrenJSX}
            </Animated.View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default memo(Switch) as <ActiveValueT = boolean, InactiveValueT = boolean>(
  p: SwitchProps<ActiveValueT, InactiveValueT>
) => JSX.Element;

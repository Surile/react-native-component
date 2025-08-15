import { JSX, memo, useCallback, useEffect, useRef, useState } from 'react';
import isNil from 'lodash/isNil';
import isNumber from 'lodash/isNumber';
import type { LayoutChangeEvent, LayoutRectangle } from 'react-native';
import { ScrollView, Text, TouchableOpacity, Animated } from 'react-native';
import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import type { TabBarProps, TabValue } from './interface';
import BottomBar from '../bottom-bar';
import { useControllableValue, useOriginalDeepCopy, useUpdateEffect } from '../../hooks';
import { cn } from '../../lib/utils';

const TabBar = <T extends TabValue>({
  options,
  indicator = false,
  indicatorWidth,
  indicatorHeight = 3,
  tabAlign = 'center',
  labelBulge = false,
  height,
  className,
  textClassName,
  textActiveClassName,
  indicatorClassName,
  divider = true,
  ...restProps
}: TabBarProps<T>) => {
  const _labelBulge = isNumber(labelBulge) ? labelBulge : labelBulge ? 1.2 : 0;
  const tabNum = options?.length;
  const isTabAdaption = tabAlign === 'center';
  const isTabTextCompact = isNil(indicatorWidth);
  const isIndicatorWidthLayout = isTabTextCompact || indicatorWidth === 0;
  const [value, onChange] = useControllableValue(restProps, {
    defaultValue: options?.[0]?.value,
  });

  const optionsDeepCopy = useOriginalDeepCopy(options);
  const [state, setState] = useState({
    layoutFinish: false,
  });
  const layouts = useRef<{ tab: LayoutRectangle; text: LayoutRectangle }[]>(
    new Array(tabNum).fill({})
  );

  const AnimatedIndicatorLeft = useRef(new Animated.Value(0));
  const AnimatedIndicatorWidth = useRef(new Animated.Value(0));
  const ScrollViewRef = useRef<ScrollView>(null);
  const ScrollViewWidthRef = useRef(0);

  if (indicator && isNil(height)) {
    height = 40;
  }

  const navigateTo = useCallback(
    (n: number) => {
      const targetLayout = layouts.current[n];
      const left =
        targetLayout.tab.x +
        (targetLayout.tab.width -
          (isIndicatorWidthLayout ? targetLayout.text.width : indicatorWidth)) /
          2;
      const width = isIndicatorWidthLayout ? targetLayout.text.width : indicatorWidth;

      Animated.parallel([
        Animated.timing(AnimatedIndicatorLeft.current, {
          toValue: left,
          useNativeDriver: false,
          duration: 300,
        }),
        Animated.timing(AnimatedIndicatorWidth.current, {
          toValue: width,
          useNativeDriver: false,
          duration: 300,
        }),
      ]).start();

      if (!isTabAdaption) {
        const hh = ScrollViewWidthRef.current / 2;
        ScrollViewRef.current?.scrollTo({
          x: targetLayout.tab.x + targetLayout.tab.width / 2 - hh,
          animated: true,
        });
      }
    },
    [indicatorWidth, isIndicatorWidthLayout, isTabAdaption]
  );

  const initIndicator = useCallback(() => {
    const layoutItems = layouts.current.filter((item) => item.tab && item.text);

    if (layoutItems.length === layouts.current.length) {
      setState((s) => ({
        ...s,
        layoutFinish: true,
      }));
    }
  }, []);

  useUpdateEffect(() => {
    setState({
      layoutFinish: false,
    });
  }, [optionsDeepCopy]);

  useEffect(() => {
    if (state.layoutFinish) {
      const n = optionsDeepCopy.findIndex((item) => item.value === value);

      navigateTo(n);
    }
  }, [value, optionsDeepCopy, state.layoutFinish, navigateTo]);

  const onLayoutScrollView = useCallback((e: LayoutChangeEvent) => {
    ScrollViewWidthRef.current = e.nativeEvent.layout.width;
  }, []);

  const genOnPress = (v: T) => () => {
    onChange(v);
  };

  const genOnLayoutTab = (i: number) => (e: LayoutChangeEvent) => {
    layouts.current[i] = {
      text: layouts.current[i]?.text,
      tab: e.nativeEvent.layout,
    };

    initIndicator();
  };

  const genOnLayoutText = (i: number) => (e: LayoutChangeEvent) => {
    layouts.current[i] = {
      tab: layouts.current[i]?.tab,
      text: e.nativeEvent.layout,
    };

    initIndicator();
  };

  const tabs = optionsDeepCopy.map((item, index) => {
    const isActive = item.value === value;

    return (
      <TouchableOpacity
        key={item.value}
        className={cn('items-center justify-center h-full px-2', {
          'flex-1': isTabAdaption,
          'flex-col items-center': item.iconRender,
        })}
        activeOpacity={0.6}
        onPress={isActive ? undefined : genOnPress(item.value)}
        onLayout={genOnLayoutTab(index)}
      >
        {item.iconRender?.(isActive)}
        {item.label ? (
          <Text
            className={cn('text-lg', {
              'w-full text-center': isTabTextCompact,
              'mt-1 text-lg': item.iconRender,
              'text-primary-5 font-medium': isActive,
              'text-gray-400 font-normal': !isActive,
            })}
            style={[
              isActive && !!_labelBulge
                ? {
                    transform: [
                      {
                        scaleX: _labelBulge,
                      },
                      {
                        scaleY: _labelBulge,
                      },
                    ],
                  }
                : {},
            ]}
            onLayout={genOnLayoutText(index)}
          >
            {item.label}
            {!isNil(item.badge) ? (
              <Text className='text-base text-red-400'>
                {/* React Native Text not support padding or margin, https://reactnative.dev/docs/text.html#containers */}{' '}
                {item.badge}
              </Text>
            ) : null}
          </Text>
        ) : null}
      </TouchableOpacity>
    );
  });

  const indicatorJSX =
    indicator && state.layoutFinish ? (
      <Animated.View
        className={cn('bg-primary-5 rounded-full absolute bottom-0 mb-[1px]', indicatorClassName)}
        style={[
          {
            height: indicatorHeight,
            width: AnimatedIndicatorWidth.current,
            left: AnimatedIndicatorLeft.current,
          },
        ]}
      />
    ) : null;

  return (
    <BottomBar
      className={cn('flex-row items-center justify-center', className)}
      {...restProps}
      height={height}
      divider={divider}
    >
      {isTabAdaption ? (
        <>
          {tabs}
          {indicatorJSX}
        </>
      ) : (
        <ScrollView
          onLayout={onLayoutScrollView}
          ref={ScrollViewRef}
          horizontal
          bounces={false}
          className='h-full'
          contentContainerClassName={cn({
            'item-center px-2 justify-center min-w-full': _labelBulge,
            'item-center px-2': !_labelBulge,
          })}
          showsHorizontalScrollIndicator={false}
        >
          {indicatorJSX}
          {tabs}
        </ScrollView>
      )}
    </BottomBar>
  );
};

export default memo(TabBar) as <T extends TabValue>(p: TabBarProps<T>) => JSX.Element;

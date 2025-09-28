import isUndefined from 'lodash/isUndefined';
import React, { useRef, useCallback, useEffect, memo } from 'react';
import type { LayoutChangeEvent } from 'react-native';
import { Animated, View } from 'react-native';

import Card from '../card';
import Cell from '../cell';
import Divider from '../divider';

import type { CollapseProps } from './interface';
import { easing, getArrowOutline, getDefaultValue } from '../../helpers';
import { useControllableValue, usePersistFn } from '../../hooks';
import { cn } from '../../lib/utils';

/**
 * Collapse 折叠面板
 */
const Collapse: React.FC<CollapseProps> = ({
  children,
  title,
  titleClassName,
  titleTextClassName,
  iconStyle,
  iconColor,
  iconSize,
  bodyClassName,
  renderTitle,
  renderTitleExtra,
  renderBody,
  type = 'cell',
  onAnimationEnd,
  bodyPadding = true,
  headerDivider = true,
  bodyDivider,
  lazyRender = true,
  square = true,

  testID,

  ...restProps
}) => {
  bodyDivider = getDefaultValue(bodyDivider, type === 'cell');

  const [collapse, onCollapse] = useControllableValue(restProps, {
    defaultValuePropName: 'defaultCollapse',
    valuePropName: 'collapse',
    trigger: 'onCollapse',
    defaultValue: false,
  });
  const onAnimationEndPersistFn = usePersistFn((v: boolean) => {
    onAnimationEnd?.(v);
  });
  /** 记录当前是否可见，在不断 onLayout 的时候可以有一个判断的依据 */
  const Visible = useRef(collapse);
  const BodyHeight = useRef(0);
  const MountedRef = useRef(false);
  const AnimatedValue = useRef(new Animated.Value(0)).current;
  const toggleBody = useCallback(
    (v: boolean, immediately: boolean) => {
      const action = Animated.timing(AnimatedValue, {
        toValue: v ? BodyHeight.current : 0,
        duration: immediately ? 0 : 300,
        useNativeDriver: false,
        easing: v ? easing.easeOutCirc : easing.easeInCubic,
      });

      action.start(({ finished }) => {
        if (finished) {
          onAnimationEndPersistFn(v);
        }
      });
    },
    [AnimatedValue, onAnimationEndPersistFn]
  );

  // 初始化好组件
  useEffect(() => {
    MountedRef.current = true;
  }, []);

  useEffect(() => {
    // 同步当前的状态
    Visible.current = collapse;

    toggleBody(collapse, false);
  }, [collapse, toggleBody]);

  const onPressTitle = useCallback(() => {
    onCollapse(!Visible.current);
  }, [onCollapse]);

  const onLayoutBody = useCallback(
    (e: LayoutChangeEvent) => {
      // 有点疑惑，折叠的过程中，高度在动态变化，通过 absolute 布局解决无法完全渲染
      BodyHeight.current = e.nativeEvent.layout.height;
      console.log('🚀 ~ Collapse ~ e.nativeEvent.layout.height:', e.nativeEvent.layout.height);
      // 展开的过程中才会存在动态高度
      if (Visible.current) {
        // 当收齐的时候已知高度
        toggleBody(Visible.current, Visible.current);
      }
    },
    [toggleBody]
  );

  const ArrowOutline = getArrowOutline(collapse ? 'up' : 'down');
  const arrowJSX = (
    <ArrowOutline
      style={iconStyle}
      color={!isUndefined(iconColor) ? iconColor : '#8C9199'}
      size={!isUndefined(iconSize) ? iconSize : 16}
    />
  );
  const titleJSX = renderTitle ? renderTitle(collapse) : title;
  const titleExtraJSX = renderTitleExtra ? renderTitleExtra(collapse, arrowJSX) : arrowJSX;
  const bodyJSX =
    lazyRender && !MountedRef.current && !collapse ? null : renderBody ? renderBody() : children;
  console.log('🚀 ~ cn ~ AnimatedValue:', AnimatedValue);

  const ctxJSX = (
    <Animated.View className={cn('overflow-hidden bg-white')} style={{ height: AnimatedValue }}>
      <View
        collapsable={false}
        className={cn('absolute left-0 right-0 top-0')}
        onLayout={onLayoutBody}
      >
        <View
          className={cn(
            {
              'p-3': bodyPadding,
            },
            bodyClassName
          )}
        >
          {bodyJSX}
        </View>

        {bodyDivider ? <Divider type='light' className='mx-3' /> : null}
      </View>
    </Animated.View>
  );

  if (type === 'card') {
    return (
      <Card
        square={square}
        title={titleJSX}
        extra={titleExtraJSX}
        headerDivider={headerDivider}
        titleClassName={titleClassName}
        titleTextClassName={titleTextClassName}
        bodyPadding={false}
        onPressHeader={onPressTitle}
        testID={testID}
      >
        {ctxJSX}
      </Card>
    );
  }

  return (
    <>
      <Cell
        title={titleJSX}
        titleClassName={titleClassName}
        titleTextClassName={titleTextClassName}
        valueExtra={titleExtraJSX}
        onPress={onPressTitle}
        divider={headerDivider}
        testID={testID}
      />
      {ctxJSX}
    </>
  );
};

export default memo(Collapse);

/**
 * title: 综合用法
 * description: 把各种场景、API 都运用了
 */

import { Cell, DoubleArrowClockwiseOutline, Loading } from '@tastien/react-native-component';
import React, { useEffect, useRef } from 'react';

import { Animated, ColorValue } from 'react-native';

const CustomLoading = ({ size, color }: { size?: number; color?: ColorValue }) => {
  const spin = useRef(new Animated.Value(0));

  useEffect(() => {
    let stop = false;
    const action = Animated.timing(spin.current, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    });
    const loop = () => {
      if (stop) {
        return;
      }

      action.start(({ finished }) => {
        if (finished) {
          action.reset();
          loop();
        }
      });
    };

    loop();

    return () => {
      stop = true;
      action.stop();
    };
  }, []);

  return (
    <Animated.View
      style={{
        width: size,
        height: size,
        alignContent: 'center',
        justifyContent: 'center',
        transform: [
          {
            rotateZ: spin.current.interpolate({
              inputRange: [0, 1],
              outputRange: ['0deg', '360deg'],
            }),
          },
        ],
      }}
    >
      <DoubleArrowClockwiseOutline size={size} color={color} />
    </Animated.View>
  );
};

const DemoLoading: React.FC = () => {
  return (
    <>
      <Cell.Group title='单独使用图标'>
        <Loading.Spinner />
      </Cell.Group>

      <Cell.Group title='加载类型'>
        <Loading />
      </Cell.Group>

      <Cell.Group title='自定义颜色'>
        <Loading color='#f30' />
      </Cell.Group>

      <Cell.Group title='自定义大小'>
        <Loading size={18} />
      </Cell.Group>

      <Cell.Group title='加载文案'>
        <Loading>加载文案...</Loading>
      </Cell.Group>

      <Cell.Group title='垂直排列'>
        <Loading vertical>加载文案...</Loading>
      </Cell.Group>

      <Cell.Group title='自定义loading'>
        <Loading loadingIcon={<CustomLoading size={40} color='#098' />}>加载文案...</Loading>
      </Cell.Group>
      <Cell.Group title='自定义loading2'>
        <Loading loadingIcon={() => <CustomLoading size={40} color='#098' />}>加载文案...</Loading>
      </Cell.Group>
    </>
  );
};

export default DemoLoading;

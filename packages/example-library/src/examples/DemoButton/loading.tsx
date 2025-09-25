/**
 * title: 加载中按钮
 * description: 用于异步操作等待反馈的时候，也可以避免多次提交。
 */

import React, { memo, useEffect, useRef } from 'react';

import { Animated, ColorValue } from 'react-native';
import Tst from '@tastien/react-native-component';

const CustomLoading = ({ size, color }: { size: number; color: ColorValue }) => {
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
      {/* <DoubleArrowClockwiseOutline size={size} color={color} /> */}
    </Animated.View>
  );
};

const ButtonLoading: React.FC = () => {
  return (
    <Tst.Card title='加载中按钮' square>
      <Tst.Space>
        <Tst.Space>
          <Tst.Button type='primary' text='primary' loading />
          <Tst.Button type='hazy' text='hazy' loading loadingText='自定义 loading 文案' />
          <Tst.Button type='outline' text='outline' loading loadingText='自定义 loading 文案' />
          <Tst.Button type='ghost' text='ghost' loading />
          <Tst.Button type='link' text='link' loading loadingText='自定义 loading 文案' />
        </Tst.Space>

        <Tst.Divider>·</Tst.Divider>

        <Tst.Space direction='horizontal' wrap>
          <Tst.Button type='primary' text='primary' loading />
          <Tst.Button type='hazy' text='hazy' loading loadingText='自定义 loading 文案' />
          <Tst.Button type='outline' text='outline' loading loadingText='自定义 loading 文案' />
          <Tst.Button type='ghost' text='ghost' loading />
          <Tst.Button type='link' text='link' loading loadingText='自定义 loading 文案' />
        </Tst.Space>

        <Tst.Divider>·</Tst.Divider>

        <Tst.Space direction='horizontal' wrap>
          <Tst.Button type='primary' text='primary & xl' size='xl' loading />
          <Tst.Button type='hazy' text='hazy & l' size='l' loading />
          <Tst.Button type='outline' text='outline & m' size='m' loading />
          <Tst.Button type='ghost' text='ghost & s' size='s' loading />
          <Tst.Button type='link' text='link & xs' size='xs' loading />
        </Tst.Space>
      </Tst.Space>
    </Tst.Card>
  );
};

export default memo(ButtonLoading);

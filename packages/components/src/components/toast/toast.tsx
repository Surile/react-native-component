import React, { forwardRef, memo, useEffect, useImperativeHandle, useState } from 'react';
import isNil from 'lodash/isNil';
import { Text, TouchableWithoutFeedback, View, Image } from 'react-native';
import type { ToastMethods, ToastProps } from './types';
import Spinner from '../loading/loading-spinner';
import Popup from '../popup';
import { cn } from '../../lib/utils';
import { ShmError, ShmWarn } from '../icons';

const Toast = forwardRef<ToastMethods, ToastProps>(
  (
    {
      position = 'middle',
      message,
      overlay = false,
      forbidPress = false,
      closeOnPress = false,
      closeOnPressOverlay = false,
      loadingType = 'spinner',
      duration = 2000,
      icon,
      type,
      ...resetProps
    },
    ref
  ) => {
    const [show, setShow] = useState(false);
    const [msg, setMsg] = useState(message);

    // 修正数据
    if (closeOnPress) {
      // 是否在点击后关闭
      // 是否禁止背景点击
      // 可以触发点击的地方正好被背景 View 挡住
      forbidPress = false;
    }

    /**
     * 点击遮罩层
     */
    const onPressOverlay = () => {
      // 是否在点击遮罩层后关闭
      if (closeOnPressOverlay) {
        setShow(false);
      }
    };

    /**
     * 点击内容
     */
    const onPressContent = () => {
      // 是否在点击后关闭
      if (closeOnPress) {
        setShow(false);
      }
    };

    useEffect(() => {
      setShow(true);

      let timer: ReturnType<typeof setTimeout>;

      if (duration !== 0) {
        timer = setTimeout(() => {
          // 隐藏弹窗
          setShow(false);
        }, duration);
      }

      return () => {
        clearTimeout(timer);
      };
    }, [duration]);

    // 向外暴露方法
    useImperativeHandle(
      ref,
      () => ({
        close: () => {
          setShow(false);
        },
        setMessage: (s) => {
          setMsg(s);
        },
      }),
      []
    );

    return (
      <Popup {...resetProps} visible={show} overlay={overlay} onPressOverlay={onPressOverlay}>
        <TouchableWithoutFeedback onPress={onPressContent}>
          <View
            className={cn('flex-1 h-full items-center py-[20%]', {
              'justify-start': position === 'top',
              'justify-end': position === 'bottom',
              'justify-center': position === 'middle',
            })}
            pointerEvents={forbidPress ? undefined : 'box-none'}
            collapsable={false}
          >
            <View
              className={cn('bg-black/80 rounded-2xl justify-center items-center', {
                'rounded-2xl p-6': type === 'text',
                'w-32 min-h-[110px] p-4': type !== 'text',
              })}
            >
              {type === 'loading' ? (
                <View className='items-center p-1'>
                  <Spinner colorClassName='bg-white' />
                </View>
              ) : null}
              {type === 'success' ? (
                <Image
                  className='mb-2 size-8 fill-white'
                  source={require('../../assets/check-circle.png')}
                />
              ) : null}
              {type === 'fail' ? <ShmError width={32} height={32} fill='white' /> : null}
              {type === 'warn' ? <ShmWarn width={32} height={32} fill='white' /> : null}
              {type === 'icon' ? icon : null}
              {!isNil(msg) && msg !== '' ? (
                <Text
                  className={cn('text-lg text-white text-center', {
                    'mt-0': type === 'text',
                  })}
                >
                  {msg}
                </Text>
              ) : null}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Popup>
    );
  }
);

export default memo(Toast);

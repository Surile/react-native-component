/**
 * title: 综合用法
 * description: 组件 `Toast` 参数支持字符串或配置对象，当 `duration` 为 `0` 的时候不会主动消失。
 */

import { Tst } from '@tastien/react-native-component';
import React, { useState, useEffect, useRef } from 'react';
import { View, ScrollView } from 'react-native';

const DemoToast: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const LoadingReturnRef = useRef<any>();

  useEffect(() => {
    if (loading) {
      LoadingReturnRef.current = Tst.Toast.loading({
        message: '测试',
        duration: 0,
        forbidPress: true,
      });

      setTimeout(() => {
        setLoading(false);
      }, 3000);
    } else {
      if (LoadingReturnRef.current) {
        LoadingReturnRef.current.close();
      }
    }
  }, [loading]);

  return (
    <ScrollView>
      <Tst.Cell.Group title='奇怪的尝试'>
        <Tst.Cell
          title='状态控制 loading'
          onPress={() => {
            setLoading(true);
          }}
        />
        <Tst.Cell
          title='文字提示:快速移除:失败'
          isLink
          onPress={() => {
            const { close } = Tst.Toast.loading('提示内容');

            close();
          }}
        />
        <Tst.Cell
          title='文字提示:快速移除:成功'
          isLink
          onPress={() => {
            const { close } = Tst.Toast.loading('提示内容');

            setTimeout(() => {
              close();
            }, 0);
          }}
          divider={false}
        />
      </Tst.Cell.Group>

      <Tst.Cell.Group title='基础用法'>
        <Tst.Cell
          title='文字提示:禁止背景点击'
          isLink
          onPress={() => {
            Tst.Toast({
              message: '提示内容',
              forbidPress: true,
            });
          }}
        />
        <Tst.Cell
          title='文字提示:文案换行:禁止背景点击'
          isLink
          onPress={() => {
            Tst.Toast({
              message: `提示内容\n新的`,
              forbidPress: true,
            });
          }}
        />

        <Tst.Cell
          title='成功提示'
          isLink
          onPress={() => {
            Tst.Toast.success('恭喜你');
          }}
        />
        <Tst.Cell
          title='失败提示'
          isLink
          onPress={() => {
            Tst.Toast.fail('很抱歉哟');
          }}
        />
        <Tst.Cell
          title='自定义图标'
          isLink
          divider={false}
          onPress={() => {
            Tst.Toast({
              type: 'icon',
              message: '自定义图标',
              icon: <Tst.ArrowLeftOutline size={40} color='#f30' />,
            });
          }}
        />
      </Tst.Cell.Group>

      <Tst.Cell.Group title='loading'>
        <Tst.Cell
          title='加载提示:禁止背景点击:无提示内容'
          isLink
          onPress={() => {
            Tst.Toast.loading({
              forbidPress: true,
            });
          }}
        />
        <Tst.Cell
          title='加载提示:禁止背景点击'
          isLink
          onPress={() => {
            Tst.Toast.loading({
              message: '加载中...',
              forbidPress: true,
            });
          }}
        />
        <Tst.Cell
          title='加载提示倒计时:禁止背景点击'
          isLink
          onPress={() => {
            let d = 3;
            const buildMsg = () => `倒计时 ${d} 秒...`;

            const ddd = Tst.Toast.loading({
              message: buildMsg(),
              forbidPress: true,
              duration: 0,
            });
            const doLoop = () => {
              if (d > 0) {
                ddd.setMessage(buildMsg());

                d -= 1;

                setTimeout(() => {
                  doLoop();
                }, 1000);
              } else {
                ddd.close();
              }
            };

            doLoop();
          }}
          divider={false}
        />
      </Tst.Cell.Group>

      <Tst.Cell.Group title='自定义位置'>
        <Tst.Cell
          title='顶部展示:禁止背景点击'
          isLink
          onPress={() => {
            Tst.Toast({
              message: '提示内容',
              forbidPress: true,
              position: 'top',
            });
          }}
        />
        <Tst.Cell
          title='底部展示:禁止背景点击'
          isLink
          divider={false}
          onPress={() => {
            Tst.Toast({
              message: '提示内容',
              forbidPress: true,
              position: 'bottom',
            });
          }}
        />
      </Tst.Cell.Group>

      <View style={{ height: 20 }} />
    </ScrollView>
  );
};

export default DemoToast;

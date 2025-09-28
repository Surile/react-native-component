/**
 * title: 软键盘垫片
 * description: 适用于 bottom 方向弹出层、内部有不 autoFocus 输入框，弹出层有 autoFocus 输入框需求请参考「类似小红书弹出层评论」，针对 `iOS` 监听软键盘出现自动撑开到合适的高度。独立页面可以使用 `keyboard-aware-scroll-view` 实现，参考 `example/app/pages/demo/popup-text-input.tsx`。
 */

import React, { useState } from 'react';
import { Keyboard, ScrollView, Text, TextInput } from 'react-native';
import Tst from '@/react-native-component/components';

const BasicPopupKeyboardShim: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState<string[]>([]);

  return (
    <Tst.Blank top>
      <Tst.Button
        onPress={() => {
          setVisible(true);
        }}
        text='底部弹出、内部有输入框'
      />

      <Tst.Popup
        visible={visible}
        position='bottom'
        round
        onClose={() => {
          Keyboard.dismiss();
        }}
      >
        <Tst.Popup.Header
          title='底部弹出、内部有输入框'
          onClose={() => {
            setVisible(false);
          }}
        />
        <Tst.Blank>
          <Text>某些有趣的</Text>
          <TextInput
            placeholder='请输入备注'
            onChangeText={(text) => {
              setData(
                text ? new Array(20).fill(0).map((_, i) => `${text}-${i}`) : []
              );
            }}
          />
        </Tst.Blank>

        <ScrollView style={{ maxHeight: 200 }}>
          {data.map((item) => {
            return (
              <Text
                key={item}
                style={{
                  paddingVertical: 8,
                  paddingHorizontal: 12,
                }}
              >
                {item}
              </Text>
            );
          })}
        </ScrollView>

        {/* 放置操作按钮和内容之间，ButtonBar 在 Android 端监听软键盘出现会隐藏，为了保持一致的交互 */}
        <Tst.Popup.KeyboardShim />

        <Tst.ButtonBar alone>
          <Tst.Button text='保存' />
        </Tst.ButtonBar>
      </Tst.Popup>
    </Tst.Blank>
  );
};

export default BasicPopupKeyboardShim;

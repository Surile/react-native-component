/**
 * title: Popup
 * description: 通过 `position` 控制弹出层出现的动画。`Popup` 组件已经嵌套在 `Portal` 组件内，可以随意放置位置都会在根节点渲染，`Popup.PopupComponent` 则未被嵌套，需要结合业务自行安排。
 */

import React, { useState } from 'react';
import { Text } from 'react-native';
import Tst, { PopupPosition } from '@/react-native-component/components';

const positions: PopupPosition[] = ['center', 'left', 'right', 'top', 'bottom'];

const BasicPopupPopup: React.FC = () => {
  const [state, setState] = useState<{
    show: boolean;
    position: PopupPosition;
    show2: boolean;
    show3: boolean;
  }>({
    show: false,
    position: 'left',
    show2: false,
    show3: false,
  });
  return (
    <>
      <Tst.Card title='基础用法' square>
        <Tst.Space>
          {positions.map((p) => {
            return (
              <Tst.Button
                key={p}
                size='l'
                type='primary'
                text={`弹出位置:${p}`}
                onPress={() => {
                  setState((s) => ({
                    ...s,
                    show: true,
                    position: p,
                  }));
                }}
              />
            );
          })}

          <Tst.Button
            type='primary'
            text='destroyOnClosed'
            onPress={() => {
              setState((s) => ({
                ...s,
                show2: true,
              }));
            }}
          />

          <Tst.Button
            type='primary'
            text='overlayBackgroundColor'
            onPress={() => {
              setState((s) => ({
                ...s,
                show3: true,
              }));
            }}
          />
        </Tst.Space>
      </Tst.Card>

      <Tst.Popup
        safeAreaInsetBottom={state.position !== 'top'}
        safeAreaInsetTop={state.position !== 'bottom'}
        visible={state.show}
        position={state.position}
        onPressOverlay={() => {
          setState((s) => ({
            ...s,
            show: false,
          }));
        }}
        onRequestClose={() => {
          setState((s) => ({
            ...s,
            show: false,
          }));
          return true;
        }}
        round
      >
        <Tst.Popup.Header
          title='某一个标题'
          onClose={() => {
            setState((s) => ({
              ...s,
              show: false,
            }));
          }}
        />

        <Tst.Card>
          <Text>内容</Text>
        </Tst.Card>
      </Tst.Popup>

      <Tst.Popup
        destroyOnClosed
        visible={state.show2}
        round
        position='bottom'
        safeAreaInsetBottom
        onPressOverlay={() => {
          setState((s) => ({
            ...s,
            show2: false,
          }));
        }}
      >
        <Tst.Popup.Header title='每次打开都是新的子元素' />
        {/* <TextInput
          placeholder="请输入及价格"
          addonAfter="元/kg"
          addonBefore="采购价"
        /> */}
        <Tst.Popup.KeyboardShim />
      </Tst.Popup>

      <Tst.Popup
        className='bg-success-4'
        visible={state.show3}
        round
        position='bottom'
        safeAreaInsetBottom
        onPressOverlay={() => {
          setState((s) => ({
            ...s,
            show3: false,
          }));
        }}
      >
        <Tst.Popup.Header title='自定义 Overlay 颜色' />
      </Tst.Popup>
    </>
  );
};

export default BasicPopupPopup;

/**
 * title: 组件调用
 * description: 结合业务自定义对话框的内容。
 */

import { Cell, Dialog } from '@tastien/react-native-component';
import React, { useState } from 'react';

const BasicDialogOther: React.FC = () => {
  const [state, setState] = useState({
    cDialog1: {
      show: false,
      cancel: false,
      confirm: false,
    },
  });
  return (
    <>
      <Cell.Group title='组件调用'>
        <Cell
          title='组件调用'
          isLink
          divider={false}
          onPress={() => {
            console.log('组件调用');
            setState((s) => ({
              ...s,
              cDialog1: {
                ...s.cDialog1,
                show: true,
              },
            }));
          }}
        />
      </Cell.Group>

      <Dialog.Component
        showCancelButton
        title='这里应该有一个标题'
        visible={state.cDialog1.show}
        confirmButtonLoading={state.cDialog1.confirm}
        cancelButtonLoading={state.cDialog1.cancel}
        onPressOverlay={() => {
          setState((s) => ({
            ...s,
            cDialog1: {
              cancel: false,
              confirm: false,
              show: false,
            },
          }));
        }}
        onPressCancel={() => {
          console.log('onPressCancel');
          setState((s) => ({
            ...s,
            cDialog1: {
              ...s.cDialog1,
              cancel: true,
            },
          }));
        }}
        onPressConfirm={() => {
          console.log('onPressConfirm');
          setState((s) => ({
            ...s,
            cDialog1: {
              ...s.cDialog1,
              confirm: true,
            },
          }));

          setTimeout(() => {
            setState((s) => ({
              ...s,
              cDialog1: {
                cancel: false,
                confirm: false,
                show: false,
              },
            }));
          }, 1000);
        }}
        message='哈哈哈哈哈哈哈嗝'
      />
    </>
  );
};

export default BasicDialogOther;

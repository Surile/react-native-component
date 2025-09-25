/**
 * title: Header
 * description: 适用于各种弹出层头部。
 */

import React from 'react';
import { Text } from 'react-native';
import Tst from '@tastien/react-native-component';

const BasicPopupHeader: React.FC = () => {
  return (
    <Tst.Blank top>
      <Tst.Space>
        <Tst.Popup.Header
          title='标题'
          onClose={() => {
            console.log('标题:onClose');
          }}
        />

        <Tst.Popup.Header title='纯标题' showClose={false} />

        <Tst.Popup.Header
          title='左右拓展'
          leftExtra={<Text>leftExtra</Text>}
          rightExtra={<Text>rightExtra</Text>}
          onClose={() => {
            console.log('左右拓展:onClose');
          }}
        />
      </Tst.Space>
    </Tst.Blank>
  );
};

export default BasicPopupHeader;

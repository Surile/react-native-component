/**
 * title: 间距大小
 * description: 组件 `gap` 属性内置三个不同大小的间距，也可以采用具体的间距数值。
 */

import React from 'react';
import Tst from '@tastien/react-native-component';

const BasicSpaceSize: React.FC = () => {
  return (
    <Tst.Blank top>
      <Tst.Space>
        <Tst.Card title='间距:s'>
          <Tst.Space>
            <Tst.Button text='Button' />
            <Tst.Button text='Button' />
          </Tst.Space>
        </Tst.Card>

        <Tst.Card title='间距:m'>
          <Tst.Space gap='m'>
            <Tst.Button text='Button' />
            <Tst.Button text='Button' />
          </Tst.Space>
        </Tst.Card>

        <Tst.Card title='间距:l'>
          <Tst.Space gap='l'>
            <Tst.Button text='Button' />
            <Tst.Button text='Button' />
          </Tst.Space>
        </Tst.Card>

        <Tst.Card title='间距:自定义'>
          <Tst.Space direction='horizontal' gap={24}>
            <Tst.Button text='Button' />
            <Tst.Button text='Button' />
            <Tst.Button text='Button' />
            <Tst.Button text='Button' />
            <Tst.Button text='Button' />
            <Tst.Button text='Button' />
            <Tst.Button text='Button' />
          </Tst.Space>
        </Tst.Card>
      </Tst.Space>
    </Tst.Blank>
  );
};

export default BasicSpaceSize;

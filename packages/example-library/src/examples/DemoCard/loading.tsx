/**
 * title: 预加载的卡片
 * description: 数据读入前会有文本块样式。
 */

import React from 'react';
import { Text } from 'react-native';
import Tst from '@tastien/react-native-component';

const CardLoading: React.FC = () => {
  return (
    <Tst.Blank>
      <Tst.Space head>
        <Tst.Card loading>
          <Text>Card content</Text>
          <Text>Card content</Text>
          <Text>Card content</Text>
        </Tst.Card>
        <Tst.Card loading extra={<Tst.Button type='link' text='More' />}>
          <Text>Card content</Text>
          <Text>Card content</Text>
          <Text>Card content</Text>
        </Tst.Card>
        <Tst.Card loading title='Default card' extra={<Tst.Button type='link' text='More' />}>
          <Text>Card content</Text>
          <Text>Card content</Text>
          <Text>Card content</Text>
        </Tst.Card>
        <Tst.Card
          loading
          title='Default card'
          extra={<Tst.Button type='link' text='More' />}
          footer='Default card Default card'
        >
          <Text>Card content</Text>
          <Text>Card content</Text>
          <Text>Card content</Text>
        </Tst.Card>
      </Tst.Space>
    </Tst.Blank>
  );
};

export default CardLoading;

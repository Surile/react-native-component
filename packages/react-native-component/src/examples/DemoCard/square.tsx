/**
 * title: 直角卡片
 * description: 包含标题、内容、操作区域。
 */

import React from 'react';
import { Text } from 'react-native';
import Tst from '@/react-native-component/index';

const CardSquare: React.FC = () => {
  return (
    <Tst.Blank>
      <Tst.Space head>
        <Tst.Card
          square
          title='Default card'
          extra={<Tst.Button type='link' text='More' />}
        >
          <Text>Card content</Text>
          <Text>Card content</Text>
          <Text>Card content</Text>
        </Tst.Card>

        <Tst.Card
          square
          title='Default card'
          extra={<Tst.Button type='link' text='More' />}
        >
          <Text>Card content</Text>
          <Text>Card content</Text>
          <Text>Card content</Text>
        </Tst.Card>
      </Tst.Space>
    </Tst.Blank>
  );
};

export default CardSquare;

/**
 * title: 其他
 * description: 其他属性。
 */

import React from 'react';
import Tst from '@/react-native-component/index';

const BasicSpaceOther: React.FC = () => {
  return (
    <Tst.Blank top>
      <Tst.Space>
        <Tst.Card title='上下外边距' bodyPadding={false}>
          <Tst.Space head tail>
            <Tst.Button text='Button' />
            <Tst.Button text='Button' />
          </Tst.Space>
        </Tst.Card>

        <Tst.Card title='主轴对齐方式'>
          <Tst.Space direction='horizontal' justify='center'>
            <Tst.Button text='Button' size='xl' />
            <Tst.Button text='Button' size='m' />
            <Tst.Button text='Button' size='xs' />
          </Tst.Space>
        </Tst.Card>

        <Tst.Card title='交叉轴对齐方式'>
          <Tst.Space direction='horizontal' align='center'>
            <Tst.Button text='Button' size='xl' />
            <Tst.Button text='Button' size='m' />
            <Tst.Button text='Button' size='xs' />
          </Tst.Space>
        </Tst.Card>
      </Tst.Space>
    </Tst.Blank>
  );
};

export default BasicSpaceOther;

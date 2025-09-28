/**
 * title: 禁用按钮
 * description: 行动点不可用的时候，一般需要文案解释。
 */

import React, { memo } from 'react';
import Tst from '@/react-native-component/components';

const ButtonDisabled: React.FC = () => {
  return (
    <Tst.Card title='禁用按钮' square>
      <Tst.Space>
        <Tst.Space tail>
          <Tst.Button type='primary' text='primary' disabled />
          <Tst.Button type='hazy' text='hazy' disabled />
          <Tst.Button type='outline' text='outline' disabled />
          <Tst.Button type='ghost' text='ghost' disabled />
          <Tst.Button type='link' text='link' disabled />
        </Tst.Space>

        <Tst.Divider>·</Tst.Divider>

        <Tst.Space direction='horizontal' wrap>
          <Tst.Button type='primary' text='primary' disabled />
          <Tst.Button type='hazy' text='hazy' disabled />
          <Tst.Button type='outline' text='outline' disabled />
          <Tst.Button type='ghost' text='ghost' disabled />
          <Tst.Button type='link' text='link' disabled />
        </Tst.Space>
      </Tst.Space>
    </Tst.Card>
  );
};

export default memo(ButtonDisabled);

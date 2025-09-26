/**
 * title: 危险按钮
 * description: 删除/移动/修改权限等危险操作，一般需要二次确认。
 */

import React, { memo } from 'react';
import Tst from '@/react-native-component/components';

const onPress = () => {
  console.log('点击按钮');
};

const ButtonDanger: React.FC = () => {
  return (
    <Tst.Card title='危险按钮' square>
      <Tst.Space>
        <Tst.Space>
          <Tst.Button type='primary' text='primary' onPress={onPress} danger />
          <Tst.Button type='hazy' text='hazy' onPress={onPress} danger />
          <Tst.Button type='outline' text='outline' onPress={onPress} danger />
          <Tst.Button type='ghost' text='ghost' onPress={onPress} danger />
          <Tst.Button type='link' text='link' onPress={onPress} danger />
        </Tst.Space>

        <Tst.Divider>·</Tst.Divider>

        <Tst.Space direction='horizontal' wrap>
          <Tst.Button type='primary' text='primary' onPress={onPress} danger />
          <Tst.Button type='hazy' text='hazy' onPress={onPress} danger />
          <Tst.Button type='outline' text='outline' onPress={onPress} danger />
          <Tst.Button type='ghost' text='ghost' onPress={onPress} danger />
          <Tst.Button type='link' text='link' onPress={onPress} danger />
        </Tst.Space>
      </Tst.Space>
    </Tst.Card>
  );
};

export default memo(ButtonDanger);

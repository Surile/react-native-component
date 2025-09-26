/**
 * title: 按钮尺寸
 * description: 内置 xl、l、m、s、xs 五个尺寸。
 */

import React, { memo } from 'react';
import Tst from '@/react-native-component/index';

const ButtonSize: React.FC = () => {
  return (
    <Tst.Card title='按钮尺寸' square>
      <Tst.Space tail>
        <Tst.Button type='primary' size='xl' text='xl' />
        <Tst.Button type='primary' size='l' text='l' />
        <Tst.Button type='primary' size='m' text='m' />
        <Tst.Button type='primary' size='s' text='s' />
        <Tst.Button type='primary' size='xs' text='xs' />
      </Tst.Space>
      <Tst.Space direction='horizontal'>
        <Tst.Button type='primary' size='xl' text='xl' />
        <Tst.Button type='primary' size='l' text='l' />
        <Tst.Button type='primary' size='m' text='m' />
        <Tst.Button type='primary' size='s' text='s' />
        <Tst.Button type='primary' size='xs' text='xs' />
      </Tst.Space>
      <Tst.Space>
        <Tst.Button round size='xs' text='round' />
        <Tst.Button round size='s' text='round' />
        <Tst.Button round text='round' />
        <Tst.Button round size='l' text='round' />
        <Tst.Button round size='xl' text='round' />
        <Tst.Button square text='square' />
      </Tst.Space>
    </Tst.Card>
  );
};

export default memo(ButtonSize);

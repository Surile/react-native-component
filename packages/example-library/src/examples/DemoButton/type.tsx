/**
 * title: 按钮类型
 * description: 按钮有五种类型：主按钮（默认）、朦胧按钮、边框按钮、幽灵按钮和链接按钮。
 */

import React, { memo } from 'react';
import Tst from '@tastien/react-native-component';

const onPress = () => {
  console.log('点击按钮 => ', new Date().getTime());
};

const ButtonType: React.FC = () => {
  return (
    <Tst.Card title='按钮类型' square>
      <Tst.Space>
        <Tst.Space>
          <Tst.Button
            type='primary'
            text='primary 主按钮&点击事件防抖动'
            onPress={onPress}
            onPressDebounceWait={500}
          />
          <Tst.Button
            type='hazy'
            text='hazy 朦胧按钮'
            onPress={onPress}
            onPressDebounceWait={300}
          />
          <Tst.Button type='outline' text='outline 边框按钮' onPress={onPress} />
          <Tst.Button type='ghost' text='ghost 幽灵按钮' onPress={onPress} />
          <Tst.Button type='link' text='link 链接按钮' onPress={onPress} />
        </Tst.Space>

        <Tst.Divider>·</Tst.Divider>

        <Tst.Space direction='horizontal' wrap>
          <Tst.Button type='primary' text='primary' onPress={onPress} />
          <Tst.Button type='hazy' text='hazy' onPress={onPress} />
          <Tst.Button type='outline' text='outline' onPress={onPress} />
          <Tst.Button type='ghost' text='ghost' onPress={onPress} />
          <Tst.Button type='link' text='link' onPress={onPress} />
        </Tst.Space>
      </Tst.Space>
    </Tst.Card>
  );
};

export default memo(ButtonType);

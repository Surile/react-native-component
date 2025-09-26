/**
 * title: 细边框
 * description: 适用于小按钮，一像素（StyleSheet.hairlineWidth）边框。
 */

import React, { memo } from 'react';
import Tst from '@/react-native-component/index';

const onPress = () => {
  console.log('点击按钮');
};

const ButtonHairline: React.FC = () => {
  return (
    <Tst.Card title='细边框' square>
      <Tst.Space>
        <Tst.Space>
          <Tst.Button
            type='outline'
            text='outline'
            onPress={onPress}
            hairline
          />
          <Tst.Button type='ghost' text='ghost' onPress={onPress} hairline />
          <Tst.Button
            type='outline'
            text='outline & danger'
            onPress={onPress}
            danger
            hairline
          />
          <Tst.Button
            type='ghost'
            text='ghost & danger'
            onPress={onPress}
            danger
            hairline
          />
        </Tst.Space>

        <Tst.Divider>·</Tst.Divider>

        <Tst.Space direction='horizontal'>
          <Tst.Button
            type='outline'
            text='outline'
            size='xs'
            onPress={onPress}
            hairline
          />
          <Tst.Button
            type='ghost'
            text='ghost'
            size='xs'
            onPress={onPress}
            hairline
          />
          <Tst.Button
            type='outline'
            text='outline & danger'
            size='xs'
            onPress={onPress}
            danger
            hairline
          />
          <Tst.Button
            type='ghost'
            text='ghost & danger'
            size='xs'
            onPress={onPress}
            danger
            hairline
          />
        </Tst.Space>
      </Tst.Space>
    </Tst.Card>
  );
};

export default memo(ButtonHairline);

/**
 * title: 子文案
 * description: 通过 `subtext` 设置更多描述。
 */

import React, { memo } from 'react';
import Tst from '@/react-native-component/components';

const onPress = () => {
  console.log('点击按钮 => ', new Date().getTime());
};

const ButtonSubtext: React.FC = () => {
  return (
    <Tst.Card title='子文案' square>
      <Tst.Space>
        <Tst.Space>
          <Tst.Button
            size='xl'
            type='primary'
            text='主要文案'
            subtext='更多描述内容，哈哈哈'
            onPress={onPress}
          />
          <Tst.Button
            loading
            type='primary'
            text='主要文案'
            subtext='更多描述内容，哈哈哈'
            onPress={onPress}
          />
          <Tst.Button
            disabled
            type='primary'
            text='主要文案&disabled'
            subtext='更多描述内容，哈哈哈'
            onPress={onPress}
          />
          <Tst.Button
            type='hazy'
            text='hazy'
            subtext='更多描述内容，哈哈哈'
            onPress={onPress}
            onPressDebounceWait={300}
          />
          <Tst.Button
            type='outline'
            text='outline'
            subtext='更多描述内容，哈哈哈'
            onPress={onPress}
          />
          <Tst.Button
            type='ghost'
            text='ghost'
            subtext='更多描述内容，哈哈哈'
            onPress={onPress}
          />
          <Tst.Button
            type='link'
            text='link'
            subtext='更多描述内容，哈哈哈'
            onPress={onPress}
          />
        </Tst.Space>

        <Tst.Divider>·</Tst.Divider>

        <Tst.Space direction='horizontal' wrap>
          <Tst.Button
            type='primary'
            text='primary'
            subtext='更多描述内容，哈哈哈'
            onPress={onPress}
          />
          <Tst.Button
            type='hazy'
            text='hazy'
            subtext='更多描述内容，哈哈哈'
            onPress={onPress}
          />
          <Tst.Button
            type='outline'
            text='outline'
            subtext='更多描述内容，哈哈哈'
            onPress={onPress}
          />
          <Tst.Button
            type='ghost'
            text='ghost'
            subtext='更多描述内容，哈哈哈'
            onPress={onPress}
          />
          <Tst.Button
            type='link'
            text='link'
            subtext='更多描述内容，哈哈哈'
            onPress={onPress}
          />
        </Tst.Space>
      </Tst.Space>
    </Tst.Card>
  );
};

export default memo(ButtonSubtext);

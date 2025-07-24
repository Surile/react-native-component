/**
 * title: 选项按钮
 * description: 简化版按钮，适合用于选择场景，和 Checkbox 组件有相似的作用。
 */

import React, { memo } from 'react';
import Tst from '@tastien/react-native-component';

const onPress = () => {
  console.log('点击按钮');
};

const ButtonOption: React.FC = () => {
  return (
    <Tst.Card title='选项按钮' square>
      <Tst.Space>
        <Tst.Space>
          <Tst.Button.Option text='Option' onPress={onPress} />
          <Tst.Button.Option text='Option' onPress={onPress} active />
          <Tst.Button.Option text='Option:outline' type='outline' onPress={onPress} />
          <Tst.Button.Option text='Option:outline' type='outline' onPress={onPress} active />
          <Tst.Button.Option
            text='Option:white:边框颜色是白色的outline'
            type='white'
            onPress={onPress}
          />
          <Tst.Button.Option
            text='Option:white:边框颜色是白色的outline'
            type='white'
            onPress={onPress}
            active
          />
        </Tst.Space>

        <Tst.Divider>·</Tst.Divider>

        <Tst.Space>
          <Tst.Button.Option text='大小:xs' size='xs' onPress={onPress} />
          <Tst.Button.Option text='大小:s:默认' size='s' onPress={onPress} active />
          <Tst.Button.Option text='大小:m' size='m' onPress={onPress} />
          <Tst.Button.Option text='大小:l' size='l' onPress={onPress} active />
          <Tst.Button.Option text='大小:xl' size='xl' onPress={onPress} />
        </Tst.Space>

        <Tst.Divider>·</Tst.Divider>

        <Tst.Space direction='horizontal'>
          <Tst.Button.Option text='最小' onPress={onPress} />
          <Tst.Button.Option text='宽度' onPress={onPress} />
          <Tst.Button.Option text='最小' type='outline' onPress={onPress} />
          <Tst.Button.Option text='宽度' type='outline' onPress={onPress} />
        </Tst.Space>

        <Tst.Space direction='horizontal'>
          <Tst.Button.Option text='最小' onPress={onPress} disabled />
          <Tst.Button.Option text='宽度' onPress={onPress} disabled active />
          <Tst.Button.Option
            text='宽度'
            onPress={onPress}
            disabled
            active
            activeHighlight={false}
          />
        </Tst.Space>

        <Tst.Space direction='horizontal'>
          <Tst.Button.Option text='最小' type='outline' onPress={onPress} disabled />
          <Tst.Button.Option text='宽度' type='outline' onPress={onPress} disabled active />
          <Tst.Button.Option
            text='宽度'
            type='outline'
            onPress={onPress}
            disabled
            active
            activeHighlight={false}
          />
        </Tst.Space>

        <Tst.Space direction='horizontal'>
          <Tst.Button.Option text='最小' type='outline' onPress={onPress} round />
          <Tst.Button.Option text='宽度' type='outline' onPress={onPress} round active />
          <Tst.Button.Option
            text='宽度'
            type='outline'
            onPress={onPress}
            round
            active
            activeHighlight={false}
          />
        </Tst.Space>

        <Tst.Space direction='horizontal'>
          <Tst.Button.Option text='激活状态' onPress={onPress} active />
          <Tst.Button.Option text='激活不高亮' onPress={onPress} active activeHighlight={false} />
        </Tst.Space>

        <Tst.Space direction='horizontal'>
          <Tst.Button.Option text='激活状态:outline' type='outline' onPress={onPress} active />
          <Tst.Button.Option
            text='激活不高亮:outline'
            type='outline'
            onPress={onPress}
            active
            activeHighlight={false}
          />
        </Tst.Space>

        <Tst.Space direction='horizontal'>
          <Tst.Button.Option text='Option' onPress={onPress} badge={1} active />
          <Tst.Button.Option
            text='Option'
            onPress={onPress}
            badge={1}
            active
            activeHighlight={false}
          />
          <Tst.Button.Option text='06-07' />
          <Tst.Button.Option text='06-07' active />
        </Tst.Space>

        <Tst.Space direction='horizontal'>
          <Tst.Button.Option text='Option' type='outline' onPress={onPress} badge={1} active />
          <Tst.Button.Option
            text='Option'
            type='outline'
            onPress={onPress}
            badge={1}
            active
            activeHighlight={false}
          />
          <Tst.Button.Option text='06-07' type='outline' />
          <Tst.Button.Option text='06-07' type='outline' active />
        </Tst.Space>
      </Tst.Space>
    </Tst.Card>
  );
};

export default memo(ButtonOption);

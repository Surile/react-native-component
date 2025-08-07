/**
 * title: 不同尺寸
 * description: 支持三种尺寸。
 */

import { Space, Card, Description } from '@tastien/react-native-component';
import React from 'react';

const DescriptionSize: React.FC = () => {
  return (
    <Space>
      <Card title='size:统一设置' square>
        <Description.Group size='large'>
          <Description label='标题 l' text='一袋米要抗几楼' />
          <Description label='标题 l' text='一袋米要抗二楼' />
          <Description label='标题 l' text='一袋米要给多了' />
          <Description label='标题 l' text='一袋米由我洗嘞' />
        </Description.Group>
      </Card>

      <Card title='size:单独设置' square>
        <Description.Group size='small'>
          <Description label='标题 l' text='一袋米要抗几楼' size='large' />
          <Description label='标题 s' text='一袋米要抗二楼' />
          <Description label='标题 s' text='一袋米要给多了' />
          <Description label='标题 s' text='一袋米由我洗嘞' />
        </Description.Group>
      </Card>

      <Card title='size:单独设置' square>
        <Description.Group>
          <Description label='标题 l' text='一袋米要抗几楼' size='large' />
          <Description label='标题 m' text='一袋米要抗二楼' size='medium' />
          <Description label='标题 s' text='一袋米要给多了' size='small' />
        </Description.Group>
      </Card>
    </Space>
  );
};

export default DescriptionSize;

/**
 * title: 单元格组
 * description: Cell.Group 使用案例。
 */

import React from 'react';
import { Text, View } from 'react-native';
import Tst from '@/react-native-component/index';

const CellGroup: React.FC = () => {
  return (
    <Tst.Space>
      <Tst.Cell.Group
        title='分组标题'
        extra={<Text>extra</Text>}
        onPressTitle={() => {}}
        onPressTitleText={() => {}}
      >
        <Tst.Cell title='标题' value='显示文案' />
        <Tst.Cell required title='必填' value='显示文案' />
        <Tst.Cell title='最后一项' value='一般不显示分割线' divider={false} />
      </Tst.Cell.Group>

      <View
        style={{
          backgroundColor: '#f5f5f5',
          paddingVertical: 24,
        }}
      >
        <Tst.Cell.Group
          title='内容区域有上下分割线'
          bodyTopDivider
          bodyBottomDivider
        >
          <Tst.Cell title='标题' value='显示文案' />
          <Tst.Cell required title='必填' value='显示文案' />
          <Tst.Cell title='最后一项' value='一般不显示分割线' divider={false} />
        </Tst.Cell.Group>
      </View>
    </Tst.Space>
  );
};

export default CellGroup;

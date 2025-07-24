/**
 * title: 基础用法
 * description: 单独使用 Cell。
 */

import React from 'react';

import Tst from '@tastien/react-native-component';

const CellBase: React.FC = () => {
  return (
    <>
      <Tst.Cell title='标题' value='显示文案' />
      <Tst.Cell required title='必填' value='显示文案' />
      <Tst.Cell title='仅有标题' />
      <Tst.Cell title='仅有文案' />
      <Tst.Cell title='仅有标题，右侧有箭头，一般表示可以点击' isLink />
      <Tst.Cell
        title='标题有多行：右侧有箭头，一般表示可以点击右侧有箭头，一般表示可以点击右侧有箭头，一般表示可以点击右侧有箭头，一般表示可以点击'
        isLink
      />
      <Tst.Cell
        titleTextNumberOfLines={1}
        title='标题只有一行：右侧有箭头，一般表示可以点击右侧有箭头，一般表示可以点击右侧有箭头，一般表示可以点击右侧有箭头，一般表示可以点击'
        isLink
      />
      <Tst.Cell title='onPress 点击事件' isLink onPress={() => {}} />
      <Tst.Cell title='onLongPress 点击事件' isLink onLongPress={() => {}} />
      <Tst.Cell title='onPressIn 点击事件' isLink onPressIn={() => {}} />
      <Tst.Cell title='onPressOut 点击事件' isLink onPressOut={() => {}} />
      <Tst.Cell title='onPressLink 点击箭头事件' isLink onPressLink={() => {}} />
      <Tst.Cell title='标题' extra='这里的有一个可以扩展说明的文案' />
      <Tst.Cell
        title='标题'
        value='7个'
        extra='这里的有一个可以扩展说明的文案，这里的有一个可以扩展说明的文案'
        onPress={() => {}}
        isLink
      />
      <Tst.Cell title='标题' extra={`这里的有一个可以扩展\n说明的文案`} />
      <Tst.Cell title='标题' value={`多行文本\n多行文本`} />
      <Tst.Cell title='最后一项' value='一般不显示分割线' divider={false} />
    </>
  );
};

export default CellBase;

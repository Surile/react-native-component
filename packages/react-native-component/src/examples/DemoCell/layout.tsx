/**
 * title: 排版布局
 * description: Cell 支持右侧文案左右、居中对齐，标题与内容上下布局。
 */

import React from 'react';
import Tst from '@/react-native-component/index';

const CellLayout: React.FC = () => {
  return (
    <>
      <Tst.Cell title='标题' value='文案左对齐' textAlign='left' />
      <Tst.Cell title='标题' value='文案居中齐' textAlign='center' />
      <Tst.Cell title='标题' value='文案右对齐' />
      <Tst.Cell title='标题' value='上下布局' vertical />
      <Tst.Cell
        title='标题'
        value='上下布局不能修改文案对齐方式'
        vertical
        textAlign='right'
        isLink
      />
      <Tst.Cell title='标题' value={`多行文本\n多行文本`} center />
      <Tst.Cell title='标题' value={`多行文本\n多行文本`} center isLink />
      <Tst.Cell title='最后一项' value='一般不显示分割线' divider={false} />
    </>
  );
};

export default CellLayout;

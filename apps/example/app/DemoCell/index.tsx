/**
 * title: 基础用法
 * description: 单独使用 Cell。
 */

import React from 'react';
import { Tst } from '@tastien/react-native-component';
import { ScrollView } from 'react-native';
import CellBase from './base';
import CellDivider from './divider';
import CellLayout from './layout';
import CellExtra from './extra';
import CellGroup from './group';

const DemoCell: React.FC = () => {
  return (
    <ScrollView>
      <Tst.Cell.Group title='基础用法'>
        <CellBase />
      </Tst.Cell.Group>

      <Tst.Cell.Group title='分割线'>
        <CellDivider />
      </Tst.Cell.Group>

      <Tst.Cell.Group title='排版布局'>
        <CellLayout />
      </Tst.Cell.Group>

      <Tst.Cell.Group title='扩展单元格'>
        <CellExtra />
      </Tst.Cell.Group>

      <CellGroup />
    </ScrollView>
  );
};

export default DemoCell;

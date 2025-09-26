/**
 * title: 综合用法
 * description: 把各种场景、API 都运用了
 */

import React from 'react';
import { ScrollView } from 'react-native';

import CheckboxIcon from './icon';
import CheckboxBase from './base';
import CheckboxGroup from './group';

import Tst from '@/react-native-component/index';

const BasicCheckbox: React.FC = () => {
  return (
    <ScrollView>
      <Tst.Space tail head>
        <CheckboxIcon />

        <CheckboxBase />

        <CheckboxGroup />
      </Tst.Space>
    </ScrollView>
  );
};

export default BasicCheckbox;

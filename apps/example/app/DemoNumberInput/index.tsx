/**
 * title: 综合用法
 * description: 把各种场景、API 都运用了
 */

import React from 'react';

import NumberInputBase from './base';
import NumberInputFormatter from './formatter';
import NumberInputExtra from './extra';
import NumberInputLimit from './limit';
import { ScrollView } from 'react-native';

const DemoNumberInput: React.FC = () => {
  return (
    <ScrollView>
      <NumberInputBase />
      <NumberInputFormatter />
      <NumberInputLimit />
      <NumberInputExtra />
    </ScrollView>
  );
};

export default DemoNumberInput;

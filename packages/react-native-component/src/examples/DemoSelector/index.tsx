/**
 * title: 综合用法
 * description: 把各种场景、API 都运用了
 */

import React from 'react';

import SelectorBase from './base';
import SelectorSearch from './search';
import SelectorLabel from './label';
import SelectorComponent from './component';
import { ScrollView } from 'react-native';

const DemoSelector: React.FC = () => {
  return (
    <ScrollView>
      <SelectorBase />

      <SelectorSearch />

      <SelectorLabel />

      <SelectorComponent />
    </ScrollView>
  );
};

export default DemoSelector;

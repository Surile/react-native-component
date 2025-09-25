/**
 * title: 综合用法
 * description: 把各种场景、API 都运用了
 */

import React from 'react';
import { ScrollView } from 'react-native';

import DescriptionBase from './base';
import DescriptionSize from './size';
import DescriptionOther from './other';
import DescriptionEmpty from './empty';
import { Space } from '@tastien/react-native-component';

const DemoDescription: React.FC = () => {
  return (
    <ScrollView>
      <Space head tail>
        <DescriptionBase />

        <DescriptionSize />

        <DescriptionOther />

        <DescriptionEmpty />
      </Space>
    </ScrollView>
  );
};

export default DemoDescription;

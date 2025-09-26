/**
 * title: 综合用法
 * description: 把各种场景、API 都运用了
 */

import React from 'react';
import { ScrollView } from 'react-native';
import DatePickerViewSingle from './single';
import DatePickerViewRangeView from './range-view';
import DatePickerViewRange from './range';
import Tst from '@tastien/react-native-component';

const BasicDatePickerView: React.FC = () => {
  return (
    <ScrollView>
      <Tst.Blank>
        <Tst.Space tail head>
          <DatePickerViewSingle />

          <DatePickerViewRangeView />

          <DatePickerViewRange />
        </Tst.Space>
      </Tst.Blank>
    </ScrollView>
  );
};

export default BasicDatePickerView;

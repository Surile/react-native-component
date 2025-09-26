/**
 * title: 综合用法
 * description: 把各种场景、API 都运用了
 */

import React from 'react';
import { ScrollView } from 'react-native';
import DatePickerViewSingle from './single';
import DatePickerViewRangeView from './range-view';
import DatePickerViewRange from './range';
import Tst, { Provider } from '@/react-native-component/components';

const BasicDatePickerView: React.FC = () => {
  return (
    <Provider>
      <ScrollView>
        <Tst.Blank>
          <Tst.Space tail head>
            <DatePickerViewSingle />

            <DatePickerViewRangeView />

            <DatePickerViewRange />
          </Tst.Space>
        </Tst.Blank>
      </ScrollView>
    </Provider>
  );
};

export default BasicDatePickerView;

/**
 * title: 时间段选择视图
 * description: 开始、结束时间选择视图，适用于个性化时间选择场景，支持受控、非受控两种方式。
 */

import React, { useState } from 'react';
import Tst from '@/react-native-component/components';

const defaultValueView: [Date, Date] = [
  new Date(2020, 6, 20, 18, 40, 10),
  new Date(2022, 1, 2, 18, 40, 10),
];

const onChangeLog = (v: [Date | null, Date | null]) => {
  console.log('onChangeLog 0 => ', v[0]);
  console.log('onChangeLog 1 => ', v[1]);
};

const BasicDatePickerViewRangeView: React.FC = () => {
  const [value, setValue] =
    useState<[Date | null, Date | null]>(defaultValueView);

  return (
    <Tst.Card title='时间段视图'>
      <Tst.Space>
        <Tst.DatePicker.RangeView onChange={onChangeLog} />
        <Tst.DatePicker.RangeView defaultValue={defaultValueView} />
        <Tst.DatePicker.RangeView value={value} />
        <Tst.DatePicker.RangeView value={value} onChange={setValue} />
        <Tst.DatePicker.RangeView
          value={value}
          onChange={setValue}
          clearable
          onClear={() => {
            Tst.Toast('根据业务自定义清空逻辑');
            // 例如重置时间后关闭弹出层
            // setValue([null, null])
          }}
        />
      </Tst.Space>
    </Tst.Card>
  );
};

export default BasicDatePickerViewRangeView;

/**
 * title: Checkbox 组
 * description: 快捷组织一组可选项，可选项多的场景推荐竖向，候选项少的场景推荐横向。
 */

import React, { useState } from 'react';
import Tst from '@/react-native-component/index';
import { Text } from 'react-native';

const options = new Array(6).fill(0).map((_, index) => ({
  value: index + 1,
  label: `选项${index + 1}`,
}));

const CheckboxGroup: React.FC = () => {
  const [value1, setValue1] = useState<number>();
  const [value2, setValue2] = useState<number[]>([]);

  return (
    <Tst.Space>
      <Tst.Card title='Checkbox 组:单选'>
        <Text>默认选中后点击可以取消选中</Text>
        <Tst.Checkbox.Group options={options} />

        <Tst.Divider>·</Tst.Divider>

        <Text>选中后点击可以不取消选中</Text>
        <Tst.Checkbox.Group options={options} deselect={false} />

        <Tst.Divider>·</Tst.Divider>

        <Text>选项多了，scrollable 左右滚动</Text>
        <Tst.Checkbox.Group
          options={options}
          value={value1}
          direction='horizontal'
          scrollable
        />

        <Tst.Divider>·</Tst.Divider>

        <Text>受控，不响应 onChange</Text>
        <Tst.Checkbox.Group
          options={options}
          value={value1}
          direction='horizontal'
          wrap
          onChange={(v) => {
            setValue1(v as number);
          }}
        />
      </Tst.Card>

      <Tst.Card title='Checkbox 组:多选'>
        <Tst.Checkbox.Group multiple options={options} />

        <Tst.Divider>·</Tst.Divider>

        <Text>受控，不响应 onChange，选项多了，scrollable 左右滚动</Text>
        <Tst.Checkbox.Group
          multiple
          options={options}
          value={value2}
          direction='horizontal'
          scrollable
        />

        <Tst.Divider>·</Tst.Divider>

        <Tst.Checkbox.Group
          multiple
          options={options}
          value={value2}
          direction='horizontal'
          wrap
          onChange={(v) => {
            setValue2(v as number[]);
          }}
        />
      </Tst.Card>

      <Tst.Card title='Checkbox 组:自定义样式'>
        <Text>选项多了无法左右滚动</Text>
        <Tst.Checkbox.Group
          direction='horizontal'
          gap={12}
          checkboxLabelTextClassName='text-red-500'
          iconSize={16}
          activeColor='#098'
          options={options}
        />

        <Tst.Divider>·</Tst.Divider>

        <Text>选项多了，scrollable 左右滚动</Text>
        <Tst.Checkbox.Group
          options={options.map((o) => ({
            ...o,
            iconSize: 16,
            labelTextStyle: {
              color: '#f30',
            },
            activeColor: '#f30',
            gap: 16,
          }))}
          direction='horizontal'
          scrollable
        />
      </Tst.Card>
    </Tst.Space>
  );
};

export default CheckboxGroup;

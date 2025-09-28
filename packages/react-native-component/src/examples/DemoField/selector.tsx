/**
 * title: 选择控件
 * description: 适合单选、多选。
 */

import { Cell, Field, TreeOption } from '@/react-native-component/components';
import React, { useState } from 'react';
import { Text } from 'react-native';

const options = new Array(6).fill(0).map((_, index) => ({
  value: index,
  label: `选项 ${index}`,
}));

const treeOptions = new Array(6).fill(0).map((_, index) => ({
  value: index,
  label: `选项 ${index}`,
  disabled: index % 2 === 1,
  children:
    index % 2 === 1
      ? new Array(3).fill(0).map((__, sIndex) => ({
          value: 100 + index * 10 + sIndex,
          label: `选项_${index}_${sIndex}`,
        }))
      : [],
}));

const BasicFieldSelector: React.FC = () => {
  const [s1, setS1] = useState<number | undefined>(undefined);
  const [s2, setS2] = useState([] as number[]);
  const [s3, setS3] = useState<number | undefined>(undefined);

  return (
    <Cell.Group title='Field Selector'>
      <Field.Selector
        title='单选单选单选单选单选单选单选单选单选'
        placeholder='请选择'
        value={s1}
        options={options}
        onChange={(v) => {
          setS1(v as number);
        }}
        clearable
        valueClassName='text-2xl'
      />
      <Field.Selector
        title='单选:renderResultText'
        placeholder='请选择'
        value={s1}
        options={options}
        onChange={(v) => {
          setS1(v as number);
        }}
        renderResultText={(_, opts) => {
          if (opts.length) {
            return (
              <>
                <Text
                  style={{ textAlign: 'right', fontSize: 14, color: '#666' }}
                >
                  {opts[0].label}
                </Text>
                <Text
                  style={{ textAlign: 'right', fontSize: 12, color: '#098' }}
                >
                  其他描述
                </Text>
              </>
            );
          }

          return undefined;
        }}
      />
      <Field.Selector
        title='单选:optionsLoading'
        placeholder='请选择'
        value={s1}
        options={options}
        optionsLoading
      />
      <Field.Selector
        title='单选:自定义渲染'
        placeholder='请选择'
        value={s1}
        options={options.map((item) => ({
          ...item,
          render: () => <Text style={{ color: '#098' }}>{item.label}</Text>,
        }))}
        onChange={(v) => {
          setS1(v as number);
        }}
      />
      <Field.Selector
        title='单选:禁用'
        placeholder='请选择'
        editable={false}
        value={s1}
        options={options}
        onChange={(v) => {
          setS1(v as number);
        }}
      />
      <Field.Selector
        clearable
        title='单选:clearable'
        placeholder='请选择'
        value={s1}
        options={options}
        onChange={(v) => {
          setS1(v as number);
        }}
      />
      <Field.Selector
        multiple
        title='多选'
        placeholder='请选择'
        value={s2}
        options={options}
        onChange={(v) => {
          setS2(v as number[]);
        }}
      />
      <Field.Selector
        multiple
        title='多选多选多选多选多选多选'
        titleTextNumberOfLines={1}
        titleClassName='basis-[120px]'
        placeholder='请选择'
        value={s2}
        options={options}
        onChange={(v) => {
          setS2(v as number[]);
        }}
      />
      <Field.Selector
        multiple
        title='多选:搜索'
        titleTextNumberOfLines={1}
        titleClassName='basis-[120px]'
        placeholder='请选择'
        value={s2}
        search
        options={options}
        onChange={(v) => {
          setS2(v as number[]);
        }}
      />
      <Field.Selector
        multiple
        title='多选'
        placeholder='请选择'
        value={s2}
        options={options}
        onChange={(v) => {
          setS2(v as number[]);
        }}
        valueTextNumberOfLines={1}
      />
      <Field.Selector
        title='单选（树结构）'
        placeholder='请选择'
        value={s3}
        options={treeOptions}
        onChange={(v) => {
          setS3(v as number);
        }}
        clearable
        valueTextNumberOfLines={1}
        divider={false}
        renderResultText={(v) => {
          if (!v) {
            return undefined;
          }

          const texts: string[] = [];
          const findText = (list: TreeOption[]) => {
            list.forEach((item) => {
              if (
                Array.isArray(v)
                  ? v.indexOf(item.value as number) > -1
                  : v === item.value
              ) {
                texts.push(item.label);
              }
              if (item.children?.length) {
                findText(item.children);
              }
            });
          };

          findText(treeOptions);

          return texts.join('、');
        }}
      />
    </Cell.Group>
  );
};

export default BasicFieldSelector;

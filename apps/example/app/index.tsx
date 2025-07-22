import { Text, ScrollView, SafeAreaView } from 'react-native';
import { Tst } from '@tastien/react-native-component';
import React from 'react';
import { useRouter } from 'expo-router';

const navs = [
  {
    title: '基础组件',
    datas: [
      {
        title: 'Blank 留白',
        name: 'DemoBlank',
      },
      {
        title: 'Button 按钮',
        name: 'DemoButton',
      },
      {
        title: 'Cell 单元格',
        name: 'DemoCell',
      },
    ],
  },
  {
    title: '表单组件',
    datas: [
      {
        title: 'Checkbox 复选框',
        name: 'DemoCheckbox',
      },
      {
        title: 'DatePicker 时间选择器',
        name: 'DemoDatePicker',
      },
      {
        title: 'DatePickerView 时间选择器视图',
        name: 'DemoDatePickerView',
      },
      {
        title: 'Field 输入项',
        name: 'DemoField',
      },
      {
        title: 'Form 表单',
        name: 'DemoForm',
      },
      {
        title: 'NumberInput 数字输入',
        name: 'DemoNumberInput',
      },
      {
        title: 'PasswordInput 密码输入',
        name: 'DemoPasswordInput',
      },
      {
        title: 'Picker 选择器',
        name: 'DemoPicker',
      },
      {
        title: 'PickerView 选择器视图',
        name: 'DemoPickerView',
      },
      {
        title: 'Search 搜索',
        name: 'DemoSearch',
      },
      {
        title: 'Selector 选择器',
        name: 'DemoSelector',
      },
      {
        title: 'StepSelector 步骤选择器',
        name: 'DemoStepSelector',
      },
      {
        title: 'Switch 开关',
        name: 'DemoSwitch',
      },
      {
        title: 'TextInput 输入框',
        name: 'DemoTextInput',
      },
      {
        title: 'Tree 树形控件',
        name: 'DemoTree',
      },
    ],
  },
];

export default function Index() {
  const router = useRouter();

  return (
    <SafeAreaView className='flex-1'>
      <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
        {navs.map((item) => {
          return (
            <Tst.Cell.Group key={item.title} title={item.title}>
              {item.datas.map((subitem, index) => {
                return (
                  <Tst.Cell
                    key={subitem.name}
                    isLink
                    title={subitem.title}
                    divider={index + 1 !== item.datas.length}
                    onPress={() => {
                      router.push(subitem.name as any);
                    }}
                  />
                );
              })}
            </Tst.Cell.Group>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

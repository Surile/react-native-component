import { Tst } from '@tastien/react-native-component';
import React from 'react';
import { ScrollView } from 'react-native';
import ButtonType from './type';
import ButtonSubtext from './subtext';
import ButtonDanger from './danger';
import ButtonHairline from './hairline';
import ButtonDisabled from './disabled';
import ButtonLoading from './loading';
import ButtonSize from './size';
import ButtonOption from './option';
import ButtonOptionGroup from './option-group';

export default function DemoButton() {
  return (
    <ScrollView>
      <Tst.Space head tail>
        <ButtonType />
        <ButtonSubtext />
        <ButtonDanger />
        <ButtonHairline />
        <ButtonDisabled />
        <ButtonLoading />
        <ButtonSize />

        <Tst.Card title='自定义颜色' square>
          <Tst.Space tail>
            <Tst.Button className='bg-success-5' text='只改变主要色' />
            <Tst.Button type='hazy' text='只改变主要色' />
            <Tst.Button type='outline' text='只改变主要色' />
            <Tst.Button textClassName='text-[#666]' text='文字颜色' />
            <Tst.Button type='hazy' text='文字颜色' />
            <Tst.Button type='outline' text='文字颜色' />
          </Tst.Space>
        </Tst.Card>

        <ButtonOption />

        <ButtonOptionGroup />
      </Tst.Space>
    </ScrollView>
  );
}

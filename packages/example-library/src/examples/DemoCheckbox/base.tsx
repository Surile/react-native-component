/**
 * title: 综合用法
 * description: Checkbox 默认在 true、false 之间切换，通过 `activeValue`、`inactiveValue` 自定义切换的值。Checkbox 组件支持传入泛型，更友好的约束 `value`、`activeValue`、`inactiveValue`、`onChange`。
 */

import React, { useState } from 'react';
import Tst from '@tastien/react-native-component';

const CheckboxBase: React.FC = () => {
  const [value, setValue] = useState(true);

  return (
    <Tst.Space>
      <Tst.Card title='基础用法'>
        <Tst.Space>
          <Tst.Checkbox
            label='初始化时未激活'
            onChange={(v) => {
              console.log('当前状态：', v);
            }}
          />
          <Tst.Checkbox
            defaultValue
            label='初始化时激活'
            onChange={(v) => {
              console.log('当前状态：', v);
            }}
          />
          <Tst.Checkbox defaultValue label='自定义 icon 边距' iconStyle={{ marginRight: 16 }} />
          <Tst.Checkbox label='受控:不更新' value={value} />
          <Tst.Checkbox label='受控:更新' value={value} onChange={setValue} />
        </Tst.Space>
      </Tst.Card>

      <Tst.Card title='禁用状态'>
        <Tst.Space>
          <Tst.Checkbox disabled label='未激活' />
          <Tst.Checkbox disabled defaultValue label='已激活' />
        </Tst.Space>
      </Tst.Card>

      <Tst.Card title='自定义'>
        <Tst.Space>
          <Tst.Checkbox defaultValue activeColor='#f30' label='自定义激活时图标颜色' />
          <Tst.Checkbox defaultValue iconSize={30} label='自定义图标大小' />
        </Tst.Space>
      </Tst.Card>

      <Tst.Card title='禁用文本点击'>
        <Tst.Checkbox labelDisabled defaultValue label='点击图标可以更新状态，点击文字不更新状态' />
      </Tst.Card>

      <Tst.Card title='自定义图标'>
        <Tst.Space>
          <Tst.Checkbox
            defaultValue
            label='点击文案响应切换，图标没有绑定点击回调'
            activeColor='#f30'
            renderIcon={({ activeColor, size, active }) =>
              active ? (
                <Tst.ArrowUpOutline color={activeColor} size={size} />
              ) : (
                <Tst.ArrowDownOutline color={activeColor} size={size} />
              )
            }
          />
          <Tst.Checkbox
            labelDisabled
            defaultValue
            label='点击图标响应切换'
            renderIcon={({ activeColor, size, active, onPress }) =>
              active ? (
                <Tst.ArrowUpOutline color={activeColor} size={size} onPress={onPress} />
              ) : (
                <Tst.ArrowDownOutline color={activeColor} size={size} onPress={onPress} />
              )
            }
          />
          <Tst.Checkbox
            disabled
            defaultValue
            label='renderIcon 把 disabled 状态传递给图标'
            renderIcon={({ activeColor, size, active, onPress, disabled }) =>
              active ? (
                <Tst.ArrowUpOutline
                  color={activeColor}
                  size={size}
                  onPress={onPress}
                  disabled={disabled}
                />
              ) : (
                <Tst.ArrowDownOutline
                  color={activeColor}
                  size={size}
                  onPress={onPress}
                  disabled={disabled}
                />
              )
            }
          />
        </Tst.Space>
      </Tst.Card>

      <Tst.Card title='自定义激活/未激活的值'>
        <Tst.Space>
          <Tst.Checkbox
            activeValue='1'
            inactiveValue='2'
            defaultValue='1'
            label='激活值为字符1，未激活值为字符2，默认值为字符串1'
            onChange={(v) => {
              console.log('当前状态：', v);
            }}
          />
          <Tst.Checkbox
            activeValue={1}
            defaultValue='1'
            label='激活值为数字1，未激活值为false，默认值为字符串1'
            onChange={(v) => {
              console.log('当前状态：', v);
            }}
          />
          <Tst.Checkbox
            activeValue={1}
            defaultValue={1}
            label='激活值为数字1，未激活值为false，默认值为数字1'
            onChange={(v) => {
              console.log('当前状态：', v);
            }}
          />
        </Tst.Space>
      </Tst.Card>

      <Tst.Card title='自定义样式'>
        <Tst.Space>
          <Tst.Checkbox gap={12} label='gap 自定义图标、文案间距' />
          <Tst.Checkbox
            iconSize={16}
            labelTextClassName='text-red-500'
            label='iconSize、iconStyle 自定义 icon 样式，labelTextStyle 自定义文案样式'
          />
        </Tst.Space>
      </Tst.Card>
    </Tst.Space>
  );
};

export default CheckboxBase;

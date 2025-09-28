/**
 * title: 选项按钮组
 * description: 方便的从数组生成 Button.Option 组。
 */

import React, { memo, useState } from 'react';

import { View } from 'react-native';
import Tst from '@/react-native-component/components';

const options = new Array(10).fill(0).map((_, index) => ({
  value: index + 1,
  label: `选项${index + 1}`,
  badge: index === 2 ? 10 : undefined,
  disabled: index === 3,
}));

const ButtonOptionGroup: React.FC = () => {
  const [value1, setValue1] = useState<number>();
  const [value2, setValue2] = useState<number[]>([]);

  return (
    <Tst.Space>
      <Tst.Card title='选项按钮组' square>
        <Tst.Space>
          <Tst.Button.OptionGroup
            options={options}
            scrollable
            defaultValue={2}
            deselect={false}
            round
          />

          <Tst.Divider>·</Tst.Divider>

          <Tst.Button.OptionGroup
            options={options}
            type='outline'
            scrollable
            defaultValue={2}
          />

          <Tst.Divider>·</Tst.Divider>

          <View
            style={{
              padding: 4,
              backgroundColor: '#f5f5f5',
            }}
          >
            <Tst.Button.OptionGroup
              options={options}
              type='white'
              scrollable
              defaultValue={2}
            />
          </View>

          <Tst.Divider>·</Tst.Divider>

          <Tst.Button.OptionGroup options={options} multiple scrollable />

          <Tst.Divider>·</Tst.Divider>

          <Tst.Button.OptionGroup
            options={options}
            scrollable
            activeHighlight={false}
          />
        </Tst.Space>
      </Tst.Card>

      <Tst.Card title='选项按钮组:受控' square>
        <Tst.Space>
          <Tst.Button.OptionGroup
            options={options}
            value={value1}
            onChange={(v) => {
              console.log('v => ', v);
              setValue1(v as number);
            }}
            scrollable
          />

          <Tst.Divider>·</Tst.Divider>

          <Tst.Button.OptionGroup
            options={options}
            multiple
            value={value2}
            onChange={(v) => {
              console.log('v => ', v);
              setValue2(v as number[]);
            }}
            scrollable
          />
          <Tst.Button
            text='清空'
            disabled={!value2?.length}
            onPress={() => {
              setValue1(undefined);
              setValue2([]);
            }}
          />
        </Tst.Space>
      </Tst.Card>
    </Tst.Space>
  );
};

export default memo(ButtonOptionGroup);

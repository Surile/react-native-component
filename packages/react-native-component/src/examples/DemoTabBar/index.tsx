import React from 'react';
import type { ViewStyle } from 'react-native';
import { ScrollView, Text } from 'react-native';

import BasicTabBarBase from './base';
import BasicTabBarIndicator from './indicator';
import BasicTabBarAlign from './align';
import BasicTabBarLabel from './label';
import {
  EyeOutline,
  SearchOutline,
  Space,
  Divider,
  TabBar,
  VolumeOutline,
} from '@tastien/react-native-component';

const bottomBarIconStyle: ViewStyle = {
  alignSelf: 'center',
  justifyContent: 'center',
  alignItems: 'center',
  // 无论大小图标都保持同一个占用空间
  width: 20,
  height: 20,
};

const bottomBar = [
  {
    value: 1,
    label: '首页',
    iconRender: (isActive?: boolean) => (
      <EyeOutline
        color={isActive ? '#1677ff' : '#999'}
        pointerEvents='none'
        size={20}
        style={bottomBarIconStyle}
      />
    ),
  },
  {
    value: 2,
    label: '发现页',
    iconRender: (isActive?: boolean) => (
      <SearchOutline
        color={isActive ? '#1677ff' : '#999'}
        pointerEvents='none'
        size={20}
        style={bottomBarIconStyle}
      />
    ),
  },
  {
    value: 3,
    label: '更多设置',
    iconRender: (isActive?: boolean) => (
      <VolumeOutline
        color={isActive ? '#1677ff' : '#999'}
        pointerEvents='none'
        size={20}
        style={bottomBarIconStyle}
      />
    ),
  },
];

const BasicSwitch: React.FC = () => {
  return (
    <>
      <ScrollView>
        <Space head>
          <Text>基本</Text>

          <BasicTabBarBase />

          <Divider type='dark'>.</Divider>

          <Text>指示器</Text>

          <BasicTabBarIndicator />

          <Divider type='dark'>.</Divider>

          <Text>左对齐</Text>

          <BasicTabBarAlign />

          <Divider type='dark'>.</Divider>

          <Text>文字突出</Text>

          <BasicTabBarLabel />

          <Divider type='dark'>.</Divider>
        </Space>
      </ScrollView>

      <TabBar options={bottomBar} defaultValue={bottomBar[0].value} />
    </>
  );
};

export default BasicSwitch;

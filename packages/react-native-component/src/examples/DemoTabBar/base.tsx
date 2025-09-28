/**
 * title: 基本
 * description: 一般用于固定页面底部，支持文案、图标。
 */

import {
  EyeOutline,
  SearchOutline,
  VolumeOutline,
  Space,
  TabBar,
  Button,
} from '@/react-native-component/components';
import React, { useState } from 'react';
import { type ViewStyle } from 'react-native';

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

const BasicTabBarBase: React.FC = () => {
  const [value1, setValue1] = useState(bottomBar[1].value);

  return (
    <Space head>
      <TabBar
        safeAreaInsetBottom={false}
        options={bottomBar}
        value={value1}
        onChange={(v) => {
          setValue1(v as number);
        }}
      />

      <TabBar
        safeAreaInsetBottom={false}
        options={bottomBar.map(({ iconRender, ...rest }) => rest)}
        value={value1}
        onChange={(v) => {
          setValue1(v as number);
        }}
      />

      <Button
        danger
        onPress={() => {
          setValue1(bottomBar[1].value);
        }}
      >
        重置
      </Button>
    </Space>
  );
};

export default BasicTabBarBase;

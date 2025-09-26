import React from 'react';
import { ScrollView, View } from 'react-native';

import BasicSwitchBase from './base';
import BasicSwitchText from './text';
import BasicSwitchDisabled from './disabled';
import BasicSwitchSize from './size';
import BasicSwitchCustom from './custom';
import { Card, Space } from '@/react-native-component/components';

const DemoSwitch: React.FC = () => {
  return (
    <ScrollView>
      <Space>
        <Card title='基础'>
          <BasicSwitchBase />
        </Card>

        <Card title='文字和图标'>
          <BasicSwitchText />
        </Card>

        <Card title='不可用'>
          <BasicSwitchDisabled />
        </Card>

        <Card title='大小'>
          <BasicSwitchSize />
        </Card>

        <Card title='自定义'>
          <BasicSwitchCustom />
        </Card>

        <View style={{ height: 50 }} />
      </Space>
    </ScrollView>
  );
};

export default DemoSwitch;

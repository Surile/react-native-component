/**
 * title: 文字和图标
 * description: 带有文字和图标。`activeChildren`、`inactiveChildren` 在 `0.3.17` 以后的版本中可以使用。
 */

import { CrossOutline, Space, SuccessOutline, Switch } from '@tastien/react-native-component';
import React from 'react';

const BasicSwitchText: React.FC = () => {
  return (
    <Space direction='vertical'>
      <Switch defaultValue activeChildren='开启' inactiveChildren='关闭' />
      <Switch activeChildren='1' inactiveChildren='0' />
      <Switch
        defaultValue
        activeChildren={<SuccessOutline color='#fff' size={24} />}
        inactiveChildren={<CrossOutline color='#fff' size={16} />}
      />
    </Space>
  );
};

export default BasicSwitchText;

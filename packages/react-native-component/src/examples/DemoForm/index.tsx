import { Space } from '@tastien/react-native-component';
import React from 'react';

import Base from './base';
import Ref from './ref';
import Context from './context';
import Deps from './deps';
import List from './list';
import UseFormInstance from './use-form-instance';
import { ScrollView } from 'react-native';

function DemoForm() {
  return (
    <ScrollView>
      <Space head tail>
        <Base />
        <Ref />
        <Context />
        <Deps />
        <List />
        <UseFormInstance />
      </Space>
    </ScrollView>
  );
}

export default DemoForm;

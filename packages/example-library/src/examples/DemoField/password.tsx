/**
 * title: 密码输入
 * description: 适用于单行文本输入。
 */

import { Cell, Field } from '@tastien/react-native-component';
import React from 'react';

const BasicFieldTextInput: React.FC = () => {
  return (
    <Cell.Group title='Field Password'>
      <Field.Password title='密码' placeholder='请输入' />
      <Field.Password title='密码2' placeholder='请输入' divider={false} />
    </Cell.Group>
  );
};

export default BasicFieldTextInput;

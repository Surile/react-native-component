/**
 * title: dependencies
 * description: 使用 dependencies 动态渲染。
 */

import { Card, Form, Field } from '@/react-native-component/components';
import React from 'react';

let index = 0;

const BasicFormDeps: React.FC = () => {
  return (
    <Card title='dependencies' square>
      <Form>
        <Form.Item dependencies={['username']}>
          {() => {
            index += 1;
            return <Field.Text title='更新用户名重新渲染次数' value={index} />;
          }}
        </Form.Item>
        <Form.Item name='username'>
          <Field.TextInput required title='用户名' placeholder='请输入用户名' />
        </Form.Item>
        <Form.Item name='password'>
          <Field.TextInput
            required
            title='密码'
            placeholder='请输入密码'
            divider={false}
          />
        </Form.Item>
      </Form>
    </Card>
  );
};

export default BasicFormDeps;

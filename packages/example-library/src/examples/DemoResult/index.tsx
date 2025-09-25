import React from 'react';
import { ScrollView } from 'react-native';

import ResultIcon from './icon';
import ResultStatus from './status';
import ResultCustom from './custom';
import { Space } from '@tastien/react-native-component';

const DemoResult: React.FC = () => {
  return (
    <ScrollView>
      <Space tail head>
        <ResultIcon />
        <ResultStatus />
        <ResultCustom />
      </Space>
    </ScrollView>
  );
};

export default DemoResult;

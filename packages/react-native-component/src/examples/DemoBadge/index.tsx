import { Badge, Space } from '@tastien/react-native-component';
import React from 'react';
import { ScrollView } from 'react-native';

import BadgeBase from './base';
import BadgeStatus from './status';

function DemoBadge() {
  return (
    <ScrollView>
      <Space tail head>
        <BadgeBase />
        <BadgeStatus />
      </Space>
    </ScrollView>
  );
}

export default DemoBadge;

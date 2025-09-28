import { Space } from '@/react-native-component/components';
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

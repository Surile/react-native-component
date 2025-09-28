/**
 * title: 大小
 * description: 共有两个大小可以选择。
 */

import { Space, NoticeBar } from '@/react-native-component/components';

const NoticeBarSize = () => {
  return (
    <Space>
      <NoticeBar message='一袋米要抗几楼，一袋米要抗二楼' size='m' />
      <NoticeBar message='一袋米要抗几楼，一袋米要抗二楼' size='s' />
    </Space>
  );
};

export default NoticeBarSize;

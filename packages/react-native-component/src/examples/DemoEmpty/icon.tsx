/**
 * title: 自定义图标
 * description: icon={null} 可以隐藏图标，或传入一个自定义组件
 */

import {
  Space,
  ArrowDownOutline,
  Empty,
} from '@/react-native-component/components';

const EmptyIcon = () => {
  return (
    <Space>
      <Empty icon={null} />

      <Empty icon={<ArrowDownOutline />} />
    </Space>
  );
};

export default EmptyIcon;

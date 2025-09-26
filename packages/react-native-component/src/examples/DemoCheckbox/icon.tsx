/**
 * title: 图标
 * description: 复选框选择图标，可以独立使用，`active` 属性控制激活状态，`activeColor` 修改激活状态的颜色，`size` 修改图标大小。
 */

import React, { useState } from 'react';
import Tst from '@/react-native-component/index';

const CheckboxIcon: React.FC = () => {
  const [active, setActive] = useState(false);

  return (
    <Tst.Card title='仅图标'>
      <Tst.Space>
        <Tst.Checkbox.Icon
          active={active}
          onPress={() => {
            setActive((s) => !s);
          }}
        />
        <Tst.Checkbox.Icon active activeColor='#098' />
        <Tst.Checkbox.Icon active size={48} />
        <Tst.Checkbox.Icon
          disabled
          onPress={() => {
            console.log('+');
          }}
        />
        <Tst.Checkbox.Icon disabled active />
        <Tst.Checkbox.Icon disabled active activeColor='#098' />
      </Tst.Space>
    </Tst.Card>
  );
};

export default CheckboxIcon;

import { ScrollView } from 'react-native';
import Tst from '@tastien/react-native-component';
import ButtonBarBase from './base';
import ButtonBarButtons from './buttons';
import ButtonBarConfirm from './confirm';

const BasicButtonBar = () => {
  return (
    <>
      <ScrollView>
        <Tst.Space tail gap={100}>
          <ButtonBarBase />

          <ButtonBarButtons />

          <ButtonBarConfirm />
        </Tst.Space>
      </ScrollView>

      <Tst.ButtonBar alone keyboardShowNotRender>
        <Tst.Button
          text='新增数据'
          type='primary'
          renderLeftIcon={(color, size) => <Tst.PlusOutline color={color} size={size} />}
        />
      </Tst.ButtonBar>
    </>
  );
};

export default BasicButtonBar;

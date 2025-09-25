/**
 * title: 咨询按钮组
 * description: 在内部放置两个以上按钮，其中一个有相对更大的空间占比。
 */

import Tst from '@tastien/react-native-component';

const ButtonBarConfirm = () => {
  return (
    <Tst.Space tail head>
      <Tst.ButtonBar.Confirm
        safeAreaInsetBottom={false}
        cancel={<Tst.Button text='取消' type='hazy' />}
      >
        <Tst.Button text='确定' type='primary' />
      </Tst.ButtonBar.Confirm>

      <Tst.ButtonBar.Confirm
        safeAreaInsetBottom={false}
        cancel={[<Tst.Button key='1' text='取消' type='hazy' />]}
      >
        <Tst.Button text='确定' type='primary' />
      </Tst.ButtonBar.Confirm>

      <Tst.ButtonBar.Confirm
        safeAreaInsetBottom={false}
        cancel={[
          <Tst.Button key='1' text='全不选' type='hazy' />,
          <Tst.Button key='2' text='取消' type='hazy' />,
        ]}
      >
        <Tst.Button text='确定' type='primary' />
      </Tst.ButtonBar.Confirm>
    </Tst.Space>
  );
};

export default ButtonBarConfirm;

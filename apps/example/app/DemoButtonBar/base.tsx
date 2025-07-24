/**
 * title: 基础用法
 * description: 在内部放置一个、多个按钮。
 */
import { StyleSheet } from 'react-native';
import Tst from '@tastien/react-native-component';

const ButtonBarBase = () => {
  return (
    <Tst.Space tail head>
      <Tst.ButtonBar>
        <Tst.Space direction='horizontal'>
          <Tst.Button type='hazy' danger style={STYLES.audit}>
            拒绝
          </Tst.Button>
          <Tst.Button type='hazy' style={STYLES.audit}>
            同意
          </Tst.Button>
        </Tst.Space>
      </Tst.ButtonBar>

      <Tst.ButtonBar alone>
        <Tst.Button
          type='primary'
          size='l'
          renderLeftIcon={(color, size) => <Tst.PlusOutline color={color} size={size} />}
        >
          新增数据
        </Tst.Button>
      </Tst.ButtonBar>
    </Tst.Space>
  );
};

const STYLES = StyleSheet.create({
  audit: {
    minWidth: 96,
  },
});

export default ButtonBarBase;

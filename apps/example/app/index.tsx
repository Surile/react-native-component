import { View, Text, Button } from 'react-native';
import { Tst } from '@tastien/react-native-component';

const Circle = (props: { size?: number }) => {
  const size = props.size || 20;
  const style = {
    borderRadius: size / 2,
    backgroundColor: '#527fe4',
    width: size,
    height: size,
    margin: 1,
  };
  return <View style={style} />;
};

export default function Index() {
  return (
    <View className='flex-1 items-center justify-center'>
      <Tst.Loading className='mt-4'>12321312312</Tst.Loading>

      <Text>项目排列方式2121</Text>
      <Tst.Flex>
        <Tst.Flex.Item style={{ paddingRight: 4 }}>
          <Text>按钮1</Text>
        </Tst.Flex.Item>
        <Tst.Flex.Item style={{ paddingLeft: 4, paddingRight: 4 }}>
          <Text>按钮2</Text>
        </Tst.Flex.Item>
        <Tst.Flex.Item style={{ paddingLeft: 4 }}>
          <Text>按钮312121</Text>
        </Tst.Flex.Item>
      </Tst.Flex>
      <Tst.Flex justify='start'>
        <Circle />
        <Circle />
        <Circle />
        <Circle />
        <Circle />
      </Tst.Flex>
      <Tst.Space direction='horizontal'>
        <Text>123123123</Text>
        <Text>123123123</Text>
      </Tst.Space>
      <Tst.Space direction='vertical'>
        <Text>123123123</Text>
        <Text>123123123</Text>
      </Tst.Space>
    </View>
  );
}

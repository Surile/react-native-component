import { SafeAreaView, Text, View, ViewStyle } from 'react-native';
import { Tst } from '@tastien/react-native-component';

const ctxStyle = { backgroundColor: '#f5f5f5' };
const cardBodyStyle = { backgroundColor: '#61649f' };
const blankStyle = { backgroundColor: '#098' };
const dividerStyle = { backgroundColor: '#2b333e' };

const Tip = ({ text, style }: { text: string; style: ViewStyle }) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Text>{text}</Text>
      <View
        style={{
          width: 20,
          height: 20,
          marginLeft: 12,
          ...style,
        }}
      />
    </View>
  );
};

export default function DemoBlank() {
  return (
    <SafeAreaView>
      <Tst.Blank>
        <Tst.Space>
          <Tip text='Card body' style={cardBodyStyle} />

          <Tip text='Blank' style={blankStyle} />

          <Tip text='Blank text' style={ctxStyle} />

          <Tip text='Divider' style={dividerStyle} />

          <Tst.Card title='外边距' bodyPadding={false}>
            <Tst.Blank style={blankStyle}>
              <Text style={ctxStyle}>默认状态:左右边距</Text>
            </Tst.Blank>

            <Tst.Divider style={dividerStyle}>·</Tst.Divider>

            <Tst.Blank top bottom style={blankStyle}>
              <Text style={ctxStyle}>上下左右</Text>
            </Tst.Blank>
          </Tst.Card>

          <Tst.Card title='内边距' bodyPadding={false}>
            <Tst.Blank style={blankStyle} type='padding'>
              <Text style={ctxStyle}>默认状态:左右边距</Text>
            </Tst.Blank>

            <Tst.Divider style={dividerStyle}>·</Tst.Divider>

            <Tst.Blank top bottom style={blankStyle} type='padding'>
              <Text style={ctxStyle}>上下左右</Text>
            </Tst.Blank>
          </Tst.Card>
        </Tst.Space>

        <Tst.Card title='直接修改' bodyPadding={false}>
          <Tst.Blank style={blankStyle} left={4} top={8} right={12} bottom={20}>
            <Text>{`left={4} top={8} right={12} bottom={20}`}</Text>
          </Tst.Blank>
        </Tst.Card>
      </Tst.Blank>
      <Tst.Divider>·</Tst.Divider>
    </SafeAreaView>
  );
}

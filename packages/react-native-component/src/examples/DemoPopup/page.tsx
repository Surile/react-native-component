/**
 * title: Page
 * description: 类似 iOS 的 Sheet 组件，看似独立一个页面。
 */

import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import Tst from '@/react-native-component/components';

const BasicPopupPage: React.FC = () => {
  const [pageVisible, setPageVisible] = useState(false);

  // ScrollView 在实际业务中替换成 react-native-keyboard-aware-scroll-view 更合适
  return (
    <Tst.Blank top>
      <Tst.Button
        text='弹出层当做一个页面'
        onPress={() => {
          setPageVisible(true);
        }}
      />

      <Tst.Popup.Page visible={pageVisible} round>
        <Tst.Popup.Header
          title='独立页面'
          onClose={() => {
            setPageVisible(false);
          }}
        />

        <ScrollView>
          <Tst.Space tail>
            <View style={{ height: 200, backgroundColor: '#f09' }} />
            {/* <Tst.Field.TextInput
              title="文案棒"
              placeholder="请输入"
              divider={false}
            />
            <View style={{ height: 200, backgroundColor: '#876' }} />
            <Field.TextInput
              title="文案秒"
              placeholder="请输入"
              divider={false}
            />
            <View style={{ height: 200, backgroundColor: '#123' }} />
            <Field.TextInput
              title="文案雅"
              placeholder="请输入"
              divider={false}
            />
            <View style={{ height: 200, backgroundColor: '#678' }} />
            <Field.TextInput
              title="文案水"
              placeholder="请输入"
              divider={false}
            /> */}
            <View style={{ height: 200, backgroundColor: '#321' }} />
          </Tst.Space>
        </ScrollView>

        <Tst.ButtonBar alone>
          <Tst.Button text='确定' />
        </Tst.ButtonBar>
      </Tst.Popup.Page>
    </Tst.Blank>
  );
};

export default BasicPopupPage;

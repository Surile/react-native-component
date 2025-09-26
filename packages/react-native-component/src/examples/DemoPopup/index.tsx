/**
 * title: 综合用法
 * description: 把各种场景、API 都运用了
 */

import React from 'react';
import { ScrollView } from 'react-native';
import Tst from '@/react-native-component/index';
import PopupHeader from './header';
import PopupPopup from './popup';
import PopupPage from './page';
import PopupKeyboardShim from './keyboard-shim';

const DemoPopup: React.FC = () => {
  return (
    <ScrollView>
      <Tst.Space>
        <PopupHeader />

        <PopupPopup />

        <PopupKeyboardShim />

        <PopupPage />
      </Tst.Space>
    </ScrollView>
  );
};

export default DemoPopup;

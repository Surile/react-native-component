import React from 'react';
import { ScrollView } from 'react-native';
import ActionSheetBase from './base';
import ActionSheetComponent from './component';

const DemoActionSheet: React.FC = () => {
  return (
    <ScrollView>
      <ActionSheetBase />
      <ActionSheetComponent />
    </ScrollView>
  );
};

export default DemoActionSheet;

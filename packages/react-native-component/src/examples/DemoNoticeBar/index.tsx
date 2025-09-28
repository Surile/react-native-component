import React from 'react';
import { ScrollView } from 'react-native';

import NoticeBarBase from './base';
import NoticeBarStatus from './status';
import NoticeBarSize from './size';
import NoticeBarMode from './mode';
import NoticeBarCustom from './custom';

const DemoNoticeBar: React.FC = () => {
  return (
    <ScrollView>
      <NoticeBarBase />

      <NoticeBarStatus />

      <NoticeBarSize />

      <NoticeBarMode />

      <NoticeBarCustom />
    </ScrollView>
  );
};

export default DemoNoticeBar;

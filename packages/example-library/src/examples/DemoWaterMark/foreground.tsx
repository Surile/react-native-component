/**
 * title: 前置水印
 * description: 前置水印，不受内容遮挡。
 */

import { WaterMark, Blank, Space } from '@tastien/react-native-component';
import React from 'react';
import { ScrollView, View } from 'react-native';

const UploaderBase: React.FC = () => {
  return (
    <WaterMark
      text='仅用于案例展示'
      foreground
      color='#fff'
      opacity={0.2}
      fontSize={18}
      textWidth={130}
    >
      <ScrollView>
        <Blank>
          <Space>
            <View
              style={{
                height: 300,
                backgroundColor: '#f30',
              }}
            />

            <View
              style={{
                height: 300,
                backgroundColor: '#098',
              }}
            />

            <View
              style={{
                height: 300,
                backgroundColor: '#678',
              }}
            />
          </Space>
        </Blank>
      </ScrollView>
    </WaterMark>
  );
};

export default UploaderBase;

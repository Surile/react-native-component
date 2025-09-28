import isNil from 'lodash/isNil';
import React, { memo } from 'react';
import type { ViewStyle } from 'react-native';
import { View } from 'react-native';

import Space from '../space';

import ButtonBar from './button-bar';
import type { ButtonBarConfirmProps } from './interface';

const customButtonBarStyle: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
};

const customChildrenStyle: ViewStyle = {
  flex: 1,
};

const ButtonBarConfirm: React.FC<ButtonBarConfirmProps> = ({
  children,
  cancel,

  ...restProps
}) => {
  return (
    <ButtonBar {...restProps} alone style={customButtonBarStyle}>
      {!isNil(cancel) ? (
        <Space direction='horizontal' tail align='center' minWidth={92}>
          {cancel}
        </Space>
      ) : null}
      <View style={customChildrenStyle}>{children}</View>
    </ButtonBar>
  );
};

export default memo(ButtonBarConfirm);

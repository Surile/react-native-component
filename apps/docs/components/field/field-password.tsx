import React, { memo } from 'react';

import Cell from '../cell';
import PasswordInput from '../password-input';

import { pickCellProps } from './helper';
import type { FieldPasswordInputProps } from './interface';
import { cn } from '../../lib/utils';

/**
 * Field 密码输入
 * @description 表单中的密码输入组件。
 */
const FieldPasswordInput: React.FC<FieldPasswordInputProps> = ({
  // TextInput 属性
  textAlign = 'right',
  textInputStyle,
  textInputBordered,
  ...restProps
}) => {
  const { cellProps, otherProps } = pickCellProps(restProps);

  if (cellProps.vertical) {
    textAlign = 'left';
  }

  return (
    <Cell
      {...cellProps}
      valueClassName={cn(cellProps.valueClassName, cellProps.vertical && 'mt-2')}
      value={
        <PasswordInput
          {...otherProps}
          style={textInputStyle}
          bordered={textInputBordered}
          textAlign={textAlign}
        />
      }
    />
  );
};

export default memo(FieldPasswordInput);

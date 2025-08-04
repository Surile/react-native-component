import isNil from 'lodash/isNil';
import React, { memo } from 'react';

import Cell from '../cell';

import type { FieldTextProps } from './interface';

/**
 * 输入框 纯文字方式
 */
const FieldText: React.FC<FieldTextProps> = ({
  placeholder,
  value,

  valueTextClassName,
  ...restProps
}) => {
  const hasValue = !isNil(value);
  const text = hasValue ? value : placeholder;

  return <Cell {...restProps} value={text} valueTextClassName={valueTextClassName} />;
};

export default memo(FieldText);

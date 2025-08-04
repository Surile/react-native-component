import React, { memo } from 'react';

import Cell from '../cell';
import CheckboxGroup from '../checkbox/checkbox-group';

import { pickCellProps } from './helper';
import type { FieldCheckboxProps } from './interface';

const FieldCheckbox: React.FC<FieldCheckboxProps> = (restProps) => {
  const { cellProps, otherProps } = pickCellProps(restProps);

  return (
    <Cell
      {...cellProps}
      center={!restProps.vertical}
      value={<CheckboxGroup {...otherProps} direction='horizontal' gap={24} />}
    />
  );
};

export default memo(FieldCheckbox);

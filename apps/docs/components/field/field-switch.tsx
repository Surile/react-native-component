import { JSX, memo } from 'react';

import Cell from '../cell';
import Switch from '../switch';

import { pickCellProps } from './helper';
import type { FieldSwitchProps } from './interface';
import { cn } from '../../lib/utils';

function FieldSwitch<ActiveValueT = boolean, InactiveValueT = boolean>(
  props: FieldSwitchProps<ActiveValueT, InactiveValueT>
) {
  const { cellProps, otherProps } = pickCellProps(props);

  return (
    <Cell
      {...cellProps}
      valueClassName={cn('flex-row items-center justify-end', cellProps.valueClassName)}
      value={<Switch<ActiveValueT, InactiveValueT> {...otherProps} />}
    />
  );
}

export default memo(FieldSwitch) as <ActiveValueT = boolean, InactiveValueT = boolean>(
  p: FieldSwitchProps<ActiveValueT, InactiveValueT>
) => JSX.Element;

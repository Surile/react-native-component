import React, { memo } from 'react';
import noop from 'lodash/noop';
import type { PopupHeaderProps } from './types';
import NavBar from '../navbar';
import { usePersistFn } from '../../hooks';
import { CrossOutline } from '../icons';

const PopupHeader: React.FC<PopupHeaderProps> = ({
  showClose = true,
  onClose,
  rightExtra,
  ...restProps
}) => {
  const onClosePersistFn = usePersistFn(onClose || noop);

  const rightExtraJSX = (
    <>
      {rightExtra}
      {showClose ? <CrossOutline onPress={onClosePersistFn} /> : null}
    </>
  );

  return <NavBar {...restProps} rightExtra={rightExtraJSX} showBackArrow={false} divider={false} />;
};

export default memo(PopupHeader);

import isBoolean from 'lodash/isBoolean';
import isNumber from 'lodash/isNumber';
import React from 'react';
import { View } from 'react-native';
import { cn } from '../../lib/utils';

import type { CardBodyProps } from './interface';

const CardBody: React.FC<CardBodyProps> = ({ padding = true, className, ...restProps }) => {
  let paddingClasses = '';

  if (isBoolean(padding)) {
    paddingClasses = padding ? 'p-3' : '';
  } else if (isNumber(padding)) {
    paddingClasses = `p-[${padding}px]`;
  } else {
    const left = padding.left === true ? '3' : isNumber(padding.left) ? `[${padding.left}px]` : '';
    const right =
      padding.right === true ? '3' : isNumber(padding.right) ? `[${padding.right}px]` : '';
    const top = padding.top === true ? '3' : isNumber(padding.top) ? `[${padding.top}px]` : '';
    const bottom =
      padding.bottom === true ? '3' : isNumber(padding.bottom) ? `[${padding.bottom}px]` : '';

    paddingClasses = cn(
      left && `pl-${left}`,
      right && `pr-${right}`,
      top && `pt-${top}`,
      bottom && `pb-${bottom}`
    );
  }

  return <View {...restProps} className={cn(paddingClasses, className)} />;
};

export default CardBody;

import isUndefined from 'lodash/isUndefined';
import React, { memo } from 'react';

import Result from '../result';
import ResultIconEmpty from '../result/icons/result-icon-empty';

import { cn } from '../../lib/utils';
import { EmptyProps } from './interface';

/**
 * Empty 空元素
 * @description 用于填充空白数据。
 */
const Empty: React.FC<EmptyProps> = ({
  testID,
  text,
  className,
  textClassName,
  iconClassName,
  icon,
  full = false,
}) => {
  const iconJSX = !isUndefined(icon) ? (
    icon
  ) : (
    <ResultIconEmpty className={cn('self-center mb-2', iconClassName)} />
  );

  return (
    <Result
      testID={testID}
      status='info'
      renderIcon={() => iconJSX}
      className={cn(
        'items-center justify-center',
        {
          'flex-1': full,
        },
        className
      )}
      subtitle={text ?? '暂无数据'}
      subtitleTextClassName={cn('text-gray-600 text-lg', textClassName)}
    />
  );
};

export default memo(Empty);

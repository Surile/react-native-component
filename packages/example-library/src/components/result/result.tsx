import React, { memo } from 'react';
import { View } from 'react-native';

import Space from '../space';

import type { ResultProps, ResultStatus } from './interface';
import { renderTextLikeJSX } from '../../helpers';
import { cn } from '../../lib/utils';
import { cva } from 'class-variance-authority';
import { CrossOutline, SuccessOutline, WarningOutline } from '../icons';

const renderStatusIcon = (status: ResultStatus, size: number) => {
  const props = {
    size,
    color: '#fff',
  };

  switch (status) {
    case 'success':
      return <SuccessOutline {...props} />;

    case 'warning':
    case 'info':
      return <WarningOutline {...props} />;

    case 'error':
      return <CrossOutline {...props} />;

    default:
      return null;
  }
};

const result_icon_colors = {
  success: '#009A29',
  error: '#CB2634',
  info: '#4080FF',
  warning: '#D25F00',
};

const iconBgColors = cva('', {
  variants: {
    status: {
      success: 'bg-success-4',
      error: 'bg-danger-4',
      info: 'bg-info-4',
      warning: 'bg-warning-4',
    },
  },
});

/**
 * Result结果
 * @description 用于反馈一系列操作任务的处理结果。
 */
const Result: React.FC<ResultProps> = ({
  subtitleTextClassName,
  titleTextClassName,
  title,
  subtitle,
  extra,
  renderIcon,
  status,
  ...restProps
}) => {
  const color = result_icon_colors[status as keyof typeof result_icon_colors];
  const iconSize = 54;

  const iconJSX = renderIcon ? (
    renderIcon(color, iconSize)
  ) : (
    <View
      className={cn(
        'size-[72px] rounded-full self-center justify-center ',
        iconBgColors({ status })
      )}
    >
      {renderStatusIcon(status, iconSize)}
    </View>
  );
  const titleJSX = renderTextLikeJSX(
    title,
    cn('text-4xl text-gray-800 text-center', titleTextClassName)
  );
  const subtitleJSX = renderTextLikeJSX(
    subtitle,
    cn('text-lg text-gray-700 text-center mt-2', subtitleTextClassName)
  );

  return (
    <Space {...restProps}>
      {iconJSX}
      {titleJSX}
      {subtitleJSX}
      {extra}
    </Space>
  );
};

export default memo(Result);

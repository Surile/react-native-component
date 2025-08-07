import isNil from 'lodash/isNil';
import React, { memo } from 'react';
import { View } from 'react-native';

import { formatDate } from '../date-picker-view/helper';

import { useDescription } from './context';
import Description from './description';
import type { DescriptionDateRangeProps } from './interface';
import { getDefaultValue, renderTextLikeJSX } from '../../helpers';
import { locale } from 'dayjs';
import { cn } from '../../lib/utils';
import { textSizeVariants } from './styles';
import { size } from 'lodash';

const DescriptionDateRange: React.FC<DescriptionDateRangeProps> = ({
  text,
  mode = 'Y-m',
  split,
  ...restProps
}) => {
  const start = !isNil(text?.[0]) ? formatDate(mode, text![0]) : null;
  const end = !isNil(text?.[1]) ? formatDate(mode, text![1]) : null;
  const descriptionContext = useDescription();

  const _contentTextClassName = getDefaultValue(
    restProps.contentTextClassName,
    descriptionContext.contentTextClassName
  );
  const _size = getDefaultValue(restProps.size, descriptionContext.size);
  const line1JSX = renderTextLikeJSX(
    [start, split ?? '至'].join(' '),
    cn(
      'text-gray-800 shrink max-w-[100%]',
      {
        'font-bold': restProps.bold,
      },
      textSizeVariants({ size: _size }),
      _contentTextClassName
    ),
    {
      style: !isNil(restProps.color) ? { color: restProps.color } : null,
    }
  );

  const line2JSX = renderTextLikeJSX(
    end,
    cn(
      'text-gray-800 shrink max-w-[100%]',
      {
        'font-bold': restProps.bold,
      },
      textSizeVariants({ size: _size }),
      _contentTextClassName
    ),
    {
      style: !isNil(restProps.color) ? { color: restProps.color } : null,
    }
  );

  if (isNil(start) && isNil(end)) {
    return <Description {...restProps} />;
  }

  return (
    <Description {...restProps}>
      <View className='flex-col items-start'>
        {line1JSX}
        {line2JSX}
      </View>
    </Description>
  );
};

export default memo(DescriptionDateRange);

import React, { memo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import type { SelectorTextProps } from './interface';
import SelectorInstance from './selector-instance';
import { usePersistFn } from '../../hooks';
import { cn } from '../../lib/utils';
import Divider from '../divider';
import { getArrowOutline } from '../../helpers';
import Space from '../space';

const SelectorText: React.FC<SelectorTextProps> = ({
  title,
  value,
  options,
  onChange,
  arrowDirection = 'right',
  divider = true,
  textClassName,
  head,
}) => {
  const onPress = usePersistFn(() => {
    SelectorInstance({
      title,
      options,
      value,
      onChange: (v, opts) => {
        if (Array.isArray(v)) {
          onChange?.(v[0], opts);
        } else {
          onChange?.(v, opts);
        }
      },
    }).catch(() => {});
  });
  const IconArrow = getArrowOutline(arrowDirection);
  const textIndex = options.findIndex((op) => op.value === value);
  const text = options[textIndex].label;

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} className='justify-center'>
      <Space direction='horizontal' align='center' head={head}>
        {divider ? <Divider direction='vertical' /> : null}
        <Text suppressHighlighting className={cn('text-base text-gray-300', textClassName)}>
          {text}
        </Text>
        <IconArrow size={16} color={'#8C9199'} />
      </Space>
    </TouchableOpacity>
  );
};

export default memo(SelectorText);

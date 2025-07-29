import React, { memo } from 'react';
import { cn } from '@src/utils';
import { Text, TouchableOpacity, View } from 'react-native';
import type { SelectorTextProps } from './interface';
import SelectorInstance from './selector-instance';
import { usePersistFn } from '../hooks';
import Icon from '../Icon';
import { Separator } from '../Separator';

const SelectorText: React.FC<SelectorTextProps> = ({
  title,
  value,
  options,
  onChange,
  arrowName = 'arrowDown',
  divider = true,
  containerClassName,
  textClassName,
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
  const textIndex = options.findIndex((op) => op.value === value);
  const text = textIndex !== -1 ? options[textIndex].label : '';

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} className="justify-center">
      <View className={cn('flex-row items-center', containerClassName)}>
        {divider ? <Separator orientation="vertical" /> : null}
        <Text suppressHighlighting className={cn('text-base text-gray-300', textClassName)}>
          {text}
        </Text>
        <Icon name={arrowName} className="fill-gray-300" />
      </View>
    </TouchableOpacity>
  );
};

export default memo(SelectorText);

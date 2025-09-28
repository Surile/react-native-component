import isNil from 'lodash/isNil';
import React, { memo, useMemo } from 'react';
import type { TextStyle, ViewStyle } from 'react-native';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import Color from 'color';
import type { TagProps } from './interface';
import { CrossOutline } from '../icons';
import { cn } from '../../lib/utils';
import { cva } from 'class-variance-authority';

// 文字 size
const textVariants = cva('', {
  variants: {
    size: {
      l: 'text-lg leading-5',
      m: 'text-base leading-4',
      s: 'text-sm leading-3',
    },
  },
});

// tag size
const tagVariants = cva('', {
  variants: {
    size: {
      l: 'h-6 px-2',
      m: 'h-5 px-1',
      s: 'h-4 px-0.5',
    },
  },
});

/**
 * Tag 标签
 */
const Tag: React.FC<TagProps> = ({
  children,
  style,
  innerClassName,
  closable = false,
  onClose,
  size = 'm',
  type = 'primary',
  visible = true,
  closeIcon,
  icon,
  textClassName,
  textColor,
  hairline,
  ...restProps
}) => {
  const textStyle = StyleSheet.flatten<TextStyle>([
    !isNil(textColor) && {
      color: textColor,
    },
  ]);

  // 关闭的图标
  const renderCloseIcon = () => {
    if (closable) {
      return closeIcon ? (
        <TouchableOpacity onPress={onClose}>{closeIcon}</TouchableOpacity>
      ) : (
        <CrossOutline onPress={onClose} size={20} color={textStyle.color as string} />
      );
    }
    return null;
  };

  if (visible) {
    return (
      <View {...restProps} className='bg-transparent flex-row overflow-visible' style={style}>
        <View
          className={cn(
            'flex-row items-center rounded-[2px]',
            {
              'bg-transparent border-primary-5 border': type === 'ghost',
              'bg-primary-5/95 border-primary-5/5': type === 'hazy',
              'bg-primary-5 border-primary-5': type === 'primary',
              'border-hairline border-primary-5': hairline && type === 'ghost',
            },
            tagVariants({ size }),
            innerClassName
          )}
        >
          {icon}
          <Text
            className={cn(
              {
                'text-white': type === 'primary' || type === 'hazy',
                'text-primary-5': type === 'ghost',
              },
              textVariants({ size }),
              textClassName
            )}
          >
            {children}
          </Text>
          {renderCloseIcon()}
        </View>
      </View>
    );
  }

  return null;
};

export default memo(Tag);

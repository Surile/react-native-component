import { cva } from 'class-variance-authority';
import isNil from 'lodash/isNil';
import React, { isValidElement, memo } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { ButtonOptionProps } from './interface';
import { cn } from '../../lib/utils';

const buttonVariants = cva('items-center justify-center', {
  variants: {
    type: {
      hazy: 'bg-gray-100 border border-gray-100',
      outline: 'bg-white border border-primary-5',
      white: 'bg-white border border-white',
    },
    size: {
      xs: 'h-6 px-2 text-xs',
      s: 'h-8 px-3 text-sm',
      m: 'h-10 px-4 text-base',
      l: 'h-12 px-5 text-lg',
      xl: 'h-14 px-6 text-xl',
    },
    round: {
      true: 'rounded-full',
      false: 'rounded',
    },
    active: {
      true: 'bg-primary-1 border-primary-1',
    },
    disabled: {
      true: 'opacity-50',
    },
  },
  defaultVariants: {
    type: 'hazy',
    size: 's',
    round: false,
    active: false,
    disabled: false,
  },
});

const textVariants = cva('', {
  variants: {
    disabled: {
      true: 'text-gray-300',
      false: 'text-gray-800',
    },
    active: {
      true: 'text-primary-5',
    },
  },
  defaultVariants: {
    disabled: false,
    active: false,
  },
});

const ButtonOption: React.FC<ButtonOptionProps> = ({
  active,
  activeHighlight = true,
  badge,
  type = 'hazy',
  text,
  size = 's',
  round = false,
  className,
  children,
  disabled,
  ...restProps
}) => {
  const childrenJSX = isValidElement(children) ? (
    children
  ) : !isNil(children) ? (
    <Text
      className={textVariants({
        disabled,
        active: active && activeHighlight,
      })}
    >
      {children}
    </Text>
  ) : (
    <Text
      className={textVariants({
        disabled,
        active: active && activeHighlight,
      })}
    >
      {text}
    </Text>
  );

  const badgeJSX = !isNil(badge) ? (
    <View className='absolute -top-1 -right-1 min-w-4 h-4 px-1 bg-red-500 rounded-full'>
      <Text className='text-xs text-white text-center'>{badge}</Text>
    </View>
  ) : null;

  return (
    <TouchableOpacity
      accessibilityRole='button'
      {...restProps}
      disabled={disabled}
      activeOpacity={0.7}
      className={cn(
        buttonVariants({
          type,
          size,
          round,
          active: active && activeHighlight,
          disabled,
        }),
        className
      )}
    >
      {childrenJSX}
      {badgeJSX}
    </TouchableOpacity>
  );
};

export default memo(ButtonOption);

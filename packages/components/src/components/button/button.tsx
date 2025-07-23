import { cva, type VariantProps } from 'class-variance-authority';
import isNil from 'lodash/isNil';
import isUndefined from 'lodash/isUndefined';
import noop from 'lodash/noop';
import React, { memo } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { twMerge } from 'tailwind-merge';

import Flex from '../flex';
import Loading from '../loading';
import type { ButtonProps } from './interface';
import { useDebounceFn } from '../../hooks';
import { cn } from '../../lib/utils';

const buttonVariants = cva('items-center justify-center', {
  variants: {
    size: {
      xs: 'h-7 px-2',
      s: 'h-8 px-3',
      m: 'h-10 px-4',
      l: 'h-12 px-5',
      xl: 'h-14 px-6',
    },
    type: {
      primary: '',
      outline: 'bg-fill-white border',
      ghost: 'bg-transparent border',
      link: 'bg-transparent border-0 p-0',
      hazy: '',
    },
    danger: {
      true: '',
      false: '',
    },
    square: {
      true: 'rounded-none px-0',
    },
    round: {
      true: 'rounded-full',
      false: 'rounded-none',
    },
    disabled: {
      true: 'opacity-50',
    },
    loading: {
      true: 'opacity-80',
    },
    hairline: {
      true: 'border-[0.5px]',
    },
  },
  compoundVariants: [
    // Primary Type Variants
    {
      type: 'primary',
      danger: false,
      className: 'bg-primary-5 border-primary-5',
    },
    {
      type: 'primary',
      danger: true,
      className: 'bg-danger-4 border-danger-4',
    },
    // Outline Type Variants
    {
      type: 'outline',
      danger: false,
      className: 'border-line-2',
    },
    {
      type: 'outline',
      danger: true,
      className: 'border-danger-4',
    },
    // Ghost Type Variants
    {
      type: 'ghost',
      danger: false,
      className: 'border-primary-5',
    },
    {
      type: 'ghost',
      danger: true,
      className: 'border-danger-4',
    },
    // Hazy Type Variants
    {
      type: 'hazy',
      danger: false,
      className: 'bg-primary-1 border-primary-1',
    },
    {
      type: 'hazy',
      danger: true,
      className: 'bg-danger-1 border-danger-1',
    },
  ],
  defaultVariants: {
    type: 'primary',
    size: 'l',
    danger: false,
    round: false,
    disabled: false,
    loading: false,
    hairline: false,
  },
});

const textVariants = cva('text-center', {
  variants: {
    size: {
      xs: 'text-xs',
      s: 'text-sm',
      m: 'text-base',
      l: 'text-lg',
      xl: 'text-xl',
    },
    type: {
      primary: 'text-text-1',
      outline: '',
      ghost: '',
      link: '',
      hazy: '',
    },
    danger: {
      true: '',
      false: '',
    },
    withIcon: {
      true: 'ml-2',
    },
  },
  compoundVariants: [
    // Non-primary type text colors
    {
      type: ['outline'],
      danger: false,
      className: 'text-text-5',
    },
    {
      type: ['ghost', 'link', 'hazy'],
      danger: false,
      className: 'text-primary-5',
    },
    {
      type: ['outline', 'ghost', 'link', 'hazy'],
      danger: true,
      className: 'text-danger-4',
    },
  ],
  defaultVariants: {
    type: 'primary',
    size: 'l',
    danger: false,
    withIcon: false,
  },
});

const subtextVariants = cva('text-tiny opacity-80', {
  variants: {
    type: {
      primary: 'text-text-1',
      other: '',
    },
    danger: {
      true: 'text-danger-5',
      false: 'text-primary-5',
    },
  },
  defaultVariants: {
    type: 'other',
    danger: false,
  },
});

/**
 * Button 按钮
 * @description 按钮用于触发一个操作，如提交表单。
 */
const Button: React.FC<ButtonProps> = ({
  children,
  style,
  text,
  subtext,
  textClassName,
  type = 'primary',
  danger = false,
  size = 'l',
  hairline = false,
  disabled = false,
  loading = false,
  loadingText,
  loadingIcon,
  square = false,
  round = false,
  renderLeftIcon,
  color,
  textColor,
  onPressDebounceWait = 0,
  className,
  ...restProps
}) => {
  const { run: runOnPress } = useDebounceFn(restProps.onPress || noop, {
    wait: onPressDebounceWait,
    leading: true,
    trailing: false,
  });

  const loadingColorClass = danger ? 'bg-danger-4' : 'bg-primary-7';

  const contextJSX = loading ? (
    <Loading colorClassName={loadingColorClass} size={16} textSize={12} loadingIcon={loadingIcon}>
      <Text
        className={cn(
          textVariants({
            type,
            size,
            danger,
            withIcon: !!renderLeftIcon,
          }),
          textClassName,
          'ml-2'
        )}
      >
        {isUndefined(loadingText) ? text : loadingText}
      </Text>
    </Loading>
  ) : (
    <>
      <Flex direction='row' align='center' justify='center'>
        {renderLeftIcon &&
          renderLeftIcon(
            danger ? '#CB2634' : '#4080FF',
            size === 'xl' ? 24 : size === 'l' ? 20 : size === 'm' ? 18 : 16
          )}
        <Text
          className={cn(
            textVariants({
              type,
              size,
              danger,
              withIcon: !!renderLeftIcon,
            }),
            textClassName
          )}
          numberOfLines={1}
        >
          {!isNil(text) ? text : children}
        </Text>
      </Flex>
      {subtext && (
        <Text
          className={subtextVariants({
            type: type === 'primary' ? 'primary' : 'other',
            danger,
          })}
          numberOfLines={1}
        >
          {subtext}
        </Text>
      )}
    </>
  );

  return (
    <TouchableOpacity
      accessibilityRole='button'
      {...restProps}
      disabled={disabled || loading}
      style={style}
      activeOpacity={0.7}
      className={cn(
        buttonVariants({
          type,
          size,
          danger,
          square,
          round,
          disabled,
          loading,
          hairline,
        }),
        className
      )}
      onPress={
        restProps.onPress ? (onPressDebounceWait ? runOnPress : restProps.onPress) : undefined
      }
    >
      {contextJSX}
    </TouchableOpacity>
  );
};

export default memo(Button);

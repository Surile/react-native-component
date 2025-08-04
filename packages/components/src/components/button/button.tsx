import isNil from 'lodash/isNil';
import isUndefined from 'lodash/isUndefined';
import noop from 'lodash/noop';
import React, { memo } from 'react';
import { Text, TouchableOpacity } from 'react-native';

import Flex from '../flex';
import Loading from '../loading';
import type { ButtonProps } from './interface';
import { useDebounceFn } from '../../hooks';
import { cn } from '../../lib/utils';
import { cva } from 'class-variance-authority';
import { renderTextLikeJSX } from '../../helpers';

const buttonSizeVariants = cva('items-center justify-center border-solid px-2 rounded flex-col', {
  variants: {
    size: {
      xl: 'h-[52px]',
      l: 'h-[44px]',
      m: 'h-[40px]',
      s: 'h-[32px]',
      xs: 'h-[24px]',
    },
  },
  defaultVariants: {
    size: 'l',
  },
});

const buttonTypeVariants = cva('', {
  variants: {
    type: {
      primary: 'bg-primary-5',
      hazy: 'bg-primary-5/15',
      outline: 'bg-white border border-gray-200',
      ghost: 'bg-transparent border border-primary-5',
      link: '',
    },
    danger: {
      true: 'bg-danger-5',
      false: '',
    },
    hairline: {
      true: 'border-hairline',
      false: '',
    },
    disabled: {
      true: 'opacity-40',
      false: '',
    },
    loading: {
      true: 'opacity-40',
      false: '',
    },
    square: {
      true: 'rounded-none',
      false: '',
    },
    round: {
      true: 'rounded-full',
    },
  },
  compoundVariants: [
    {
      type: 'primary',
      danger: true,
      className: 'bg-danger-5',
    },
    {
      type: 'hazy',
      danger: true,
      className: 'bg-danger-5/15',
    },
    {
      type: 'outline',
      danger: true,
      className: 'bg-white border',
    },
    {
      type: 'ghost',
      danger: true,
      className: 'bg-transparent border border-danger-5',
    },
    {
      type: 'link',
      danger: true,
      className: 'bg-transparent',
    },
    {
      type: 'ghost',
      hairline: true,
      className: 'border-hairline border-primary-5',
    },
    {
      type: 'ghost',
      hairline: true,
      danger: true,
      className: 'border-hairline border-danger-5',
    },
    {
      type: 'outline',
      hairline: true,
      className: 'border-hairline border-gray-200',
    },
    {
      type: 'outline',
      hairline: true,
      danger: true,
      className: 'border-hairline border-gray-200',
    },
  ],
});

const buttonTextVariants = cva('', {
  variants: {
    type: {
      primary: 'text-white',
      hazy: 'text-primary-5',
      outline: 'text-primary-5',
      ghost: 'text-primary-5',
      link: 'text-primary-5',
    },
    size: {
      xl: 'text-4xl',
      l: 'text-2xl',
      m: 'text-xl',
      s: 'text-lg',
      xs: 'text-lg',
    },
    danger: {
      true: '',
      false: '',
    },
  },
  compoundVariants: [
    {
      type: ['hazy', 'outline', 'ghost', 'link'],
      danger: true,
      className: 'text-danger-5',
    },
  ],
});

const loadingSize = {
  xl: 18,
  l: 16,
  m: 15,
  s: 14,
  xs: 14,
};

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
  onPressDebounceWait = 0,
  className,
  ...restProps
}) => {
  const { run: runOnPress } = useDebounceFn(restProps.onPress || noop, {
    wait: onPressDebounceWait,
    leading: true,
    trailing: false,
  });

  const leftIconColor = danger ? '#ffffff' : color || '#4080FF';

  const contextJSX = loading ? (
    <Loading size={loadingSize[size]} textSize={12} loadingIcon={loadingIcon}>
      <Text className={cn(textClassName, buttonTextVariants({ size, type, danger }), 'ml-2')}>
        {isUndefined(loadingText) ? text : loadingText}
      </Text>
    </Loading>
  ) : (
    <>
      <Flex direction='row' align='center' justify='center'>
        {renderLeftIcon && renderLeftIcon(leftIconColor, loadingSize[size])}
        <Text
          className={cn(
            {
              'ml-1': !!renderLeftIcon,
            },
            buttonTextVariants({ type, size, danger }),
            textClassName
          )}
          numberOfLines={1}
        >
          {!isNil(text) ? text : children}
        </Text>
      </Flex>
      {renderTextLikeJSX(subtext, cn('text-md opacity-70', buttonTextVariants({ type })), {
        numberOfLines: 1,
      })}
    </>
  );
  console.log('🚀 ~ Button ~ textClassName:', textClassName);

  return (
    <TouchableOpacity
      accessibilityRole='button'
      {...restProps}
      disabled={disabled || loading}
      style={style}
      activeOpacity={0.7}
      className={cn(
        buttonSizeVariants({ size }),
        buttonTypeVariants({ type, danger, hairline, disabled, loading, square, round }),
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

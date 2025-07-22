import { cva } from 'class-variance-authority';
import isBoolean from 'lodash/isBoolean';
import isNil from 'lodash/isNil';
import React, { memo } from 'react';
import { View, TouchableWithoutFeedback, Text } from 'react-native';
import { cn } from '../../lib/utils';

import Divider from '../divider';
import Skeleton from '../skeleton';
import CardBody from './card-body';
import type { CardProps } from './interface';

const cardVariants = cva('overflow-hidden bg-white', {
  variants: {
    size: {
      s: 'rounded-s',
      m: 'rounded-m',
    },
    square: {
      true: 'rounded-none',
    },
  },
  defaultVariants: {
    size: 'm',
    square: false,
  },
});

const headerVariants = cva('flex-row items-center justify-between px-3', {
  variants: {
    size: {
      s: 'min-h-[40px]',
      m: 'min-h-[50px]',
    },
  },
  defaultVariants: {
    size: 'm',
  },
});

const titleTextVariants = cva('flex-1 font-bold text-gray-8 mr-2', {
  variants: {
    size: {
      s: 'text-[15px] leading-5',
      m: 'text-[17px] leading-6',
    },
    hasTitleLeftExtra: {
      true: 'ml-2',
    },
  },
  defaultVariants: {
    size: 'm',
    hasTitleLeftExtra: false,
  },
});

const footerVariants = cva('px-3 py-2');

const Card: React.FC<CardProps> = ({
  children,
  title,
  titleLeftExtra,
  extra,
  footer,
  titleClassName,
  titleTextClassName,
  bodyClassName,
  footerClassName,
  footerTextClassName,
  size = 'm',
  square = false,
  loading = false,
  headerDivider = true,
  footerDivider = true,
  bodyPadding = true,
  onPressHeader,
  onLayoutHeader,
  onLayoutBody,
  className,
  ...restProps
}) => {
  const hasTitleLeftExtra = !isNil(titleLeftExtra);

  const titleJSX =
    typeof title === 'string' ? (
      <Text
        className={cn(titleTextVariants({ size, hasTitleLeftExtra }), titleTextClassName)}
        numberOfLines={1}
      >
        {title}
      </Text>
    ) : (
      title
    );

  const footerJSX =
    typeof footer === 'string' ? (
      <Text className={cn('text-gray-7 text-sm leading-5', footerTextClassName)}>{footer}</Text>
    ) : (
      footer
    );

  const showHeader = !isNil(titleJSX) || hasTitleLeftExtra || !isNil(extra);
  const headerJSX = (
    <>
      <View className={cn(headerVariants({ size }))}>
        <View className={cn('flex-row items-center flex-1', titleClassName)}>
          {titleLeftExtra}
          {titleJSX}
        </View>
        {extra}
      </View>
      {headerDivider ? <Divider /> : null}
    </>
  );

  return (
    <View {...restProps} className='bg-fill-white'>
      {showHeader ? (
        onPressHeader ? (
          <TouchableWithoutFeedback onPress={onPressHeader}>
            <View collapsable={false}>{headerJSX}</View>
          </TouchableWithoutFeedback>
        ) : (
          headerJSX
        )
      ) : null}
      <CardBody
        className={bodyClassName}
        padding={isBoolean(bodyPadding) && bodyPadding ? 12 : bodyPadding}
        onLayout={onLayoutBody}
      >
        {loading ? <Skeleton /> : children}
      </CardBody>

      {!isNil(footerJSX) ? (
        <>
          {footerDivider ? <Divider /> : null}
          <View className={cn(footerVariants(), footerClassName)}>{footerJSX}</View>
        </>
      ) : null}
    </View>
  );
};

export default memo(Card);

import { cva } from 'class-variance-authority';
import noop from 'lodash/noop';
import React, { memo } from 'react';
import { Text, View, Pressable } from 'react-native';
import { cn } from '../../lib/utils';

import Divider from '../divider';
import type { CellProps } from './interface';
import { useDebounceFn } from '../../hooks';

const cellVariants = cva('bg-fill-white', {
  variants: {
    vertical: {
      true: 'flex-col',
      false: 'flex-row items-center',
    },
    hasExtra: {
      true: 'pb-3',
    },
    center: {
      true: 'self-center',
    },
    pressed: {
      true: 'bg-fill-2',
    },
  },
  defaultVariants: {
    vertical: false,
    hasExtra: false,
    center: false,
    pressed: false,
  },
});

const titleVariants = cva('flex-row items-center', {
  variants: {
    center: {
      true: 'self-center',
    },
  },
  defaultVariants: {
    center: false,
  },
});

const valueVariants = cva('flex-1 min-w-0', {
  variants: {
    hasValue: {
      true: 'ml-2',
    },
    center: {
      true: 'self-center',
    },
    textAlign: {
      left: 'text-left',
      right: 'text-right',
      center: 'text-center',
    },
  },
  defaultVariants: {
    hasValue: false,
    center: false,
    textAlign: 'right',
  },
});

/**
 * Cell 单元格
 * @description 单元格为列表中的单个展示项。
 */
const Cell: React.FC<CellProps> = ({
  title,
  titleClassName,
  titleTextClassName,
  titleExtra,
  value,
  valueClassName,
  valueTextClassName,
  valueExtra,
  extra,
  extraTextClassName,
  contentClassName,
  divider = true,
  dividerLeftGap = 8,
  dividerRightGap = 8,
  isLink = false,
  onPressLink,
  center = false,
  arrowDirection = 'right',
  required = false,
  vertical = false,
  valueTextNumberOfLines,
  titleTextNumberOfLines,
  textAlign = 'right',
  onPressDebounceWait = 0,
  className,
  underlayColor,
  ...restProps
}) => {
  const { run: runOnPress } = useDebounceFn(restProps.onPress || noop, {
    wait: onPressDebounceWait,
    leading: true,
    trailing: false,
  });

  const requiredJSX = required ? (
    <View className='mr-1' testID='CELL_REQUIRED'>
      <Text className='text-danger-4 text-lg leading-none'>*</Text>
    </View>
  ) : null;

  const titleJSX =
    typeof title === 'string' ? (
      <Text
        className={cn('text-text-4 text-2xl', titleTextClassName)}
        numberOfLines={titleTextNumberOfLines}
      >
        {title}
      </Text>
    ) : (
      title
    );

  const valueJSX =
    typeof value === 'string' ? (
      <Text
        className={cn('text-text-3 text-2xl', valueTextClassName)}
        numberOfLines={valueTextNumberOfLines}
      >
        {value}
      </Text>
    ) : (
      value
    );

  const extraJSX =
    typeof extra === 'string' ? (
      <Text className={cn('text-text-3 text-2xl', extraTextClassName)}>{extra}</Text>
    ) : (
      extra
    );

  const linkJSX = isLink ? (
    <View
      className='ml-2 w-4 h-4 justify-center items-center'
      testID='CELL_LINK_ARROW'
      onTouchEnd={onPressLink}
    >
      <View
        className='w-2 h-2 border-t border-r border-text-3'
        style={{
          transform: [
            {
              rotate:
                arrowDirection === 'up'
                  ? '-45deg'
                  : arrowDirection === 'down'
                  ? '135deg'
                  : arrowDirection === 'left'
                  ? '-135deg'
                  : '45deg',
            },
          ],
        }}
      />
    </View>
  ) : null;

  const ctxJSX = (
    <>
      <View
        className={cn(
          valueVariants({
            hasValue: !!valueJSX,
            center,
            textAlign,
          }),
          valueClassName
        )}
      >
        {valueJSX}
      </View>
      {valueExtra}
      {linkJSX}
    </>
  );

  return (
    <Pressable
      {...restProps}
      onPress={
        restProps.onPress ? (onPressDebounceWait ? runOnPress : restProps.onPress) : undefined
      }
      className={cn('bg-fill-white', className)}
      style={({ pressed }) => [
        pressed &&
        (restProps.onPress || restProps.onLongPress || restProps.onPressIn || restProps.onPressOut)
          ? {
              backgroundColor: underlayColor,
            }
          : undefined,
      ]}
    >
      <View
        className={cn(
          'p-4',
          cellVariants({
            vertical,
            hasExtra: !!extra,
            center,
          })
        )}
      >
        <View className={cn(titleVariants({ center }), titleClassName)}>
          {requiredJSX}
          {titleExtra}
          {titleJSX}
        </View>

        {vertical ? <View className={cn('mt-2', contentClassName)}>{ctxJSX}</View> : ctxJSX}
      </View>
      {extraJSX}
      {divider && (
        <Divider className={cn(`ml-[${dividerLeftGap}px]`, `mr-[${dividerRightGap}px]`)} />
      )}
    </Pressable>
  );
};

export default memo(Cell);

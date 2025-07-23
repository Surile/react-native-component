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
      true: 'min-w-[100px]',
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
  innerClassName,
  ...restProps
}) => {
  const { run: runOnPress } = useDebounceFn(restProps.onPress || noop, {
    wait: onPressDebounceWait,
    leading: true,
    trailing: false,
  });

  if (vertical) {
    textAlign = 'left';
  }

  const requiredJSX = required ? (
    <View className='mr-1' testID='CELL_REQUIRED'>
      <Text className='text-danger-4 text-lg leading-none'>*</Text>
    </View>
  ) : null;

  const titleJSX =
    typeof title === 'string' ? (
      <Text
        className={cn('text-text-4 text-2xl', titleTextClassName)}
        style={{
          paddingVertical: (32 - 22) / 2,
        }}
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
        style={{
          textAlign,
          paddingVertical: (32 - 22) / 2,
        }}
        numberOfLines={valueTextNumberOfLines}
      >
        {value}
      </Text>
    ) : (
      value
    );

  const extraJSX =
    typeof extra === 'string' ? (
      <Text
        style={{
          marginHorizontal: 9,
          paddingBottom: 10,
        }}
        className={cn('text-text-3 text-2xl', extraTextClassName)}
      >
        {extra}
      </Text>
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
          'flex-1',
          valueVariants({ hasValue: !!valueJSX, center, textAlign }),
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
          'relative py-3 mx-[9px]',
          {
            'flex-row': !vertical,
            'pb-0': extra,
          },
          innerClassName
        )}
      >
        <View
          className={cn('relative flex-row mr-2 shrink', titleVariants({ center }), titleClassName)}
        >
          {requiredJSX}
          {titleExtra}
          {titleJSX}
        </View>

        {vertical ? (
          <View className={cn('flex-row items-center mt-2', contentClassName)}>{ctxJSX}</View>
        ) : (
          ctxJSX
        )}
      </View>
      {extraJSX}
      {divider && (
        <Divider
          style={{
            marginLeft: dividerLeftGap,
            marginRight: dividerRightGap,
          }}
        />
      )}
    </Pressable>
  );
};

export default memo(Cell);

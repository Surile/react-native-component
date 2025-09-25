import { cva } from 'class-variance-authority';
import isNil from 'lodash/isNil';
import React, { memo } from 'react';
import { View, TouchableWithoutFeedback, Text } from 'react-native';
import { cn } from '../../lib/utils';

import Divider from '../divider';
import type { CellGroupProps } from './interface';

const groupVariants = cva('', {
  variants: {
    hasTitle: {
      true: 'px-4 py-3 bg-fill-1',
    },
  },
  defaultVariants: {
    hasTitle: false,
  },
});

/**
 * CellGroup 单元格组
 * @description 一组单元格，可以设置一个标题。
 */
const CellGroup: React.FC<CellGroupProps> = ({
  children,
  title,
  extra,
  titleClassName,
  bodyClassName,
  bodyTopDivider = false,
  bodyBottomDivider = false,
  onPressTitle,
  onPressTitleText,
  className,
}) => {
  const titleContent =
    typeof title === 'string' ? (
      <Text className={cn('text-text-3 text-2xl', titleClassName)} onPress={onPressTitleText}>
        {title}
      </Text>
    ) : (
      title
    );

  const groupNameContent = (
    <View className={cn(groupVariants({ hasTitle: !!title || !!extra }), className)}>
      {titleContent}
      {extra}
    </View>
  );

  const bodyContent = (
    <>
      {bodyTopDivider && <Divider />}
      {children}
      {bodyBottomDivider && <Divider />}
    </>
  );

  return (
    <>
      {(titleContent || !isNil(extra)) &&
        (onPressTitle ? (
          <TouchableWithoutFeedback onPress={onPressTitle}>
            {groupNameContent}
          </TouchableWithoutFeedback>
        ) : (
          groupNameContent
        ))}
      {bodyClassName ? <View className={bodyClassName}>{bodyContent}</View> : bodyContent}
    </>
  );
};

export default memo(CellGroup);

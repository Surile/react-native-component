import React, { memo } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';

import type { FlexItemProps } from './interface';
import { cn } from '../../lib/utils';

const FlexItem: React.FC<FlexItemProps> = (props) => {
  const { style, children, className, ...restProps } = props;
  const inner = (
    <View style={style} className={cn('flex-1', className)} {...restProps}>
      {children}
    </View>
  );
  const shouldWrapInTouchableComponent =
    restProps.onPress || restProps.onLongPress || restProps.onPressIn || restProps.onPressOut;

  if (shouldWrapInTouchableComponent) {
    return <TouchableWithoutFeedback {...restProps}>{inner}</TouchableWithoutFeedback>;
  }

  return inner;
};

export default memo(FlexItem);

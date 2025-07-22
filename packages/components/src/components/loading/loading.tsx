import React, { isValidElement, memo } from 'react';
import isNil from 'lodash/isNil';
import { Text, View } from 'react-native';
import type { LoadingProps } from './interface';
import Spinner from './loading-spinner';
import { cn } from '../../lib/utils';

/**
 * Loading 加载
 * 加载图标，用于表示加载中的过渡状态。
 */
const Loading: React.FC<LoadingProps> = ({
  children,
  size,
  colorClassName,
  textSize,
  vertical = false,
  loadingIcon,
  ...restProps
}) => {
  const textJSX = !isNil(children) ? (
    isValidElement(children) ? (
      children
    ) : (
      <Text
        style={{
          fontSize: textSize,
        }}
        className={cn(
          'ml-2',
          {
            'ml-2 mt-2': vertical,
          },
          restProps.textClassName
        )}
      >
        {children}
      </Text>
    )
  ) : null;

  return (
    <View
      {...restProps}
      className={cn(
        'flex-row items-center',
        {
          'flex-col': vertical,
        },
        restProps.className
      )}
    >
      {isValidElement(loadingIcon) ? (
        loadingIcon
      ) : typeof loadingIcon === 'function' ? (
        loadingIcon(colorClassName)
      ) : (
        <Spinner size={size} colorClassName={colorClassName} />
      )}
      {textJSX}
    </View>
  );
};

export default memo(Loading);

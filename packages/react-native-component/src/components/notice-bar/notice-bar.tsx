import Color from 'color';
import isNil from 'lodash/isNil';
import noop from 'lodash/noop';
import React, { memo, useState, useCallback, useMemo } from 'react';
import type { ViewStyle, StyleProp } from 'react-native';
import { TouchableWithoutFeedback, View } from 'react-native';

import type { NoticeBarProps, NoticeBarMode } from './interface';
import { CrossOutline, ArrowRightOutline } from '../icons';
import { getDefaultValue, renderTextLikeJSX } from '../../helpers';
import { usePersistFn } from '../../hooks';
import { pickTouchablePropsField, omitTouchablePropsField } from '../icons/gen';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { vars } from 'nativewind';

const NOTICE_BAR_ICON_SIZE = 16;

const getModeIcon = (mode: NoticeBarMode | undefined) => {
  switch (mode) {
    case 'closeable':
      return CrossOutline;
    default:
      return ArrowRightOutline;
  }
};

const noticeVariables = cva('', {
  variants: {
    status: {
      primary: 'text-primary-5',
      warning: 'text-warning-5',
      success: 'text-success-5',
      error: 'text-danger-5 ',
    },
    size: {
      m: 'px-3 py-2',
      s: 'px-2 py-1',
    },
  },
  defaultVariants: {
    status: 'warning',
    size: 'm',
  },
});

/**
 * 通知栏
 */
const NoticeBar: React.FC<NoticeBarProps> = ({
  message,
  messageTextClassName,
  status = 'warning',
  mode,
  bordered = false,
  color,
  backgroundColor,
  iconColor,
  wrapable = false,
  square = true,
  size = 'm',
  renderLeftIcon,
  renderRightIcon,
  onPressClose,
  // TouchableWithoutFeedback 相关属性
  ...restProps
}) => {
  const onPressClosePersistFn = usePersistFn(onPressClose || noop);
  const [visible, setVisible] = useState(true);

  const barBackgroundColor = useMemo(() => Color('#FF9A2E').lightness(100).hex(), []);
  // 修正数据
  color = getDefaultValue(color, '#FF9A2E');
  backgroundColor = getDefaultValue(backgroundColor, barBackgroundColor);
  iconColor = getDefaultValue(iconColor, color)!;

  const ModeIcon = getModeIcon(mode);
  const leftIconJSX = renderLeftIcon?.(iconColor, NOTICE_BAR_ICON_SIZE);
  const rightIconJSX = renderRightIcon?.(iconColor, NOTICE_BAR_ICON_SIZE);
  const messageJSX = renderTextLikeJSX(
    message,
    cn(
      'flex-1 text-lg text-[--notice-bar-color]',
      {
        'ml-1': !isNil(leftIconJSX),
        'mr-1': !isNil(rightIconJSX) || mode,
      },
      messageTextClassName
    ),
    {
      numberOfLines: wrapable ? undefined : 1,
    }
  );

  const onPressModeIcon = useCallback(() => {
    if (mode === 'closeable') {
      setVisible(false);
      onPressClosePersistFn();
    }
  }, [mode, onPressClosePersistFn]);

  const touchableProps = pickTouchablePropsField(restProps);
  const viewProps = omitTouchablePropsField(restProps);

  if (visible) {
    return (
      <TouchableWithoutFeedback {...touchableProps}>
        <View
          {...viewProps}
          style={vars({
            '--notice-bar-background-color': String(backgroundColor ?? '#FF9A2E'),
            '--notice-bar-color': String(color ?? '#FF9A2E'),
          })}
          className={cn(
            'flex-row',
            {
              'bg-[var(--notice-bar-background-color)]': backgroundColor,
              'border-[var(--notice-bar-color)]': color,
              'border-0': !bordered,
              'border-1': bordered,
              rounded: square,
            },
            noticeVariables({ status, size }),
            viewProps.className
          )}
        >
          {leftIconJSX}
          {messageJSX}
          {rightIconJSX}
          {mode ? (
            <ModeIcon
              testID='NOTICE_BAR_ICON'
              color={iconColor}
              size={NOTICE_BAR_ICON_SIZE}
              onPress={onPressModeIcon}
              pointerEvents={mode === 'closeable' ? 'auto' : 'none'}
            />
          ) : null}
        </View>
      </TouchableWithoutFeedback>
    );
  }

  return null;
};

export default memo(NoticeBar);

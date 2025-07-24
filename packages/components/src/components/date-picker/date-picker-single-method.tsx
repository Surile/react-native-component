import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import omit from 'lodash/omit';
import pick from 'lodash/pick';
import { Platform, View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { DatePickerAction, DatePickerSingleMethodProps } from './interface';
import DatePickerView from '../date-picker-view';
import type { DatePickerViewProps } from '../date-picker-view/interface';
import { usePersistFn } from '../../hooks';
import { callInterceptor } from '../../helpers';
import Popup from '../popup';
import { cn } from '../../lib/utils';

const DATE_PICKER_VIEW_PROPS_KEYS = ['defaultValue', 'mode', 'min', 'max', 'renderLabel'];

const DatePickerSingleMethod: React.FC<DatePickerSingleMethodProps> = ({
  title,
  confirmButtonText,
  cancelButtonText,
  onCancel,
  onConfirm,
  onPressOverlay,
  beforeClose,
  ...restProps
}) => {
  const insets = useSafeAreaInsets();

  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const Value = useRef<Date>(restProps.defaultValue || new Date());

  useEffect(() => {
    setVisible(true);
  }, []);

  const onChange = useCallback((v: Date) => {
    Value.current = v;
  }, []);

  const doAction = usePersistFn((action: DatePickerAction) => {
    setLoading(true);

    callInterceptor(beforeClose, {
      args: [action, Value.current],
      done: () => {
        switch (action) {
          case 'cancel':
            onCancel?.(Value.current);

            break;
          case 'confirm':
            onConfirm?.(Value.current);

            break;
          case 'overlay':
            onPressOverlay?.(Value.current);

            break;
          default:
            break;
        }

        setLoading(false);
        setVisible(false);
      },
      canceled: () => {
        setLoading(false);
      },
    });
  });

  const onPressCancel = useCallback(() => {
    doAction('cancel');
  }, [doAction]);

  const onPressConfirm = useCallback(() => {
    doAction('confirm');
  }, [doAction]);

  const onPressPopupOverlay = useCallback(() => {
    doAction('overlay');
  }, [doAction]);

  const onRequestClose = useCallback(() => {
    onPressPopupOverlay();

    return true;
  }, [onPressPopupOverlay]);

  const dataPickerViewProps = pick(restProps, DATE_PICKER_VIEW_PROPS_KEYS) as DatePickerViewProps;
  const popupProps = omit(restProps, DATE_PICKER_VIEW_PROPS_KEYS);

  return (
    <Popup
      {...popupProps}
      onRequestClose={onRequestClose}
      visible={visible}
      onPressOverlay={onPressPopupOverlay}
      position='bottom'
      round
    >
      <Popup.Header
        showClose={false}
        title={title}
        leftExtra={
          <Text
            suppressHighlighting
            className='text-base text-muted-foreground color-[#5E5E5E]'
            onPress={loading ? undefined : onPressCancel}
          >
            {cancelButtonText ?? '取消'}
          </Text>
        }
        rightExtra={
          <Text
            suppressHighlighting
            className='text-base text-primary'
            onPress={loading ? undefined : onPressConfirm}
          >
            {confirmButtonText ?? '确定'}
          </Text>
        }
      />

      <DatePickerView {...dataPickerViewProps} loading={loading} onChange={onChange} />

      <View
        className={cn(Platform.OS !== 'ios' ? 'h-4' : 'h-0')}
        style={{ height: insets.bottom }}
      />
    </Popup>
  );
};

export default memo(DatePickerSingleMethod);

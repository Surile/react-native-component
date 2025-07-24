import React, { memo, useEffect, useRef, useState } from 'react';
import { Platform, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import DatePickerRangeView from './date-picker-range-view';
import type { DatePickerRangeAction, DatePickerRangeMethodProps } from './interface';
import { usePersistFn } from '../../hooks';
import { callInterceptor } from '../../helpers';
import Popup from '../popup';
import { cn } from '../../lib/utils';

const DatePickerRangeMethod: React.FC<DatePickerRangeMethodProps> = ({
  title,
  subTitle,
  onCancel,
  onPressOverlay,
  beforeClose,
  // DatePickerRangeView
  mode,
  defaultValue,
  confirmButtonText,
  resetButtonText,
  placeholder,
  onConfirm,
  max,
  min,
  renderLabel,
  onClear,
  clearable,
  clearButtonText,

  ...restProps
}) => {
  const insets = useSafeAreaInsets();

  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const Values = useRef<[Date | null, Date | null]>(
    defaultValue && defaultValue.length === 2 ? defaultValue : [null, null]
  );

  useEffect(() => {
    setVisible(true);
  }, []);

  const onChangeRangeView = usePersistFn((d: [Date, Date]) => {
    Values.current = d;
  });

  const doAction = usePersistFn((action: DatePickerRangeAction) => {
    setLoading(true);

    callInterceptor(beforeClose, {
      args: [action, Values.current],
      done: () => {
        switch (action) {
          case 'cancel':
            onCancel?.(Values.current);

            break;
          case 'confirm':
            onConfirm?.(Values.current);

            break;
          case 'overlay':
            onPressOverlay?.(Values.current);

            break;
          case 'clear':
            onClear?.(Values.current);

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

  const onPressPopupOverlay = usePersistFn(() => {
    doAction('overlay');
  });

  const onPressClose = usePersistFn(() => {
    doAction('cancel');
  });

  const onPressConfirm = usePersistFn(() => {
    doAction('confirm');
  });

  const onPressClear = usePersistFn(() => {
    doAction('clear');
  });

  const onRequestClose = usePersistFn(() => {
    doAction('overlay');

    return true;
  });

  const rangeProps = {
    mode,
    defaultValue: Values.current,
    confirmButtonText,
    resetButtonText,
    placeholder,
    onConfirm: onPressConfirm,
    max,
    min,
    renderLabel,
    clearable,
    clearButtonText,
    onClear: onPressClear,
  };

  return (
    <Popup
      {...restProps}
      onRequestClose={onRequestClose}
      visible={visible}
      onPressOverlay={onPressPopupOverlay}
      position='bottom'
      round
    >
      <Popup.Header title={title} onClose={onPressClose} />

      {subTitle && (
        <View className='flex flex-row items-center justify-center'>
          <Text className='mx-auto text-sm text-gray-500/50'>{subTitle}</Text>
        </View>
      )}

      <DatePickerRangeView
        {...rangeProps}
        onChange={(val) => {
          // @ts-ignore
          onChangeRangeView(val);
        }}
        loading={loading}
      />

      <View
        className={cn(Platform.OS !== 'ios' ? 'h-4' : 'h-0')}
        style={{ height: insets.bottom }}
      />
    </Popup>
  );
};

export default memo(DatePickerRangeMethod);

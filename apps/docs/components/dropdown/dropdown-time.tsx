import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import dayjs from 'dayjs';
import { isArray } from 'lodash';
import isNil from 'lodash/isNil';
import { View } from 'react-native';
import { useDropdownConfig } from './context';
import DropdownText from './dropdown-text';
import type { DropdownTimeProps } from './interface';
import DatePicker from '../date-picker';
import { DatePickerRangeValue } from '../date-picker/interface';
import DatePickerView from '../date-picker-view';
import { getDefaultValue } from '../../helpers';
import { useControllableValue, usePersistFn } from '../../hooks';
import { Portal, Toast } from '..';
import { cn } from '../../lib/utils';
import DropdownPopup from './dropdown-popup';
import Button from '../button/button';

const DropdownSelectorMethod = ({
  targetHeight,
  targetPageY,
  onConfirm,
  diasbledDate,
  onCancel,
  duration,
  zIndex,
  closeOnPressOutside,
  onClosed,
  testID,
  mode,
  clearable,
  clearButtonText,
  confirmButtonText,
  method = 'Range',
  onClear,
  initialValue,
  ...restProps
}: Omit<DropdownTimeProps, 'placeholder'>) => {
  const [visible, setVisible] = useState(false);
  const defaultValue =
    method === 'Range' ? restProps.value || [null, null] : dayjs(restProps?.value as any).toDate();

  const [value, setValue] = useState<DatePickerRangeValue | Date>(defaultValue);

  const Values = useRef<DatePickerRangeValue | Date>(defaultValue);

  useEffect(() => {
    setVisible(true);
    Values.current = value as any;
  }, [value]);

  const onPressShade = useCallback(() => {
    setVisible(false);
    onCancel?.();
  }, [onCancel]);

  const onRequestClose = usePersistFn(() => {
    onPressShade();

    return true;
  });

  const onChangePickView = usePersistFn((v) => {
    console.log('🚀 ~ onChangePickView ~ v:', v);
    Values.current = v;
    setValue(Values.current);
  });

  const onPressClear = usePersistFn(() => {
    if (method === 'Range') {
      setValue([null, null]);
    } else {
      setValue(new Date());
    }

    Values.current = value;
    console.log('🚀 ~ onPressClear ~ Values.current:', Values.current);

    onClear?.(Values.current);
  });

  const onConfirmTime = usePersistFn(() => {
    if (isArray(Values.current) && !Values.current?.[1]) {
      Toast({
        type: 'text',
        message: '请选择结束时间',
      });

      return;
    }

    if (diasbledDate?.(Values.current)) {
      return;
    }

    setVisible(false);

    onConfirm?.(Values.current);
  });

  return (
    <DropdownPopup
      testID={testID}
      targetHeight={targetHeight}
      targetPageY={targetPageY}
      closeOnPressOutside={closeOnPressOutside}
      duration={duration}
      zIndex={zIndex}
      onPressShade={onPressShade}
      visible={visible}
      onRequestClose={onRequestClose}
      onClosed={onClosed}
      onPressOverlay={onPressShade}
      contentClassName='py-3'
    >
      {method === 'Range' ? (
        <DatePicker.RangeView
          onConfirm={onConfirmTime}
          mode={mode}
          initialValue={initialValue || [dayjs().toDate(), dayjs().toDate()]}
          value={value as any}
          clearButtonText={clearButtonText}
          clearable={clearable}
          confirmButtonText={confirmButtonText}
          min={restProps?.min}
          max={restProps?.max}
          onChange={onChangePickView}
          onClear={onPressClear}
        />
      ) : (
        <>
          <DatePickerView
            mode={mode}
            min={restProps.min}
            max={restProps.max}
            value={value as any}
            onChange={onChangePickView}
          />
          <View className='flex-row gap-x-3 px-4'>
            <View className={cn('flex-1 gap-y-3')}>
              <Button
                size='xs'
                type='outline'
                text={confirmButtonText ?? '重置'}
                onPress={onPressClear}
              ></Button>
            </View>
            <View className='flex-1 gap-y-3'>
              <Button size='xs' onPress={onConfirmTime} text={confirmButtonText ?? '确定'}></Button>
            </View>
          </View>
        </>
      )}
    </DropdownPopup>
  );
};

const DropdownTimeMethodMemo = memo(DropdownSelectorMethod);
const DropdownTimePopup = (opt: Omit<DropdownTimeProps, 'onClosed'>) => {
  return new Promise<{ values?: DropdownTimeProps['value']; value?: Date }>((resolve, reject) => {
    const key = Portal.add(
      <DropdownTimeMethodMemo
        {...opt}
        onClear={(v) => {
          opt.onConfirm?.(v);

          if (opt.method === 'Range') {
            resolve({
              values: v as DatePickerRangeValue,
            });
          } else {
            resolve({
              value: v as Date,
            });
          }
        }}
        onCancel={() => {
          opt.onCancel?.();
          reject(new Error());
        }}
        onConfirm={(v) => {
          opt.onConfirm?.(v);

          if (opt.method === 'Range') {
            resolve({
              values: v as DatePickerRangeValue,
            });
          } else {
            resolve({
              value: v as Date,
            });
          }
        }}
        onClosed={() => {
          Portal.remove(key);
        }}
      />
    );
  });
};

const defaultInitialValue: DatePickerRangeValue = [null, null];

const DropdownTime = ({
  popupTestID,
  titleClassName,
  titleTextClassName,
  duration,
  zIndex,
  closeOnPressOutside,
  loading,
  placeholder = '',
  defaultValue,
  initialValue,
  method,
  formatStr = 'YYYY-MM-DD',
  ...restProps
}: Omit<DropdownTimeProps, 'targetHeight' | 'targetPageY'>) => {
  const config = useDropdownConfig();
  const _initialValue = !isNil(initialValue) ? initialValue : defaultInitialValue;
  const [value, onChange] = useControllableValue<DatePickerRangeValue | Date>(restProps, {
    defaultValue: method === 'Range' ? [..._initialValue] : new Date(),
  });
  const [active, setActive] = useState(false);
  const _selectOption = useMemo(() => {
    if (loading) {
      const x = {
        label: '加载中...',
        value: null as any,
      };

      return x;
    }

    let selectOption;

    if (isArray(value) && value.some((item) => !!item)) {
      selectOption = {
        label: `${dayjs(value?.[0]).format(formatStr)}-${dayjs(value?.[1]).format(formatStr)}`,
      };
    } else {
      selectOption = {
        label: value ? `${dayjs(value as any).format(formatStr)} ` : '日期',
      };
    }

    return selectOption;
  }, [loading, value, formatStr]);

  duration = getDefaultValue(duration, config.duration);
  zIndex = getDefaultValue(zIndex, config.zIndex);
  closeOnPressOutside = getDefaultValue(closeOnPressOutside, config.closeOnPressOutside);

  const onPressText = usePersistFn(() => {
    // 计算 Menu 的 Top 和元素高度
    config.MenuRef.current?.measure((x, y, width, height, pageX, pageY) => {
      setActive(true);
      DropdownTimePopup({
        targetHeight: height,
        targetPageY: pageY,
        defaultValue,
        duration,
        zIndex,
        closeOnPressOutside,
        activeColor: config.activeColor,
        testID: popupTestID,
        ...restProps,
        method,
        value,
        initialValue,
      })
        .then((v) => {
          // @ts-ignore
          onChange([...(v.values as any)]);
        })
        .catch(() => {})
        .finally(() => {
          setActive(false);
        });
    });
  });

  return (
    <DropdownText
      {...restProps}
      className={titleClassName}
      textClassName={titleTextClassName}
      title={!isNil(_selectOption?.label) ? _selectOption.label : placeholder}
      badge={1}
      active={active}
      onPress={onPressText}
      disabled={restProps.disabled || loading}
    />
  );
};

export default memo(DropdownTime);

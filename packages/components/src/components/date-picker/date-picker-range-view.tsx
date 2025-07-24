import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import isNil from 'lodash/isNil';
import { TouchableOpacity, View, Text } from 'react-native';
import type { DatePickerRangeValue, DatePickerRangeViewProps } from './interface';
import DatePickerView from '../date-picker-view';
import { formatDate } from '../date-picker-view/helper';
import useDateMinMax from '../date-picker-view/useDateMinMax';
import { useControllableValue, usePersistFn } from '../../hooks';
import { cn } from '../../lib/utils';
import Button from '../button';

const defaultInitialValue: DatePickerRangeValue = [null, null];

const getRightDate = (v: Date, min: Date, max: Date) => {
  if (v.getTime() < min.getTime()) {
    return min;
  }

  if (v.getTime() > max.getTime()) {
    return max;
  }

  return v;
};

const DatePickerRangeView: React.FC<DatePickerRangeViewProps> = ({
  initialValue,
  confirmButtonText,
  resetButtonText,
  onConfirm,
  placeholder,
  clearable,
  onClear,
  clearButtonText,

  // DateView
  mode = 'Y-D',
  min,
  max,
  renderLabel,
  loading,

  testID,
  ...restProps
}) => {
  const _initialValue = !isNil(initialValue) ? initialValue : defaultInitialValue;

  const [value, onChange] = useControllableValue<DatePickerRangeValue>(restProps, {
    defaultValue: [..._initialValue],
  });
  const [minDateS, maxDateS] = useDateMinMax(mode, min, value[1] || max);
  const [minDateE, maxDateE] = useDateMinMax(mode, value[0] || min, max);
  const currentDate = useMemo(() => new Date(), []);

  const [dayActive, setDayActive] = useState<0 | 1>(0);
  const Values = useRef<DatePickerRangeValue>([...value]);
  const OriginalValues = useRef<DatePickerRangeValue>([..._initialValue]);
  const [limitDates, setLimitDates] = useState<DatePickerRangeValue>([
    min || null,
    Values.current[1] || max || null,
  ]);

  // 同步 value，避免外部 value 清空后，触发 onChangePickView 的时候把旧数据带出来
  useEffect(() => {
    Values.current = [...value];
  }, [value]);

  const onChangePickView = usePersistFn((v: Date) => {
    Values.current[dayActive] = v;
    onChange([...Values.current]);
  });

  const onPressConfirm = usePersistFn(() => {
    onConfirm?.(Values.current);
  });
  const onPressClear = usePersistFn(() => {
    onClear?.(Values.current);
  });

  const onPressDay1 = usePersistFn(() => {
    // 切换的时候没有滚动时间做默认选择
    if (!Values.current[0]) {
      Values.current[0] = getRightDate(currentDate, minDateE, maxDateE);
      onChange([...Values.current]);
    }

    setDayActive(0);
    setLimitDates([min || null, Values.current[1] || max || null]);
  });

  const onPressDay2 = usePersistFn(() => {
    // 切换的时候没有滚动时间做默认选择
    if (!Values.current[1]) {
      Values.current[1] = getRightDate(Values.current[0] || new Date(), minDateS, maxDateS);
      onChange([...Values.current]);
    }

    setDayActive(1);
    setLimitDates([Values.current[0] || min || null, max || null]);
  });

  const onPressReset = usePersistFn(() => {
    Values.current = [...OriginalValues.current];

    onChange([...Values.current]);

    // 最大最小时间使用了 useMemo，等数据重新计算好后再回到开始时间
    setTimeout(() => {
      onPressDay1();
    }, 0);
  });

  // 把开时间提前锁定
  useEffect(() => {
    onPressDay1();
  }, [onPressDay1]);

  return (
    <>
      <View className='flex-row px-4' testID={testID}>
        <TouchableOpacity
          className='flex-1 items-center justify-center'
          onPress={onPressDay1}
          activeOpacity={0.8}
        >
          <Text className='native:text-base text-sm text-muted-foreground'>开始时间</Text>
          <Text
            className={cn('native:text-base mt-1 text-sm text-gray-300', {
              'text-primary font-semibold': dayActive === 0,
            })}
          >
            {value[0] ? formatDate(mode, value[0]) : placeholder?.[0] ?? '请选择'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className='flex-1 items-center justify-center'
          onPress={onPressDay2}
          activeOpacity={0.8}
        >
          <Text className='native:text-base text-sm text-muted-foreground'>结束时间</Text>
          <Text
            className={cn('native:text-base mt-1 text-sm text-gray-300', {
              'font-semibold text-primary': dayActive === 1,
            })}
          >
            {value[1] ? formatDate(mode, value[1]) : placeholder?.[1] ?? '请选择'}
          </Text>
        </TouchableOpacity>
      </View>

      <DatePickerView
        mode={mode}
        value={value[dayActive] || currentDate}
        renderLabel={renderLabel}
        onChange={onChangePickView}
        min={limitDates[0] || undefined}
        max={limitDates[1] || undefined}
        loading={loading}
      />

      <View className='flex-row gap-x-3 px-4'>
        {clearable ? (
          <View className='flex-1 gap-y-1.5'>
            <Button
              size='m'
              type='ghost'
              onPress={onPressClear}
              text={clearButtonText ?? '清空'}
            ></Button>
          </View>
        ) : null}
        <View className={cn('flex-1', clearable ? 'gap-y-1.5' : 'gap-y-3')}>
          <Button
            size='m'
            type='ghost'
            onPress={onPressReset}
            text={resetButtonText ?? '重置'}
          ></Button>
        </View>
        <View className='flex-1 gap-y-3'>
          <Button text={confirmButtonText ?? '确定'} size='m' onPress={onPressConfirm} />
        </View>
      </View>
    </>
  );
};

export default memo(DatePickerRangeView);

import isUndefined from 'lodash/isUndefined';
import omit from 'lodash/omit';
import React, { useMemo, memo } from 'react';
import type { TextStyle, StyleProp } from 'react-native';
import { Keyboard } from 'react-native';

import Cell from '../cell';
import DatePicker from '../date-picker';
import type { DatePickerRangeValue } from '../date-picker/interface';
import { formatDate } from '../date-picker-view/helper';
import TextInputClear from '../text-input/text-input-clear';

import type { FieldDateRangeProps } from './interface';
import { getDefaultValue, renderTextLikeJSX } from '../../helpers';
import { useControllableValue, usePersistFn } from '../../hooks';
import { SwapRightOutline } from '../icons';
import { cn } from '../../lib/utils';

const FieldDateRange: React.FC<FieldDateRangeProps> = ({
  mode = 'Y-D',
  min,
  max,
  renderLabel,
  confirmButtonText,
  resetButtonText,
  formatValueText,
  datePickerTitle,
  dataPickerBeforeClose,
  datePickerCustomOption,
  isLink = true,
  editable = true,
  clearable = false,
  placeholder,
  placeholderTextColor,

  valueClassName,
  valueTextClassName,
  textAlign = 'right',
  ...restProps
}) => {
  if (restProps.vertical) {
    textAlign = 'left';
  }

  // 修正数据
  placeholderTextColor = getDefaultValue(placeholderTextColor, '#B9BEC5');

  const [value, onChange] = useControllableValue<DatePickerRangeValue | undefined>(restProps);
  const valueTexts = useMemo<[string, string] | undefined>(
    () =>
      value?.[0] && value[1] ? [formatDate(mode, value[0]), formatDate(mode, value[1])] : undefined,
    [value, mode]
  );

  const hasValue = !isUndefined(valueTexts);

  const valueTextStyles = useMemo<StyleProp<TextStyle>>(() => {
    return [
      !hasValue
        ? {
            color: placeholderTextColor,
          }
        : null,
    ];
  }, [hasValue, placeholderTextColor]);

  const onPress = usePersistFn(() => {
    Keyboard.dismiss();

    const option = {
      defaultValue: value,
      confirmButtonText,
      resetButtonText,
      mode,
      min,
      max,
      renderLabel,
      title: datePickerTitle,
      beforeClose: dataPickerBeforeClose,
    };

    DatePicker.range(datePickerCustomOption ? datePickerCustomOption(option) : option).then(
      ({ action, values: _values }) => {
        if (action === 'confirm') {
          onChange(_values);
        }
      }
    );
  });

  const swapRightJSX = (
    <SwapRightOutline
      size={16}
      color={'#8C9199'}
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 2,
      }}
    />
  );
  const showTexts =
    hasValue && formatValueText && value
      ? formatValueText(value, mode, valueTexts)
      : (valueTexts as [string, string]);

  return (
    <Cell
      {...omit(restProps, ['value', 'defaultValue', 'onChange'])}
      disabled={!editable}
      onPress={onPress}
      valueClassName={cn(
        'flex-row items-center',
        {
          'justify-end': textAlign === 'right',
          'justify-center': textAlign === 'center',
          'justify-start': textAlign === 'left',
        },
        valueClassName
      )}
      value={
        hasValue ? (
          <>
            {renderTextLikeJSX(showTexts[0], cn(valueTextClassName, 'text-gray-700 text-2xl'), {
              style: valueTextStyles,
            })}
            {swapRightJSX}
            {renderTextLikeJSX(showTexts[1], cn(valueTextClassName, 'text-gray-700 text-2xl'), {
              style: valueTextStyles,
            })}
          </>
        ) : (
          <>
            {placeholder?.[0]
              ? renderTextLikeJSX(
                  placeholder[0],
                  cn(valueTextClassName, 'text-gray-700 text-2xl'),
                  {
                    style: valueTextStyles,
                  }
                )
              : null}
            {swapRightJSX}
            {placeholder?.[1]
              ? renderTextLikeJSX(
                  placeholder[1],
                  cn(valueTextClassName, 'text-gray-700 text-2xl'),
                  {
                    style: valueTextStyles,
                  }
                )
              : null}
          </>
        )
      }
      isLink={value && clearable ? false : isLink}
      valueExtra={
        value && clearable ? (
          <>
            {restProps.valueExtra}
            <TextInputClear
              onPress={() => {
                onChange(undefined);
              }}
            />
          </>
        ) : (
          restProps.valueExtra
        )
      }
    />
  );
};

export default memo(FieldDateRange);

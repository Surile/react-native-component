import isArray from 'lodash/isArray';
import isUndefined from 'lodash/isUndefined';
import React, { memo } from 'react';
import { Keyboard, View } from 'react-native';

import Selector from '../selector';
import type { SelectorValue } from '../selector/interface';
import TextInputClear from '../text-input/text-input-clear';
import type { TreeOption } from '../tree/interface';

import FieldText from './field-text';
import type { FieldSelectorProps } from './interface';
import { usePersistFn } from '../../hooks';
import Loading from '../loading';

/**
 * 输入框 选择输入
 */
const FieldSelector: React.FC<FieldSelectorProps> = ({
  value,
  options,
  multiple,
  onChange,
  optionsLoading = false,
  editable = true,
  clearable = false,
  selectorTitle,
  renderResultText,
  search,

  isLink = true,
  ...restProps
}) => {
  const onPressCell = usePersistFn(() => {
    Keyboard.dismiss();
    if (editable) {
      Selector({
        title: selectorTitle ?? '请选择',
        multiple,
        options,
        value,
        search,
        onChange,
      }).catch(() => {});
    }
  });
  const hasValue = multiple
    ? isArray(value as SelectorValue[]) && (value as SelectorValue[]).length > 0
    : !isUndefined(value as SelectorValue);
  const _value = hasValue ? ((multiple ? value : [value]) as SelectorValue[]) : undefined;
  const _option =
    (_value
      ?.map((o) => {
        const index = options.findIndex((ops) => ops.value === o);
        if (index >= 0) {
          return options[index];
        }
        return null;
      })
      .filter(Boolean) as TreeOption[]) ?? [];
  const value2text = hasValue
    ? renderResultText
      ? renderResultText(_value, _option)
      : _option.map((o) => o.label).join('、')
    : undefined;

  return (
    <FieldText
      {...restProps}
      onPress={optionsLoading ? undefined : onPressCell}
      value={value2text}
      isLink={optionsLoading || (hasValue && clearable) ? false : isLink}
      valueExtra={
        optionsLoading || (hasValue && clearable) ? (
          <>
            {restProps.valueExtra}
            {optionsLoading ? (
              <View className='ml-2 justify-center items-center'>
                <Loading testID='FIELD_SELECTOR_LOADING' size={16} color={'#8C9199'} />
              </View>
            ) : (
              <TextInputClear
                onPress={() => {
                  // TODO 修复类型报错
                  onChange?.((multiple ? [] : undefined) as any, []);
                }}
              />
            )}
          </>
        ) : (
          restProps.valueExtra
        )
      }
    />
  );
};

export default memo(FieldSelector);

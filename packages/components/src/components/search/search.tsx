import isUndefined from 'lodash/isUndefined';
import noop from 'lodash/noop';
import { useRef, useCallback, memo, forwardRef } from 'react';
import { View } from 'react-native';

import Button from '../button';
import TextInput from '../text-input';
import type { TextInputInstance } from '../text-input/interface';

import type { SearchProps } from './interface';
import { useDebounceFn, usePersistFn } from '../../hooks';
import { getDefaultValue } from '../../helpers';
import { cn } from '../../lib/utils';
import { ArrowLeftOutline, SearchOutline } from '../icons';

/**
 * 搜索
 */
const Search = forwardRef<TextInputInstance, SearchProps>(
  (
    {
      iconSize = 20,
      iconColor,
      onSearch,
      showBack = false,
      onPressBack,
      autoSearch = false,
      showSearchButton = true,
      onSearchDebounceWait = 300,
      searchText,
      extra,
      prefix,
      suffix,

      value,
      defaultValue,
      placeholder,
      placeholderTextColor,
      autoFocus,
      onChangeText,

      style,
      ...restProps
    },
    ref
  ) => {
    const onChangeTextPersistFn = usePersistFn(onChangeText || noop);
    const { run: runOnSearch } = useDebounceFn(onSearch || noop, {
      wait: onSearchDebounceWait,
      leading: false,
      trailing: true,
    });

    /** 输入框内部的值，不维护状态，避免没必要的更新 */
    const SearchText = useRef(!isUndefined(value) ? value : defaultValue);

    placeholderTextColor = getDefaultValue(placeholderTextColor, '#6b7280');

    iconColor = getDefaultValue(iconColor, placeholderTextColor as string);

    const onChange = useCallback(
      (v: string) => {
        SearchText.current = v;

        if (autoSearch) {
          runOnSearch(v);
        }
      },
      [autoSearch, runOnSearch]
    );

    const _onChangeText = useCallback(
      (v: string) => {
        SearchText.current = v;
        onChangeTextPersistFn(v);

        if (autoSearch) {
          runOnSearch(v);
        }
      },
      [autoSearch, onChangeTextPersistFn, runOnSearch]
    );

    const onPress = useCallback(() => {
      runOnSearch(SearchText.current);
    }, [runOnSearch]);

    // TextInput value、defaultValue 对值进行了判断，影响 clearable
    // 此处对两个属性的 undefined 情况进行过滤，useControllableValue 能正确识别是否受控
    const textInputProps = {
      ...(isUndefined(value) ? {} : { value }),
      ...(isUndefined(defaultValue) ? {} : { defaultValue }),
    };

    return (
      <View
        {...restProps}
        className={cn(
          'bg-white px-3 py-1 gap-2 flex-row items-center',
          {
            'pl-2': showBack,
          },
          restProps.className
        )}
      >
        {showBack ? (
          <ArrowLeftOutline
            onPress={onPressBack}
            color='#11151A'
            size={24}
            className='items-center justify-center mr-2'
          />
        ) : null}

        <TextInput
          ref={ref}
          {...textInputProps}
          clearable
          fixGroupClassName='flex-1 bg-gray-100 rounded'
          className={cn('ml-2')}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          prefix={
            <>
              {prefix}
              <SearchOutline className='mx-2' color={iconColor} size={20} />
            </>
          }
          suffix={suffix}
          onChange={onChange}
          onChangeText={_onChangeText}
          autoFocus={autoFocus}
        />
        {showSearchButton ? (
          <Button
            text={searchText ?? '搜索'}
            type='primary'
            className='ml-2'
            size='s'
            onPress={onPress}
          />
        ) : null}

        {extra}
      </View>
    );
  }
);

export default memo(Search);

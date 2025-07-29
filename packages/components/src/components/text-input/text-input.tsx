import isNil from 'lodash/isNil';
import isUndefined from 'lodash/isUndefined';
import noop from 'lodash/noop';
import React, {
  useState,
  useRef,
  useCallback,
  useMemo,
  useImperativeHandle,
  memo,
  forwardRef,
} from 'react';
import type {
  ViewStyle,
  TextStyle,
  StyleProp,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  TextInputEndEditingEventData,
  TextInputChangeEventData,
} from 'react-native';
import {
  View,
  InputAccessoryView,
  Text,
  TextInput as RNTextInput,
  TouchableOpacity,
  Keyboard,
  Platform,
  useColorScheme,
} from 'react-native';

import type { TextInputProps, TextInputInstance } from './interface';
import TextInputClear from './text-input-clear';
import { getDefaultValue, renderTextLikeJSX } from '../../helpers';
import { useControllableValue, usePersistFn } from '../../hooks';
import { cn } from '../../lib/utils';
import { cva } from 'class-variance-authority';

const defaultFormatter = <T,>(t: T): T => t;

let nextInputAccessoryViewID = 0;

const getNextInputAccessoryViewID = () => ++nextInputAccessoryViewID;

const iOSPlatform = Platform.OS === 'ios';

// 字体大小
const textInputFontSize = cva('', {
  variants: {
    size: {
      xl: 'text-2xl',
      l: 'text-2xl',
      m: 'text-2xl',
      s: 'text-2xl',
    },
  },
  defaultVariants: {
    size: 'm',
  },
});

// 最小高度
const textInputMinHeight = {
  xl: 44,
  l: 40,
  m: 36,
  s: 32,
};

/**
 * 自定义输入项
 * @description 在和 react-native-keyboard-aware-scroll-view 配合做软键盘适配时，如果是 textarea 类型默认 scrollEnabled 禁用，避免软键盘遮挡输入内容
 * @description 动态切换输入内容可见，请手动控制 secureTextEntry，如果只是切换 type 在 iOS 正式环境可能会不生效
 */
const TextInput = forwardRef<TextInputInstance, TextInputProps>(
  (
    {
      addonGroupClassName,
      addonAfterTextClassName,
      addonBeforeTextClassName,
      fixGroupClassName,
      prefixTextClassName,
      suffixTextClassName,
      type = 'text',
      rows = 2,
      clearable = false,
      clearTrigger = 'focus',
      formatter,
      formatTrigger = 'onChangeText',
      showWordLimit = false,
      bordered = false,
      addonAfter,
      addonBefore,
      prefix,
      suffix,
      inputWidth,
      size = 'm',
      textareaMaxHeight,
      // TextInput 的属性
      style,
      multiline,
      selectionColor,
      placeholderTextColor,
      onChangeText,
      onEndEditing,
      onFocus,
      onBlur,
      returnKeyType,
      ...resetProps
    },
    ref
  ) => {
    // 修正数据
    if (type === 'textarea') {
      multiline = true;
      clearable = false;
    } else {
      returnKeyType = getDefaultValue(returnKeyType, 'done');
    }

    if (showWordLimit && isUndefined(resetProps.maxLength)) {
      showWordLimit = false;
    }

    const onChangeTextPersistFn = usePersistFn(onChangeText || noop);
    const onEndEditingPersistFn = usePersistFn(onEndEditing || noop);
    const onFocusPersistFn = usePersistFn(onFocus || noop);
    const onBlurPersistFn = usePersistFn(onBlur || noop);
    const formatterPersistFn = usePersistFn(formatter || defaultFormatter);
    const [value, onChange] = useControllableValue(resetProps);
    const [focus, setFocus] = useState(false);
    const TextInputRef = useRef<TextInputInstance>(null);
    const colorScheme = useColorScheme();
    const inputAccessoryViewID = useMemo(() => `TextInput_${getNextInputAccessoryViewID()}`, []);
    /** 当前值 */
    const Value = useRef(value);
    Value.current = value;
    /** 显示禁用样子 bordered 才显示 */
    const showDisabledInput = bordered && !isNil(resetProps.editable) && !resetProps.editable;
    // 转发实例
    useImperativeHandle(ref, () => {
      return TextInputRef.current!;
    });

    /** 点击完成收起软键盘 */
    const onPressFinish = useCallback(() => {
      Keyboard.dismiss();
      setFocus(false);
    }, []);

    /** 点击视觉上的输入框，聚焦，多行文本 */
    const onPressTextInput = useCallback(() => {
      TextInputRef.current?.focus();
    }, []);

    /**
     * 当文字变化
     * @description 在这个阶段判断字符长度、格式化数据
     */
    const onChangeTextTextInput = useCallback(
      (t: string) => {
        if (formatTrigger === 'onChangeText') {
          t = formatterPersistFn(t);
        }

        onChange(t);
        onChangeTextPersistFn(t);
      },
      [formatTrigger, formatterPersistFn, onChange, onChangeTextPersistFn]
    );

    /** 编辑结束的时候 */
    const onEndEditingTextInput = useCallback(
      (e: NativeSyntheticEvent<TextInputEndEditingEventData>) => {
        if (formatTrigger === 'onEndEditing') {
          e.nativeEvent.text = formatterPersistFn(e.nativeEvent.text);
        }

        if (Value.current !== e.nativeEvent.text) {
          onChange(e.nativeEvent.text);
        }

        onEndEditingPersistFn(e);
      },
      [onEndEditingPersistFn, formatterPersistFn, formatTrigger, onChange]
    );

    /** 当文本框内容变化时 */
    const onChangeTextInput = useCallback(
      (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        onChange(e.nativeEvent.text);
      },
      [onChange]
    );

    /**
     * 点击清除按钮
     * @description 目前不能在输入框聚焦的时候触发点击，输入框失去焦点后才能触发点击，可能是软键盘的问题？
     */
    const onPressClearable = useCallback(() => {
      TextInputRef.current?.clear();
      onChange('');
      onChangeTextPersistFn('');
      onPressTextInput();
    }, [onChangeTextPersistFn, onPressTextInput, onChange]);

    /** 输入框聚焦 */
    const onFocusTextInput = useCallback(
      (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        setFocus(true);
        onFocusPersistFn(e);
      },
      [onFocusPersistFn]
    );

    /** 输入框失焦 */
    const onBlurTextInput = useCallback(
      (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        setFocus(false);
        onBlurPersistFn(e);
      },
      [onBlurPersistFn]
    );

    const isTextarea = type === 'textarea';
    // textarea 模式就是纯输入框
    const addonBeforeJSX = isTextarea
      ? null
      : renderTextLikeJSX(
          addonBefore,
          cn('text-[#11151A] mr-2', addonBeforeTextClassName, textInputFontSize({ size }))
        );
    const addonAfterJSX = isTextarea
      ? null
      : renderTextLikeJSX(
          addonAfter,
          cn('text-[#11151A] ml-2', addonAfterTextClassName, textInputFontSize({ size }))
        );

    const prefixJSX = isTextarea
      ? null
      : renderTextLikeJSX(
          prefix,
          cn('text-[#11151A] mr-2', prefixTextClassName, textInputFontSize({ size }))
        );
    const suffixJSX = isTextarea
      ? null
      : renderTextLikeJSX(
          suffix,
          cn('text-[#11151A] ml-2', suffixTextClassName, textInputFontSize({ size }))
        );
    const customTextInputWidthStyle: TextStyle = !isNil(inputWidth)
      ? {
          flexShrink: 1,
          flexGrow: 0,
          flexBasis: inputWidth,
          width: inputWidth,
        }
      : {};
    /** 输入框不确定是否要排除边框 */
    const inputUncertainHeight = bordered ? 2 : 0;
    /**
     * 显示辅助工具栏
     * @description 单行输入框回车键已具备收起键盘的作用
     */
    const showInputAccessoryView =
      iOSPlatform && type !== 'text' && (isNil(resetProps.editable) || !!resetProps.editable);
    const keyboardAppearance =
      isUndefined(resetProps.keyboardAppearance) || resetProps.keyboardAppearance === 'default'
        ? colorScheme || 'light'
        : resetProps.keyboardAppearance;

    const textInputJSX = (
      <TouchableOpacity
        activeOpacity={1}
        className={cn('grow shrink flex-row', {
          'text-lg': isTextarea && showWordLimit,
          'flex-1': (addonAfterJSX || addonBeforeJSX) && bordered,
        })}
        style={[
          isTextarea
            ? {
                minHeight: textInputMinHeight[size] * rows - inputUncertainHeight,
                maxHeight: textareaMaxHeight,
                paddingVertical: 2,
                alignItems: 'flex-start',
              }
            : {
                minHeight: textInputMinHeight[size] - inputUncertainHeight,
                alignContent: 'center',
              },
          customTextInputWidthStyle,
        ]}
        onPress={onPressTextInput}
      >
        <RNTextInput
          {...resetProps}
          ref={TextInputRef}
          className={cn(
            'grow shrink p-0 m-0 border-none text-center text-[#5A6068]',
            {
              'bg-[#EDEFF2]': showDisabledInput,
            },
            textInputFontSize({ size })
          )}
          style={style}
          placeholder={
            focus && resetProps.textAlign === 'center' ? undefined : resetProps.placeholder
          }
          value={value}
          multiline={multiline}
          returnKeyType={returnKeyType}
          selectionColor={selectionColor}
          placeholderTextColor={placeholderTextColor}
          onChangeText={onChangeTextTextInput}
          onEndEditing={onEndEditingTextInput}
          onChange={onChangeTextInput}
          onFocus={onFocusTextInput}
          onBlur={onBlurTextInput}
          inputAccessoryViewID={
            resetProps.inputAccessoryViewID ||
            (showInputAccessoryView ? inputAccessoryViewID : undefined)
          }
        />

        {clearable && (clearTrigger === 'focus' ? focus : true) && value && value.length ? (
          <TextInputClear onPress={onPressClearable} />
        ) : null}

        {showWordLimit ? (
          <Text className='absolute top-0 right-0 text-lg text-[#5A6068]'>
            {value?.length || 0}/{resetProps.maxLength}
          </Text>
        ) : null}
      </TouchableOpacity>
    );

    const inputJSX = (
      <>
        {showInputAccessoryView ? (
          <InputAccessoryView
            nativeID={inputAccessoryViewID}
            backgroundColor={keyboardAppearance === 'dark' ? '#575757' : '#f7f7f7'}
          >
            <View className='h-11 flex-row justify-end items-center border-t border-t-[#E3E5E8]'>
              <TouchableOpacity onPress={onPressFinish} activeOpacity={0.8}>
                <Text className='text-primary-5 text-2xl px-3 font-bold'>完成</Text>
              </TouchableOpacity>
            </View>
          </InputAccessoryView>
        ) : null}

        {prefixJSX || suffixJSX || bordered ? (
          <View
            className={cn(
              'flex-row items-center px-2',
              bordered && {
                'border rounded border-[#E3E5E8]': bordered,
                'flex-1': addonAfterJSX || addonBeforeJSX,
                'bg-[#EDEFF2]': !isNil(resetProps.editable) && !resetProps.editable,
              },
              fixGroupClassName
            )}
            style={prefixJSX || suffixJSX ? null : customTextInputWidthStyle}
          >
            {prefixJSX}
            {textInputJSX}
            {suffixJSX}
          </View>
        ) : (
          textInputJSX
        )}
      </>
    );

    if (addonAfterJSX || addonBeforeJSX) {
      return (
        <View className={cn('flex-row items-center', addonGroupClassName)}>
          {addonBeforeJSX}
          {inputJSX}
          {addonAfterJSX}
        </View>
      );
    }

    return inputJSX;
  }
);

export default memo(TextInput);

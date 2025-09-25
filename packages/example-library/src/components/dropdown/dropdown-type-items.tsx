import { type ReactNode, useMemo, useState } from 'react';
import { debounce, isObject } from 'lodash';
import { ScrollView, TouchableOpacity, View, Text } from 'react-native';
import { cn } from '../../lib/utils';
import Button from '../button';
import { usePersistFn } from '../../hooks';

/**
 * 处理选项数据
 * @param options
 * @returns
 */
function disposeSelectOptions<T>(
  options: { titleKey: string; value: T | T[] }[]
): Record<string, T | T[]> {
  return options.reduce((acc, { titleKey, value }) => {
    if (!acc[titleKey]) {
      acc[titleKey] = Array.isArray(value) ? value : [value];
    } else {
      // 如果已经是数组 直接添加值
      if (Array.isArray(acc[titleKey])) {
        // @ts-ignore
        acc[titleKey].push(value as T);
      } else {
        // 将现有值与新值组合成数组
        acc[titleKey] = [acc[titleKey] as T, value as T];
      }
    }

    // 如果数组长度为1 则返回单个值
    // @ts-ignore
    if (Array.isArray(acc[titleKey]) && acc[titleKey].length === 1) {
      // @ts-ignore
      acc[titleKey] = acc[titleKey][0] as T;
    }

    return acc;
  }, {} as Record<string, T | T[]>);
}

/**
 * 合并数据
 * @param defaultData 初始的数据
 * @param data 选择的数据
 */
function mergeSelectedData<T>(
  defaultData: { titleKey: string; value: T | T[] }[],
  selectedData: { titleKey: string; value: T | T[] }[]
) {
  const defaultMap = new Map(
    defaultData.map(({ titleKey, value }) => [titleKey, { titleKey, value }])
  );

  selectedData.forEach(({ titleKey, value }) => {
    if (defaultMap.has(titleKey)) {
      // 覆盖合并数据
      defaultMap.set(titleKey, { titleKey, value });
    }
  });

  return Array.from(defaultMap.values());
}

export type DropdownTypeItemsProps<T = any> = {
  /**
   * 选择的值
   */
  selectedData: Record<string, T | T[]>;
  /**
   * 选项配置
   */
  options: {
    /**
     * 选项标题
     */
    title?: string;
    /**
     * 选项标题的key
     */
    titleKey: string;
    /**
     * 选项默认值（多选模式需要多个默认值时传递数组）
     */
    defaultValue?: T | T[];
    /**
     * 自定义类名
     */
    className?: string;
    /**
     * 是否支持多选
     */
    multiple?: boolean;
    /**
     * 子项
     */
    items?: { label: string; value: T }[];
    /**
     * 自定义子项渲染节点（与 items 可同时传 key 取的是 titleKey的值）
     * @param items
     */
    customizeNode?: ({
      items,
      value,
      onChange,
    }: {
      items: DropdownTypeItemsProps['options'][0]['items'];
      value?: T | T[];
      onChange: (value: T) => void;
    }) => ReactNode;
    /**
     * 是否隐藏
     */
    hidden?: boolean;
  }[];
  /**
   * 确定按钮文本
   */
  confirmText?: string;
  /**
   * 取消按钮文本
   */
  cancelText?: string;
  /**
   * 值改变的回调
   * @param {confirm | cancel} action 动作类型 cancel 取消 confirm 确定
   * @param {Record<string, T | T[]>} result 选择结果数据
   */
  onValueChange?: ({
    action,
    result,
  }: {
    action: 'confirm' | 'cancel';
    result: Record<string, T | T[]>;
  }) => void;
};

let clickType: 'confirm' | 'cancel' | null = null;

/**
 * 类型筛选项 组件
 * @param props
 */
export default function DropdownTypeItems<T = any>({
  selectedData,
  options,
  confirmText = '确定筛选',
  cancelText = '清空筛选',
  onValueChange,
}: DropdownTypeItemsProps<T>) {
  const { defaultSelectedOptions, isSettingDefaultValue } = useMemo<{
    /** 默认选项 */
    defaultSelectedOptions: { titleKey: string; value: T | T[] }[];
    /** 是否设置默认值 */
    isSettingDefaultValue: boolean;
  }>(() => {
    if (!Array.isArray(options) || !options?.length) {
      return {
        isSettingDefaultValue: false,
        defaultSelectedOptions: [],
      };
    }

    return {
      isSettingDefaultValue: options.some(
        (f) => !!f?.defaultValue || typeof f?.defaultValue !== 'undefined'
      ),
      defaultSelectedOptions: options.map((m) => ({
        titleKey: m.titleKey,
        value:
          Array.isArray(m.defaultValue) && !m.multiple
            ? m.defaultValue[0]
            : (m.defaultValue as T | T[]),
      })),
    };
  }, [options]);

  const selectedDataOptions = useMemo(
    () =>
      isObject(selectedData)
        ? Object.entries(selectedData).map(([titleKey, value]) => ({ titleKey, value }))
        : [],
    [selectedData]
  );

  const [selectedOptions, setSelectedOptions] = useState<{ titleKey: string; value: T | T[] }[]>(
    clickType === 'cancel'
      ? defaultSelectedOptions
      : mergeSelectedData(defaultSelectedOptions, selectedDataOptions)
  );

  // 点击操作选择
  const handleSelected = usePersistFn((titleKey: string, value: T, multiple: boolean) => {
    setSelectedOptions((pre) => {
      // 多选模式
      if (multiple) {
        // 查找是否有相同 titleKey 的选项
        const repeatTitleKeyIndex = pre?.findIndex((item) => item.titleKey === titleKey);

        if (repeatTitleKeyIndex > -1) {
          // 重复 value 索引
          const repeatValueIndex = pre?.findIndex(
            (f) => f.titleKey === titleKey && (f.value as T[])?.includes(value as T)
          );

          // 移除当前选项
          if (repeatValueIndex > -1) {
            return pre?.map((m) => ({
              ...m,
              value: Array.isArray(m.value) ? m.value?.filter((f) => f !== value) : m.value,
            }));
          }

          const existingOption = pre[repeatTitleKeyIndex];

          const newValue = Array.isArray(existingOption.value)
            ? // 合并重复 value 为数组
              [...existingOption.value, value]
            : [existingOption.value, value];

          const updatedOption = { ...existingOption, value: newValue };

          return [
            ...pre?.slice(0, repeatTitleKeyIndex),
            updatedOption,
            ...pre?.slice(repeatTitleKeyIndex + 1),
          ];
        } else {
          return [...pre, { titleKey, value }];
        }
      }

      // 默认单选模式
      return [...pre?.filter((f) => f.titleKey !== titleKey), { titleKey, value }];
    });
  });

  // 点击操作按钮
  const handleClick = useMemo(
    () =>
      debounce((action: 'confirm' | 'cancel') => {
        return new Promise((resolve, reject) => {
          try {
            if (action === 'cancel') {
              setSelectedOptions(isSettingDefaultValue ? defaultSelectedOptions : []);
            }

            const result = disposeSelectOptions(
              action === 'cancel' ? defaultSelectedOptions : selectedOptions
            );

            resolve(onValueChange?.({ action, result }));

            clickType = action;
          } catch (error) {
            reject(error);

            console.log('组件：DropdownTypeItems 出错', error);

            throw new Error('组件：DropdownTypeItems 出错');
          }
        });
      }, 200),
    [defaultSelectedOptions, isSettingDefaultValue, onValueChange, selectedOptions]
  );

  if (!Array.isArray(options) || !options?.length) {
    return null;
  }

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        className='flex'
        contentContainerClassName='gap-y-6'
      >
        {options
          .filter((f) => Object.keys(f || {})?.length > 0)
          .map((m, idx) => (
            <View
              key={`${m.title}_${m.titleKey}_${idx}`}
              className={cn('flex gap-y-3 flex-wrap', m.className)}
            >
              {m.title ? <Text className='text-base font-medium'>{m.title}</Text> : null}
              <View className='flex flex-row flex-wrap items-center gap-x-2 gap-y-3'>
                {m?.items?.map((v, i) => {
                  const isSelect = selectedOptions?.some(
                    (f) =>
                      f.titleKey === m.titleKey &&
                      (m.multiple ? (f.value as T[])?.includes(v.value) : f.value === v.value)
                  );

                  return (
                    <TouchableOpacity
                      key={`${v.value}_${i}`}
                      className={cn('rounded bg-black/5', isSelect && 'bg-primary')}
                      activeOpacity={0.8}
                      onPress={() => {
                        handleSelected(m.titleKey, v.value, !!m?.multiple);
                      }}
                    >
                      <View className='rounded px-4 py-2'>
                        <Text className={cn('text-[#58595B]', isSelect && 'text-white')}>
                          {v.label}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
                {m.customizeNode?.({
                  items: m.items,
                  value: selectedOptions?.find((f) => f.titleKey === m.titleKey)?.value,
                  onChange: (value: T) => handleSelected(m.titleKey, value, !!m?.multiple),
                })}
              </View>
            </View>
          ))}
      </ScrollView>
      <View className='mt-6 flex-row gap-x-3'>
        <Button
          size='xs'
          type='ghost'
          className='flex-1'
          text={cancelText ?? '重置'}
          onPress={() => {
            handleClick('cancel');
          }}
        ></Button>
        <Button
          className='flex-1'
          size='xs'
          text={confirmText ?? '确定'}
          onPress={() => {
            handleClick('confirm');
          }}
        ></Button>
      </View>
    </>
  );
}

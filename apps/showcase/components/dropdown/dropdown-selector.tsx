import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import isNil from 'lodash/isNil';
import uniqBy from 'lodash/uniqBy';
import { Keyboard, Text, TouchableOpacity, View } from 'react-native';
import DropdownBadge from './dropdown-badge';
import DropdownPopup from './dropdown-popup';
import type { DropdownItemOption, DropdownSelectorMethodProps } from './interface';
import { isPromise } from '../../helpers';
import { usePersistFn } from '../../hooks';
import Portal from '../portal';
import Tree from '../tree';
import type { TreeOption, TreeValue } from '../tree/interface';
import { cn } from '../../lib/utils';

const DropdownSelectorMethod = <T,>({
  targetHeight,
  targetPageY,
  onConfirm,
  onCancel,
  defaultValue,
  options,
  duration,
  zIndex,
  closeOnPressOutside,
  onClosed,
  beforeChecked,
  search,
  onSearch,
  cancellable,
  multiple,
  multipleMode,
  defaultExpandAll,
  testID,
}: DropdownSelectorMethodProps<T>) => {
  const [multipleValue, setMultipleValue] = useState<T[]>(
    multiple ? (defaultValue as T[]) || [] : []
  );
  const allOptions = useMemo(() => {
    const findNode = (op: DropdownItemOption<T>[]) => {
      const ooo: DropdownItemOption<T>[] = [];

      op.forEach((o) => {
        ooo.push(o);

        if (o.children?.length) {
          ooo.push(...findNode(o.children));
        }
      });

      return ooo;
    };

    return findNode(options);
  }, [options]);

  const [visible, setVisible] = useState(false);
  const treeOptions = useMemo(() => {
    const convertOption = (ops: DropdownItemOption<T>[]) => {
      const nodes: TreeOption[] = [];

      ops.forEach((item) => {
        const _opt: TreeOption = {
          label: item.label,
          value: item.value as unknown as number | string,
          children: item.children?.length ? convertOption(item.children) : [],
          render: isNil(item.badge)
            ? undefined
            : (p) => {
                return (
                  <View className='flex-1 flex-row items-center'>
                    <Text
                      className={cn('text-[15px] text-[#11151A]', {
                        'text-primary': p.labelHighlight,
                      })}
                      numberOfLines={1}
                    >
                      {p.label}
                    </Text>
                    <DropdownBadge count={item.badge} />
                  </View>
                );
              },
        };

        nodes.push(_opt);
      });

      return nodes;
    };

    return convertOption(options);
  }, [options]);

  useEffect(() => {
    setVisible(true);
  }, []);

  const findNodeByValue = (
    tree: DropdownItemOption<T>[],
    value: T
  ): DropdownItemOption<T> | undefined => {
    for (const item of tree) {
      if (item.value === value) {
        return item;
      }

      if (item.children) {
        const _v = findNodeByValue(item.children, value);

        if (_v) {
          return _v;
        }
      }
    }

    return undefined;
  };

  const onPressShade = useCallback(() => {
    setVisible(false);
    Keyboard.dismiss();
    onCancel?.();
  }, [onCancel]);

  const onRequestClose = usePersistFn(() => {
    onPressShade();

    return true;
  });

  const onChangePersistFn = usePersistFn(
    (
      v: TreeValue | TreeValue[],
      _: TreeOption[],
      event: {
        checked: boolean;
        option: TreeOption;
      }
    ) => {
      if (multiple) {
        if (beforeChecked) {
          const returnVal = beforeChecked({
            value: [],
            checked: event.checked,
            option: event.option,
          });

          if (isPromise(returnVal)) {
            returnVal.then((nv) => {
              setMultipleValue((mv) =>
                uniqBy(
                  [...mv.filter((mvi) => mvi !== event.option.value), ...nv],

                  (x) => x
                )
              );
            });
          } else {
            setMultipleValue((mv) =>
              uniqBy([...mv.filter((mvi) => mvi !== event.option.value), ...returnVal], (x) => x)
            );
          }
        } else {
          setMultipleValue(v as T[]);
        }
      } else {
        setVisible(false);
        Keyboard.dismiss();

        const _v = v as unknown as T;
        const _o = findNodeByValue(options, _v);

        onConfirm?.(_v as unknown as T, _o ? [_o] : []);
      }
    }
  );

  const onConfirmMultiple = usePersistFn(() => {
    setVisible(false);
    Keyboard.dismiss();

    onConfirm?.(
      multipleValue,
      multipleValue.map((item) => {
        return findNodeByValue(options, item)!;
      })
    );
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
    >
      <Tree
        defaultExpandAll={defaultExpandAll}
        minHeight={false}
        search={search}
        options={treeOptions}
        onChange={onChangePersistFn}
        onSearch={onSearch}
        cancellable={cancellable}
        multiple={multiple}
        multipleMode={multipleMode}
        {...(multiple
          ? {
              value: multipleValue as string[],
            }
          : {
              defaultValue: defaultValue as unknown as string,
            })}
      />
      {multiple ? (
        <View className='h-12.5 flex-row items-center overflow-hidden border-t border-t-[#eff3f9] px-3'>
          <View className='relative min-h-0 min-w-0 flex-row items-center pr-2'>
            <TouchableOpacity
              activeOpacity={0.8}
              className='h-11 min-w-23 items-center justify-center px-2'
              onPress={() => {
                if (allOptions.length !== multipleValue.length) {
                  setMultipleValue(allOptions.map((i) => i.value));
                } else {
                  setMultipleValue([]);
                }
              }}
            >
              <Text className='text-center text-base text-primary'>
                {allOptions.length !== multipleValue.length ? '全选' : '全不选'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className='h-11 min-w-23  items-center justify-center rounded bg-primary/15'
              activeOpacity={0.8}
              onPress={onPressShade}
            >
              <Text className='text-center text-base text-primary'>取消</Text>
            </TouchableOpacity>
          </View>
          <View className='flex-1'>
            <TouchableOpacity
              className='h-11 items-center justify-center rounded bg-primary'
              activeOpacity={0.8}
              onPress={onConfirmMultiple}
            >
              <Text className='text-center text-base text-white'>确认</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
    </DropdownPopup>
  );
};

const DropdownSelectorMethodMemo = memo(DropdownSelectorMethod) as <T>(
  p: DropdownSelectorMethodProps<T>
) => React.ReactElement;

export default <T,>(opt: Omit<DropdownSelectorMethodProps<T>, 'onClosed'>) => {
  return new Promise<{ value: T | T[]; data: DropdownItemOption<T>[] }>((resolve, reject) => {
    const key = Portal.add(
      <DropdownSelectorMethodMemo<T>
        {...opt}
        onCancel={() => {
          opt.onCancel?.();
          reject(new Error());
        }}
        onConfirm={(v, d) => {
          opt.onConfirm?.(v, d);
          resolve({
            value: v,
            data: d,
          });
        }}
        onClosed={() => {
          Portal.remove(key);
        }}
      />
    );
  });
};

import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import { isEmpty } from 'lodash';
import isNil from 'lodash/isNil';
import { StyleProp, View, ViewStyle } from 'react-native';
import {
  buildOptions,
  buildSelectedValue,
  findDefaultValue,
  findNextAllColumns,
  getDataType,
} from './helper/picker';
import type { PickerOption, PickerValue, PickerViewProps } from './interface';
import PickerColumn from './picker-view-column';
import { useControllableValue } from '../../hooks';
import Loading from '../loading';
import Divider from '../divider';

const getVisibleItemCount = (n: number) => {
  if (n % 2 === 0) {
    return n + 1;
  }

  return n;
};

/**
 * 选择器视图
 */
const PickerView: React.FC<PickerViewProps> = ({
  visibleItemCount = 5,
  loading = false,
  columns,
  itemHeight = 50,
  testID,
  ...restProps
}) => {
  const _visibleItemCount = getVisibleItemCount(visibleItemCount);
  /** 选项的高度 */
  const columnsHeight = _visibleItemCount * itemHeight;
  /** 居中选中的偏移量 */
  const markMargin = itemHeight / 2;

  /**
   * 数据类型
   * @description cascade 联级选择，multiple 多列选择，single 单列选择
   */
  const dataType = useMemo(() => getDataType(columns), [columns]);
  const isControlled = 'value' in restProps;
  const isNoDefaultValue =
    isNil(restProps.defaultValue) ||
    isEmpty(restProps.defaultValue) ||
    restProps.defaultValue.every((val) => val === '');

  const [value, onChange] = useControllableValue<PickerValue[]>(restProps, {
    defaultValue: [],
  });
  const [options, setOptions] = useState<PickerOption[][]>([]);
  const ColumnDefaultValues = useRef<PickerValue[]>([]);

  // 初始化数据
  useEffect(() => {
    if (dataType !== 'cascade') {
      const [_options, defaultValues] = buildOptions(dataType, columns);

      ColumnDefaultValues.current = defaultValues;
      setOptions(_options);

      // 非受控的情况、并且没有默认值才去同步数据
      // 既然有默认数据了，由外面自己负责
      // 把数据同步到内部状态，初始化的时候看起来是选中默认数据或第一个数据的样子

      if (!isControlled && isNoDefaultValue) {
        const [v, o] = buildSelectedValue(defaultValues, _options);

        onChange(v, o);
      }
    }
  }, [columns, dataType, onChange, isControlled, isNoDefaultValue]);

  // 联级依赖 value 单独处理
  useEffect(() => {
    if (dataType === 'cascade') {
      const [_options, , _values] = buildOptions(dataType, columns, value);
      const [v, o] = buildSelectedValue(_values, _options);

      setOptions(_options);

      // 当
      if (value !== _values) {
        onChange(v, o);
      }
    }
  }, [columns, value, dataType, onChange]);

  const bodyStyle: ViewStyle = {
    height: columnsHeight,
    backgroundColor: 'white',
    flexDirection: 'row',
    overflow: 'hidden',
  };

  console.log('columnsHeight', columnsHeight);

  const maskTopStyles: StyleProp<ViewStyle> = [
    {
      top: 0,
      bottom: '50%',
      flexDirection: 'column-reverse',
      transform: [
        {
          translateY: -markMargin,
        },
      ],
    },
  ];

  const maskBottomStyles: StyleProp<ViewStyle> = [
    {
      top: '50%',
      bottom: 0,
      transform: [
        {
          translateY: markMargin,
        },
      ],
    },
  ];

  return (
    <View testID={testID} className='overflow-hidden bg-white'>
      {loading ? (
        <View className='absolute inset-0 z-[2] size-full items-center justify-center bg-white opacity-80'>
          <Loading />
        </View>
      ) : null}

      <View style={bodyStyle}>
        <View
          className='absolute inset-x-0 z-[3] bg-white opacity-80'
          style={maskTopStyles}
          pointerEvents='none'
        >
          <Divider />
        </View>

        <View
          className='absolute inset-x-0 z-[3] bg-white opacity-80'
          style={maskBottomStyles}
          pointerEvents='none'
        >
          <Divider />
        </View>

        {options.map((optionItem, optionIndex) => {
          const _value = (() => {
            if (!isNil(value[optionIndex])) {
              return value[optionIndex];
            }

            // 默认值
            // 非受控的情况才去同步数据
            // 并且没有默认值
            if (!isControlled && isNoDefaultValue) {
              if (dataType === 'multiple') {
                return ColumnDefaultValues.current[optionIndex];
              }

              // 真的没有就默认第一个选项
              return findDefaultValue(options[optionIndex][0]?.value, optionItem)!;
            }

            return undefined;
          })();

          return (
            <PickerColumn
              itemHeight={itemHeight}
              key={optionIndex}
              visibleItemCount={_visibleItemCount}
              options={optionItem}
              value={_value}
              onChange={(column) => {
                switch (dataType) {
                  // 联级选择
                  // 如果是 cascade 需要重置选项
                  case 'cascade': {
                    const nextAll = findNextAllColumns(column?.children || []);
                    const _options = options.slice(0, optionIndex + 1).concat(nextAll.options);
                    const values = value
                      .slice(0, optionIndex)
                      .concat(column?.value)
                      .concat(nextAll.values);

                    const [v, o] = buildSelectedValue(values, _options);

                    onChange(v, o);

                    break;
                  }

                  // 多选
                  case 'multiple': {
                    const newValues = value.concat([]);

                    // 先从默认数据中拼凑好数据
                    ColumnDefaultValues.current.forEach((cdv, cdvIndex) => {
                      if (isNil(newValues[cdvIndex])) {
                        newValues[cdvIndex] = cdv;
                      }
                    });

                    newValues[optionIndex] = column.value;

                    const [v, o] = buildSelectedValue(newValues, options);

                    onChange(v, o);

                    break;
                  }

                  // 单选
                  default: {
                    const columnsIndex = columns.findIndex(
                      (c) => (c as PickerOption).value === column.value
                    );

                    onChange([column?.value], [columns[columnsIndex]]);

                    break;
                  }
                }
              }}
            />
          );
        })}
      </View>
    </View>
  );
};

export default memo(PickerView);

import isArray from 'lodash/isArray';
import type {
  Column,
  PickerOption,
  PickerOptionCascade,
  PickerOptionMultiple,
  PickerOptionMultipleWidthDefaultValue,
  PickerOptionType,
  PickerValue,
} from '../interface';

/**
 * 获取当前选项是什么数据
 * @description cascade 联级选择，multiple 多列选择，single 单列选择
 */
export const getDataType = (columns: Column[]): PickerOptionType => {
  // eslint-disable-next-line prefer-destructuring
  const firstColumn = columns[0];

  if (firstColumn) {
    if ('children' in firstColumn) {
      return 'cascade';
    }

    if ('options' in firstColumn || isArray(firstColumn as PickerOption[])) {
      return 'multiple';
    }
  }

  return 'single';
};

export const findDefaultValue = (value: PickerValue, options: PickerOption[]) => {
  // value 是否在 options 内
  const valueIndex = options.findIndex((item) => item.value === value);

  if (valueIndex < 0 || options[valueIndex].disabled) {
    // 重新找一个
    const index = options.findIndex((item) => !item.disabled);

    if (index < 0) {
      return null;
    }

    return options[index].value;
  }

  return value;
};

/** 把联级选择的所有子级找到 */
export const findNextAllColumns = (columns: PickerOptionCascade[]) => {
  const options: PickerOption[][] = [];

  console.log('🚀 ~ findNextAllColumns ~ options:', options);

  const values: PickerValue[] = [];

  console.log('🚀 ~ findNextAllColumns ~ values:', values);

  const findNext = (c: PickerOptionCascade[]) => {
    if (c.length) {
      options.push(c);
      values.push(c[0].value);

      const cc = c[0].children || [];

      findNext(cc);
    }
  };

  findNext(columns);

  return {
    options,
    values,
  };
};

/** 通过已有值找到联级选择的所有子级找到 */
export const findAllColumnsByValues = (columns: PickerOptionCascade[], values: PickerValue[]) => {
  const options: PickerOption[][] = [];

  // TODO 补全候选项还是不需要管

  let currentColumn = columns;

  values.forEach((value) => {
    options.push(currentColumn);

    const nextIndex = currentColumn.findIndex((item) => item.value === value);

    currentColumn = currentColumn[nextIndex]?.children || [];
  });

  return options;
};

/** 构建选项 */
export const buildOptions = (
  dataType: PickerOptionType,
  columns: Column[],
  values?: PickerValue[],
): [PickerOption[][], PickerValue[], PickerValue[]] => {
  switch (dataType) {
    case 'cascade': {
      if (!values?.length) {
        const data = findNextAllColumns(columns as PickerOptionCascade[]);

        return [data.options, [], data.values];
      }

      return [findAllColumnsByValues(columns as PickerOptionCascade[], values), [], values];
    }

    case 'multiple': {
      const mixOptions: PickerOption[][] = [];
      const defaultValues: PickerValue[] = [];

      (columns as PickerOptionMultiple[]).forEach((item) => {
        const isOption = isArray(item as PickerOption[]);

        // 默认值需要检验它是否合法
        if (isOption) {
          const option = item as PickerOption[];

          mixOptions.push(option);
          defaultValues.push(findDefaultValue(option[0].value, option)!);
        } else {
          const { options: _options, defaultValue: _defaultValue } = item as PickerOptionMultipleWidthDefaultValue;

          mixOptions.push(_options);
          defaultValues.push(findDefaultValue(_defaultValue!, _options)!);
        }
      });

      return [mixOptions, defaultValues, []];
    }

    default: {
      const options = [columns as PickerOption[]];

      // eslint-disable-next-line prefer-destructuring
      const [firstColumn] = options[0];
      const defaultValues = [firstColumn?.value];

      return [options, defaultValues, []];
    }
  }
};

/** 构建选中的值 */
export const buildSelectedValue = (values: PickerValue[], options: PickerOption[][]): [PickerValue[], Column[]] => {
  const selectedColumns = values.map((v, index) => {
    const vIndex = options[index].findIndex((o) => o.value === v);

    return options[index][vIndex];
  });

  return [values, selectedColumns];
};

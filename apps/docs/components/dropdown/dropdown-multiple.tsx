import React, { memo, useMemo } from 'react';
import isNil from 'lodash/isNil';
import { useDropdownConfig } from './context';
import DropdownSelector from './dropdown-selector';
import DropdownText from './dropdown-text';
import type { DropdownItemOption, DropdownMultipleProps } from './interface';
import { getDefaultValue } from '../../helpers';
import { useControllableValue, usePersistFn } from '../../hooks';
import useState from '../../hooks/useStateUpdate';

const DropdownMultiple = <T,>({
  popupTestID,
  titleClassName,
  titleTextClassName,
  options,
  duration,
  zIndex,
  closeOnPressOutside,
  loading,
  placeholder = '',
  beforeChecked,
  defaultExpandAll,
  search,
  onSearch,
  cancellable,
  multipleMode,
  ...restProps
}: DropdownMultipleProps<T>) => {
  const config = useDropdownConfig();
  const [active, setActive] = useState(false);
  const [value, onChange] = useControllableValue<T[]>(restProps);
  const _selectOptionLabel = useMemo(() => {
    if (loading) {
      return '加载中...';
    }

    const _label: string[] = [];

    const findX = (list: DropdownItemOption<T>[]) => {
      list.forEach((item) => {
        if (value?.indexOf(item.value) > -1) {
          _label.push(item.label);
        }

        if (item.children?.length) {
          findX(item.children);
        }
      });
    };

    findX(options);

    return _label.join('、');
  }, [loading, options, value]);

  duration = getDefaultValue(duration, config.duration);
  zIndex = getDefaultValue(zIndex, config.zIndex);
  closeOnPressOutside = getDefaultValue(closeOnPressOutside, config.closeOnPressOutside);

  const onPressText = usePersistFn(() => {
    // 计算 Menu 的 Top 和元素高度

    config.MenuRef.current?.measure((x, y, width, height, pageX, pageY) => {
      setActive(true);
      DropdownSelector({
        targetHeight: height,
        targetPageY: pageY,
        defaultValue: !isNil(value) ? value : [],
        options,
        duration,
        zIndex,
        closeOnPressOutside,
        activeColor: config.activeColor,
        search,
        onSearch,
        cancellable,
        multiple: true,
        multipleMode,
        testID: popupTestID,
        beforeChecked,
        defaultExpandAll,
      })
        .then((d) => {
          onChange(d.value as T[], d.data);
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
      title={!isNil(_selectOptionLabel) && !!_selectOptionLabel ? _selectOptionLabel : placeholder}
      active={active}
      onPress={onPressText}
      disabled={restProps.disabled || loading}
    />
  );
};

export default memo(DropdownMultiple) as <T>(p: DropdownMultipleProps<T>) => React.ReactElement;

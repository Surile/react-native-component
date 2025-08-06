import React, { memo, useMemo } from 'react';
import isNil from 'lodash/isNil';
import { useDropdownConfig } from './context';
import DropdownSelector from './dropdown-selector';
import DropdownText from './dropdown-text';
import type { DropdownItemOption, DropdownItemProps } from './interface';
import { getDefaultValue } from '../../helpers';
import { useControllableValue, usePersistFn } from '../../hooks';
import useState from '../../hooks/useStateUpdate';

const DropdownItem = <T,>({
  popupTestID,
  titleClassName,
  titleTextClassName,
  options,
  duration,
  zIndex,
  closeOnPressOutside,
  loading,
  placeholder = '',

  search,
  onSearch,
  cancellable,

  ...restProps
}: DropdownItemProps<T>) => {
  const config = useDropdownConfig();
  const [active, setActive] = useState(false);
  const [value, onChange] = useControllableValue<T>(restProps);
  const _selectOption = useMemo(() => {
    if (loading) {
      const x: DropdownItemOption<T> = {
        label: '加载中...',
        value: null as any,
      };

      return x;
    }

    let selectOption = {} as DropdownItemOption<T>;

    const findX = (list: DropdownItemOption<T>[]) => {
      list.forEach((item) => {
        if (item.value === value) {
          selectOption = item;
        } else if (item.children?.length) {
          findX(item.children);
        }
      });
    };

    findX(options);

    return selectOption;
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
        defaultValue: value,
        options,
        duration,
        zIndex,
        closeOnPressOutside,
        activeColor: config.activeColor,
        search,
        onSearch,
        cancellable,
        testID: popupTestID,
      })
        .then((d) => {
          onChange(d.value as T, d.data[0]);
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
      title={!isNil(_selectOption.label) ? _selectOption.label : placeholder}
      badge={_selectOption.badge}
      active={active}
      onPress={onPressText}
      disabled={restProps.disabled || loading}
    />
  );
};

export default memo(DropdownItem) as <T>(p: DropdownItemProps<T>) => React.ReactElement;

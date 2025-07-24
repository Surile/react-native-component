import { JSX, memo } from 'react';
import isNil from 'lodash/isNil';
import omit from 'lodash/omit';
import { Text, View } from 'react-native';
import CheckboxIcon from './checkbox-icon';
import type { CheckboxProps } from './interface';
import { cn } from '../../lib/utils';
import { useControllableValue } from '../../hooks';

function Checkbox<ActiveValueT = boolean, InactiveValueT = boolean>({
  labelTextClassName,
  iconStyle,
  iconSize = 20,
  activeColor,
  activeValue = true as unknown as ActiveValueT,
  inactiveValue = false as unknown as InactiveValueT,
  label,
  labelDisabled = false,
  labelPosition = 'right',
  renderIcon,
  disabled,
  className,
  children,
  iconContainerClassName,
  ...restProps
}: CheckboxProps<ActiveValueT, InactiveValueT>) {
  if (disabled) {
    labelDisabled = disabled;
  }

  const [value, onChange] = useControllableValue<ActiveValueT | InactiveValueT>(restProps, {
    defaultValue: inactiveValue,
  });
  const active = value === activeValue;
  const onChangeValue = () => {
    const newValue = active ? inactiveValue : activeValue;

    onChange(newValue);
  };

  const labelJSX = !isNil(label) ? (
    <Text
      suppressHighlighting
      className={cn(
        'min-h-5 leading-5 text-[#11151A]',
        {
          'text-[#8C9199]': disabled,
        },
        labelTextClassName
      )}
      onPress={labelDisabled ? undefined : onChangeValue}
    >
      {label}
    </Text>
  ) : (
    children
  );
  const iconProps = {
    style: iconStyle,
    active,
    activeColor,
    disabled,
    size: iconSize,
    onPress: onChangeValue,
  };
  const iconJSX = renderIcon ? (
    renderIcon(iconProps)
  ) : (
    <CheckboxIcon testID='CHECKBOX_ICON' {...iconProps} />
  );

  return (
    <View
      {...omit(restProps, ['value', 'defaultValue', 'onChange', 'className'])}
      className={cn('flex-row items-center gap-x-1', className)}
    >
      {labelPosition === 'left' ? labelJSX : null}
      {iconJSX}
      {labelPosition === 'right' ? labelJSX : null}
    </View>
  );
}

export default memo(Checkbox) as <ActiveValueT = boolean, InactiveValueT = boolean>(
  p: CheckboxProps<ActiveValueT, InactiveValueT>
) => JSX.Element;

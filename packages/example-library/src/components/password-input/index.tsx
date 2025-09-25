import { memo, forwardRef } from 'react';

import TextInput from '../text-input';
import type { TextInputInstance } from '../text-input/interface';

import type { PasswordInputProps } from './interface';
import { useControllableValue, usePersistFn } from '../../hooks';
import { EyeCloseOutline, EyeOutline } from '../icons';

const hitSlop = { top: 4, bottom: 4, left: 4, right: 4 };

/**
 * 密码输入
 */
const PasswordInput = forwardRef<TextInputInstance, PasswordInputProps>(
  ({ iconSize = 20, iconColor = '#8C9199', ...restProps }, ref) => {
    const [secure, onChangeSecureTextEntry] = useControllableValue(restProps, {
      valuePropName: 'secureTextEntry',
      defaultValuePropName: 'defaultSecureTextEntry',
      defaultValue: true,
      trigger: 'onChangeSecureTextEntry',
    });

    const onPressIcon = usePersistFn(() => {
      onChangeSecureTextEntry(!secure);
    });

    const IconSuffix = secure ? EyeCloseOutline : EyeOutline;

    return (
      <TextInput
        {...restProps}
        ref={ref}
        secureTextEntry={secure}
        suffix={
          <IconSuffix
            size={iconSize}
            color={iconColor}
            className='ml-2'
            onPress={onPressIcon}
            hitSlop={hitSlop}
          />
        }
      />
    );
  }
);

export default memo(PasswordInput);

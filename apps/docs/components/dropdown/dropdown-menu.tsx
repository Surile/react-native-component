import React, { memo, useEffect, useMemo, useRef } from 'react';
import { BackHandler, Platform, View } from 'react-native';
import { DropdownConfig } from './context';
import type { DropdownMenuProps } from './interface';
import { cn } from '../../lib/utils';

/**
 * DropdownMenu 下拉菜单的横条
 */
const DropdownMenu: React.FC<DropdownMenuProps> = ({
  titleClassName,
  titleTextClassName,
  iconClassName,
  activeColor,
  direction = 'down',
  duration,
  zIndex = 10,
  closeOnPressOutside = true,
  divider = true,
  ...restProps
}) => {
  const MenuRef = useRef<View>(null);

  const config = useMemo(
    () => ({
      titleClassName,
      titleTextClassName,
      iconClassName,
      activeColor,
      direction,
      duration,
      zIndex,
      closeOnPressOutside,
      MenuRef,
    }),
    [
      activeColor,
      closeOnPressOutside,
      direction,
      duration,
      iconClassName,
      titleClassName,
      titleTextClassName,
      zIndex,
    ]
  );

  useEffect(() => {
    if (Platform.OS === 'ios') {
      return;
    }

    const listener = BackHandler.addEventListener('hardwareBackPress', () => {
      return true;
    });

    return () => {
      listener.remove();
    };
  }, []);

  return (
    <DropdownConfig.Provider value={config}>
      <View
        {...restProps}
        collapsable={false}
        ref={MenuRef}
        className={cn('flex-row items-center h-[40px] bg-white', restProps.className, {
          'border-b border-b-[#F5F5F5]': divider,
        })}
      />
    </DropdownConfig.Provider>
  );
};

export default memo(DropdownMenu);

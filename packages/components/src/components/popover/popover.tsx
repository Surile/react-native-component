import noop from 'lodash/noop';
import React, {
  useState,
  useRef,
  useCallback,
  useMemo,
  memo,
  isValidElement,
  Children,
  cloneElement,
} from 'react';
import type { View } from 'react-native';
import { Platform, ScrollView, TouchableOpacity } from 'react-native';
import RNPopoverView from 'react-native-popover-view';

import type { PopoverProps, PopoverItemProps } from './interface';
import { getDefaultValue } from '../../helpers';

const arrowSize = { width: 0, height: 0 };

const Popover = <T,>({
  children,
  content,
  dark = false,
  shadow = false,
  arrow = true,
  triggerStyle,
  onSelect = noop,
  disabled,
  renderContentComponent,
  duration,
  trigger = 'onPress',

  backgroundStyle,
  popoverStyle,
  ...restProps
}: React.PropsWithChildren<PopoverProps<T>>) => {
  duration = getDefaultValue(duration, 300);

  const touchable = useRef<View>(null);
  const [showPopover, setShowPopover] = useState(false);
  const animationConfig = useMemo(() => ({ duration }), [duration]);

  const openPopover = useCallback(() => {
    setShowPopover(true);
  }, []);
  const closePopover = useCallback(() => {
    setShowPopover(false);
  }, []);

  const _onSelect = (value: T, index: number) => {
    if (onSelect) {
      onSelect(value, index);
    }

    closePopover();
  };

  const renderContent = () => {
    const items = Children.map(content, (child, index) => {
      if (!isValidElement(child)) {
        return child;
      }

      return cloneElement(child as React.ReactElement<PopoverItemProps<T>>, {
        onSelect: (v: T) => _onSelect(v, index),
        dark: dark,
      });
    });

    if (typeof renderContentComponent === 'function') {
      return renderContentComponent(items, closePopover);
    }

    return <ScrollView>{items}</ScrollView>;
  };

  return (
    <>
      <TouchableOpacity
        ref={touchable}
        onPress={trigger === 'onPress' ? openPopover : undefined}
        onLongPress={trigger === 'onLongPress' ? openPopover : undefined}
        onPressIn={trigger === 'onPressIn' ? openPopover : undefined}
        className='items-center'
        style={triggerStyle}
        disabled={disabled}
        activeOpacity={0.8}
      >
        {children}
      </TouchableOpacity>
      <RNPopoverView
        {...restProps}
        from={touchable as any}
        isVisible={showPopover}
        backgroundStyle={[
          {
            backgroundColor: 'transparent',
          },
          backgroundStyle,
        ]}
        popoverStyle={[
          {
            backgroundColor: 'white',
            borderRadius: 4,
            paddingVertical: 0,
            paddingHorizontal: 0,
            elevation: 0,
          },
          // Android 黑色背景的阴影也是黑色，不友好
          dark
            ? {
                backgroundColor: 'rgba(0,0,0,0.7)',
              }
            : null,
          shadow
            ? {
                ...Platform.select({
                  android: {
                    elevation: 4,
                  },
                  ios: {
                    shadowColor: '#000',
                    shadowOpacity: 0.2,
                    shadowRadius: 4,
                    shadowOffset: {
                      width: 0,
                      height: 0,
                    },
                  },
                }),
              }
            : null,
          popoverStyle,
        ]}
        arrowSize={!arrow ? arrowSize : undefined}
        onRequestClose={closePopover}
        animationConfig={animationConfig}
      >
        {renderContent()}
      </RNPopoverView>
    </>
  );
};

export default memo(Popover) as <T>(
  p: React.PropsWithChildren<PopoverProps<T>>
) => React.ReactElement;

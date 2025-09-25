import React, { memo } from 'react';
import { Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import type { TreeItemProps } from './interface';
import { cn } from '../../lib/utils';
import Flex from '../flex';
import CheckboxIcon from '../checkbox/checkbox-icon';
import { SuccessOutline } from '../icons';

const hitSlop = { left: 8, right: 8 };

const TreeItem: React.FC<TreeItemProps> = ({
  tier,
  indent,
  switcherIcon,
  switcherHighlight = true,
  active,
  multiple,
  bold,
  label,
  renderLabel,
  labelHighlight,
  hasChildren,
  onPressSwitcherIcon,
  activeColor = '#4080FF',
  ...restProps
}) => {
  const leftJSX = (
    <Flex direction='row' align='center'>
      {indent ? (
        <View
          className='h-[50px]'
          style={{
            width: tier * indent,
          }}
        />
      ) : null}
      <Flex
        align='center'
        justify='center'
        className={cn('items-center justify-center mr-1', {
          'rounded self-center bg-primary-5/20 p-1': hasChildren && switcherHighlight,
        })}
      >
        {switcherIcon}
      </Flex>
    </Flex>
  );

  return (
    <TouchableOpacity {...restProps} activeOpacity={restProps.activeOpacity ?? 0.8}>
      <View className='min-h-12.5 flex-row items-center px-3'>
        {hasChildren ? (
          <TouchableWithoutFeedback onPress={onPressSwitcherIcon} hitSlop={hitSlop}>
            {leftJSX}
          </TouchableWithoutFeedback>
        ) : (
          leftJSX
        )}

        {renderLabel ? (
          renderLabel({
            label,
            disabled: restProps.disabled,
            labelHighlight,
            active,
            activeColor,
          })
        ) : (
          <Text
            className={cn('flex-1 my-[4px] text-[15px]', {
              'text-gary-400': restProps.disabled && !hasChildren,
              'font-bold': bold,
              'text-primary': labelHighlight,
            })}
            numberOfLines={1}
          >
            {label}
          </Text>
        )}

        {multiple ? (
          <CheckboxIcon active={active} activeColor={activeColor} disabled={restProps.disabled} />
        ) : active ? (
          <SuccessOutline color={activeColor} />
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

export default memo(TreeItem);

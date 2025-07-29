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
  activeColor,
  ...restProps
}) => {
  const leftJSX = (
    <View className='flex-row items-center'>
      {indent ? (
        <View
          className='h-12.5'
          style={{
            width: tier * indent,
          }}
        />
      ) : null}
      <Flex
        align='center'
        justify='center'
        className={cn({
          'bg-primary-5/50 p-4 rounded self-center': hasChildren && switcherHighlight,
        })}
      >
        {switcherIcon}
      </Flex>
    </View>
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
          })
        ) : (
          <Text
            className={cn('flex-1 mx-[4px] text-[15px]', {
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

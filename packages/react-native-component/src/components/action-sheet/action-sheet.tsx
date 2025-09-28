import isNil from 'lodash/isNil';
import React, { memo, isValidElement } from 'react';
import { Text, View, ScrollView } from 'react-native';

import Button from '../button';
import Divider from '../divider';
import Popup from '../popup/popup';
import PopupHeader from '../popup/popup-header';

import type { ActionSheetProps } from './interface';
import { useSafeHeight } from '../../hooks';
import { cn } from '../../lib/utils';

/**
 * ActionSheet 动作面板
 * @description 底部弹起的模态面板，包含与当前情境相关的多个选项。
 */
const ActionSheet: React.FC<ActionSheetProps> = ({
  actions,
  title,
  cancelText,
  cancelTextStyle,
  description,
  descriptionStyle,
  descriptionClassName,
  safeAreaInsetTop,
  round = true,
  onCancel,
  onSelect,
  ...restProps
}) => {
  const safeHeight = useSafeHeight({ top: safeAreaInsetTop });
  const isTitleDef = !isNil(title);
  const isCancelTextDef = !isNil(cancelText);
  const isDescriptionDef = !isNil(description);

  /** 描述文案 纯文字或自定义 JSX */
  const descriptionJSX = isDescriptionDef ? (
    isValidElement(description) ? (
      description
    ) : (
      <>
        <Text
          className={cn(
            'shrink-0 text-center text-[#5A6068] text-lg pb-3',
            {
              'pt-3': !isTitleDef,
            },
            descriptionClassName
          )}
          style={descriptionStyle}
          numberOfLines={1}
        >
          {description}
        </Text>
        <Divider />
      </>
    )
  ) : null;

  return (
    <Popup {...restProps} safeAreaInsetBottom position='bottom' round={round}>
      <View style={{ maxHeight: safeHeight }}>
        {isTitleDef ? <PopupHeader title={title} showClose={false} /> : null}
        {descriptionJSX}

        <ScrollView bounces={false}>
          {actions.map((item, index) => {
            return (
              <Button
                accessibilityLabel={item.name}
                key={`${item.name}_${index}`}
                text={item.name}
                disabled={item.disabled}
                loading={item.loading}
                type='link'
                size='xl'
                textClassName={cn(
                  'text-2xl font-bold text-[#11151A]',
                  {
                    'text-gray-500': item.loading,
                  },
                  item.textClassName
                )}
                onPress={() => {
                  if (!item.disabled && !item.loading) {
                    item.callback?.();
                    onSelect?.(item, index);
                  }
                }}
              />
            );
          })}
        </ScrollView>

        {isCancelTextDef ? (
          <>
            <View className='bg-[#EFF3F9] h-2' />
            <Button
              accessibilityLabel={cancelText}
              text={cancelText}
              type='link'
              size='xl'
              textClassName='text-2xl font-bold text-[#11151A]'
              onPress={onCancel}
            />
          </>
        ) : null}
      </View>
    </Popup>
  );
};

export default memo(ActionSheet);

import React, { memo } from 'react';
import omit from 'lodash/omit';
import pick from 'lodash/pick';
import { Platform, View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { PickerProps } from './interface';
import PickerView from '../picker-view';
import type { PickerViewProps } from '../picker-view/interface';
import Popup from '../popup';
import { cn } from '../../lib/utils';

const PICKER_VIEW_PROPS_KEYS = [
  'value',
  'defaultValue',
  'columns',
  'loading',
  'itemHeight',
  'visibleItemCount',
  'onChange',
];

const Picker: React.FC<PickerProps> = ({
  visible,
  title,
  confirmButtonText,
  cancelButtonText,
  toolbarPosition = 'top',
  showToolbar = true,
  onCancel,
  onConfirm,
  ...restProps
}) => {
  const insets = useSafeAreaInsets();

  const pickerViewProps = pick(restProps, PICKER_VIEW_PROPS_KEYS) as PickerViewProps;

  const popupProps = omit(restProps, PICKER_VIEW_PROPS_KEYS);

  const headerTitleJSX = (
    <Popup.Header
      showClose={false}
      title={title}
      leftExtra={
        <Text
          suppressHighlighting
          className='text-base text-muted-foreground color-[#5E5E5E]'
          onPress={restProps.loading ? undefined : onCancel}
        >
          {cancelButtonText ?? '取消'}
        </Text>
      }
      rightExtra={
        <Text
          suppressHighlighting
          className='text-base text-primary'
          onPress={restProps.loading ? undefined : onConfirm}
        >
          {confirmButtonText ?? '确认'}
        </Text>
      }
    />
  );

  return (
    <Popup {...popupProps} visible={visible} position='bottom' round>
      {showToolbar && toolbarPosition === 'top' ? headerTitleJSX : null}
      <PickerView {...pickerViewProps} />
      {showToolbar && toolbarPosition === 'bottom' ? headerTitleJSX : null}
      <View
        className={cn(Platform.OS !== 'ios' ? 'h-4' : 'h-0')}
        style={{ height: insets.bottom }}
      />
    </Popup>
  );
};

export default memo(Picker);

import { memo, ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { pick } from 'lodash';
import { Text, TouchableOpacity, View } from 'react-native';
import DropdownPopup from './dropdown-popup';
import DropdownTypeItems, { DropdownTypeItemsProps } from './dropdown-type-items';
import { DropdownPopupProps } from './interface';
import { getDefaultValue } from '../../helpers';
import { cn } from '../../lib/utils';
import { useDropdownConfig } from './context';
import Portal from '../portal';

type FilterTypeButtonProps<T> = {
  /**
   * 按钮文本
   */
  btnText?: string;
  /**
   * 自定义按钮Icon
   */
  customIcon?: ReactNode;
  /**
   * 自定义整个按钮元素
   * @param handleShowPanel 操作显示弹窗面板
   * @returns
   */
  children?: ({
    handleShowPanel,
  }: {
    /**
     * 操作显示弹窗面板
     */
    handleShowPanel: () => void;
  }) => ReactNode;
} & DropdownTypeItemsProps<T>;

/**
 * 筛选类型按钮（点击弹出筛选面板）
 * @param {FilterTypeButtonProps<T>}
 * @returns
 */
function FilterTypeButton<T>({
  btnText = '筛选',
  customIcon,
  children,
  ...restConfig
}: FilterTypeButtonProps<T>) {
  const ViewRef = useRef<View>(null);
  const config = useDropdownConfig();

  const handleShowPanel = useCallback(() => {
    config.MenuRef.current?.measure?.((x, y, width, height, pageX, pageY) => {
      showFilterPopupPanel?.({
        targetHeight: height,
        targetPageY: pageY,
        ...restConfig,
      })
        .then((res) => {
          restConfig?.onValueChange?.(res);
        })
        .catch((error) => {
          console.log('组件：showFilterPopupPanel 出错', error);

          throw new Error('组件：showFilterPopupPanel 出错');
        });
    });
  }, [config.MenuRef, restConfig]);

  const renderElement = () => {
    if (!children) {
      return (
        <View
          ref={ViewRef}
          collapsable={false}
          className='h-full w-16 flex-row items-center justify-center'
        >
          <TouchableOpacity
            className={cn('flex-row items-center justify-center gap-x-[2px]')}
            onPress={handleShowPanel}
            activeOpacity={0.8}
          >
            <Text className='text-[14px] font-normal text-[#5E5E5E]'>{btnText}</Text>
            {/* {customIcon ?? <Icon name='search-solid' className='fill-[#B8B8B8]' />} */}
          </TouchableOpacity>
        </View>
      );
    }

    return children({ handleShowPanel });
  };

  return renderElement();
}

interface FilterPopupPanelProps<T> extends Omit<DropdownPopupProps, 'visible'> {
  typeItemProps: DropdownTypeItemsProps<T>;
}

/**
 * 筛选弹窗面板
 * @param props
 * @param {DropdownTypeItemsProps<T>} props.typeItemProps 筛选类型项配置
 * @param {Omit<DropdownPopupProps, 'visible'>} restProps 弹窗配置
 * @returns
 */
function FilterPopupPanel<T>({
  typeItemProps,
  duration,
  zIndex,
  closeOnPressOutside,
  ...rest
}: FilterPopupPanelProps<T>) {
  const [visible, setVisible] = useState<boolean>(false);

  const config = useDropdownConfig();

  duration = getDefaultValue(duration, config.duration);
  zIndex = getDefaultValue(zIndex, config.zIndex);
  closeOnPressOutside = getDefaultValue(closeOnPressOutside, config.closeOnPressOutside);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <DropdownPopup
      {...rest}
      duration={duration}
      zIndex={zIndex}
      closeOnPressOutside={closeOnPressOutside}
      visible={visible}
      onPressShade={() => setVisible(false)}
      onPressOverlay={() => setVisible(false)}
    >
      <DropdownTypeItems
        {...typeItemProps}
        onValueChange={(res) => {
          typeItemProps.onValueChange?.(res);
          setVisible(false);
        }}
      />
    </DropdownPopup>
  );
}

/**
 * 显示筛选弹窗面板
 * @param options
 * @returns
 */
export function showFilterPopupPanel<T = any>(
  options: { targetHeight: number; targetPageY: number } & DropdownTypeItemsProps<T> &
    Omit<FilterPopupPanelProps<T>, 'typeItemProps'>
) {
  return new Promise<{ action: 'confirm' | 'cancel'; result: Record<string, T | T[]> }>(
    (resolve) => {
      const key = Portal.add(
        <FilterPopupPanel
          {...options}
          contentClassName={cn('py-[20px] px-4', options.contentClassName)}
          typeItemProps={{
            ...pick(options, ['selectedData', 'options', 'confirmText', 'cancelText']),
            onValueChange: (res) => {
              options.onValueChange?.(res);
              resolve(res);
            },
          }}
          onClose={() => {
            Portal.remove(key);
          }}
        />
      );
    }
  );
}

export default memo(FilterTypeButton);

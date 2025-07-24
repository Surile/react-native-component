import type { ReactNode } from 'react';
import type { ColorValue, StyleProp, TouchableOpacityProps, ViewProps, ViewStyle } from 'react-native';
import { FixHitSlopProps } from '../../helpers/types';

interface CheckboxIconPrivateProps {
  /**
   * 是否选中、高亮
   */
  active?: boolean;
  
  /**
   * 选中状态颜色
   * @default checkbox_checked_icon_color
   */
  activeColor?: ColorValue

  /**
   * 图标大小，默认单位为 px
   * @default 20
   */
  size?: number
}

export interface CheckboxIconProps extends FixHitSlopProps<TouchableOpacityProps>, CheckboxIconPrivateProps {
  iconClassName?: string;
}

interface RenderIconProps extends CheckboxIconPrivateProps {
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  onPress?: TouchableOpacityProps['onPress'];
}

export interface CheckboxProps<ActiveValueT = any, InactiveValueT = any> extends CheckboxIconPrivateProps, ViewProps {
  /**
   * 文案样式
   */
  labelTextClassName?: string;

  /**
   * 图标样式
   */
  iconStyle?: StyleProp<ViewStyle>;

  /**
   *
   */
  iconContainerClassName?: string;

  /**
   * 默认值
   */
  defaultValue?: ActiveValueT | InactiveValueT;

  /**
   * 当前的值
   */
  value?: ActiveValueT | InactiveValueT;

  /**
   * 状态变化
   */
  onChange?: (value: ActiveValueT | InactiveValueT) => void;

  /**
   * 选中时对应的值
   * @default true
   */
  activeValue?: ActiveValueT;

  /**
   * 未选中时对应的值
   * @default false
   */
  inactiveValue?: InactiveValueT;

  /**
   * 文案
   */
  label?: ReactNode;

  /**
   * 是否禁用复选框文本点击
   * @default false
   */
  labelDisabled?: boolean;

  /**
   * 文本位置，可选值为 `'left' | 'right'`
   * @default 'right'
   */
  labelPosition?: 'left' | 'right';

  /**
   * 图标大小
   * @default 20
   */
  iconSize?: number;

  /**
   * 是否禁用复选框
   */
  disabled?: boolean;

  /**
   * 自定义图标
   */
  renderIcon?: (p: RenderIconProps) => ReactNode;

  /**
   * 间距
   */
  gap?: number;
}

type SpaceDirection = 'vertical' | 'horizontal';

export interface CheckboxGroupProps<ActiveValueT = any> extends Omit<CheckboxProps, 'onChange'> {
  checkboxLabelTextClassName?: CheckboxProps['labelTextClassName'];
  options: ({
    value: ActiveValueT;
    label: string;
  } & Partial<Pick<CheckboxProps, 'labelTextClassName' | 'disabled'>>)[];

  /**
   * 间距方向 `'vertical' | 'horizontal'`
   * @default 'vertical'
   */
  direction?: SpaceDirection;

  /**
   * 是否自动换行，仅在 horizontal 时有效
   * @default false
   */
  wrap?: boolean;
  /**
   * 是否多选
   * @default false
   */
  multiple?: boolean;

  value?: ActiveValueT | ActiveValueT[];

  defaultValue?: ActiveValueT | ActiveValueT[];

  onChange?: (
    value: ActiveValueT[] | ActiveValueT,
    options: { value: ActiveValueT; label: string; disabled?: boolean }[],
  ) => void;
  /**
   * 是否可以编辑，readonly 相似，保持 TextInput 自带的属性效果
   * @default true
   */
  editable?: boolean;

  /**
   * 是否可滚动，主要用于横向排版
   * @default false
   */
  scrollable?: boolean;

  /**
   * 单选的情况下是否可以取消选择
   * @default true
   */
  deselect?: boolean;
}

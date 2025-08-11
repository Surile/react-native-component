import type React from 'react';
import type { ViewProps } from 'react-native';
import { BadgeProps } from '../badge/interface';

export type SidebarValue = string | number;

export type SidebarOption = {
  label: string;
  value: SidebarValue;
  disabled?: boolean;
  badge?: BadgeProps;
};

export interface SidebarProps extends ViewProps {
  /**
   * 当选项还在加载中时，可以用 loading 展示一个占位
   */
  loading?: boolean;

  /**
   * 选项
   */
  options: SidebarOption[];

  /**
   * 当前激活 item 的 value
   */
  activeValue?: SidebarValue;

  /**
   * 初始化选中 item 的 value
   */
  defaultActiveValue?: SidebarValue;

  /**
   * 切换面板的回调
   */
  onChange?: (value: SidebarValue) => void;

  /**
   * 空数据占位符
   */
  empty?: React.ReactNode;

  /**
   * 默认宽度 88
   */
  className?: string;
  /**
   * 自定义选项
   */
  renderItem?: (item: SidebarOption, isActive: boolean) => React.ReactNode;
  /**
   * 自定义选项样式
   */
  itemClassName?: string;
  /**
   * 自定义选项激活样式
   */
  activeItemClassName?: string;
  /**
   * 是否显示指示器
   */
  showIndicator?: boolean;

  underlayColor?: string;
}

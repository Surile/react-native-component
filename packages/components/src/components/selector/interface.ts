import type React from 'react';
import type { PopupPropsCommon } from '../popup/types';
import type { TreeOption, TreeProps, TreeValue } from '../tree/interface';

export type SelectorValue = TreeValue;

export type SelectorOption = TreeOption;

export interface SelectorProps
  extends Omit<PopupPropsCommon, 'closeOnPressOverlay' | 'onPressOverlay'>,
    Omit<TreeProps, 'value' | 'defaultValue' | 'options' | 'onChange' | 'theme'> {
  value?: SelectorValue | SelectorValue[];

  defaultValue?: SelectorValue | SelectorValue[];

  onChange?: (v: SelectorValue[] | SelectorValue, options: SelectorOption[]) => void;

  options: SelectorOption[];
  /**
   * 点击遮罩层关闭
   * @default true
   */
  closeOnPressOverlay?: boolean;

  /**
   * 标题
   * @default '请选择'
   */
  title?: React.ReactNode;

  /**
   * 是否显示关闭图标
   * @default true
   */
  showClose?: boolean;

  /**
   * 当值变化的时候立即响应
   */
  onChangeImmediate?: (v: SelectorValue[] | SelectorValue) => SelectorValue[] | SelectorValue;

  /**
   * 顶部安全高度
   * @default safeAreaInsets.top
   */
  safeAreaInsetTop?: number;

  /**
   * 确定按钮文案
   * @default '确定'
   */
  confirmButtonText?: string;
}

export interface SelectorMethodProps extends Omit<SelectorProps, 'visible'> {
  beforeChange?: (value: SelectorValue | SelectorValue[], options: SelectorOption[]) => boolean | Promise<boolean>;
}

export interface SelectorOptions extends Omit<SelectorMethodProps, 'onRequestClose'> {}

export interface SelectorTextProps {
  /**
   * 标题
   * @default '请选择'
   */
  title?: React.ReactNode;

  /**
   * 当前选中的值
   */
  value: SelectorValue;

  /**
   * 候选项数组
   */
  options: SelectorOption[];

  /**
   * 变化时的回调函数
   */
  onChange?: (value: SelectorValue, options: SelectorOption[]) => void;

  /**
   * 箭头Icon名称
   */
  arrowName: string;

  /**
   * 显示分割线
   * @default true
   */
  divider?: boolean;

  /**
   * 左侧是否有间距
   * @default true
   */
  head?: boolean;

  /**
   * 样式
   */
  containerClassName?: string;

  /**
   * 文本样式
   */
  textClassName?: string;
}

export type SelectorFnInstance = (p: SelectorOptions) => Promise<SelectorValue[] | SelectorValue>;

export interface SelectorInstance extends SelectorFnInstance {
  Component: React.FC<SelectorProps>;
  Text: React.FC<SelectorTextProps>;
}

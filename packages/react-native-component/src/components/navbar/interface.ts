import type React from 'react';
import type { ViewProps } from 'react-native';

export interface NavBarProps extends Pick<ViewProps, 'testID'> {
  /**
   * 最外层的样式
   */
  className?: string;

  /**
   * 左侧布局的样式
   */
  leftClassName?: string;

  /**
   * 左侧自定义内容
   */
  leftExtra?: JSX.Element;

  /**
   * 右侧布局的样式
   */
  rightClassName?: string;

  /**
   * 右侧自定义内容
   */
  rightExtra?: JSX.Element;

  /**
   * 标题文案样式
   */
  titleTextClassName?: string;

  /**
   * 标题文字或自定义 JSX
   */
  title?: React.ReactNode;

  /**
   * 显示返回箭头
   * @default true
   */
  showBackArrow?: boolean;

  /**
   * 是否显示分割线
   * @default true
   */
  divider?: boolean;

  /**
   * 点击返回按钮的回调
   */
  onPressBackArrow?: () => void;
}

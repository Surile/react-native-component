import type { PropsWithChildren } from 'react';
import type { ViewProps } from 'react-native';

export interface OverlayProps extends PropsWithChildren<{}>, Pick<ViewProps, 'testID'> {
  /**
   * 最外层样式
   */
  className?: string;
  /**
   * overlay 样式
   */
  overlayClassName?: string;

  /**
   * 是否展示遮罩层
   * @default false
   */
  visible?: boolean;

  /**
   * 动画时长，单位毫秒，默认值 300
   * @default animation_duration_base
   */
  duration?: number;

  /**
   * 点击弹层
   */
  onPress?: () => void;

  /**
   * 当点击返回按钮时触发
   * @support Android
   */
  onRequestClose?: () => boolean;
}

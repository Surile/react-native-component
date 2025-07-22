import type { ReactNode } from 'react';
import type { ViewProps } from 'react-native';

export interface SkeletonAvatarProps extends ViewProps {
  /**
   * 是否展示动画效果
   * @default true
   */
  active?: boolean;

  /**
   * 设置大小
   * @default 40
   */
  size?: number;

  /**
   * 指定头像的形状
   * @default 'circle'
   */
  shape?: 'circle' | 'square';

  /**
   * 自定义类名
   */
  className?: string;
}

export type SkeletonTitleProps = {
  /**
   * 设置标题占位图的宽度，百分比
   */
  width?: number
}

export interface SkeletonParagraphProps extends ViewProps {
  /**
   * 是否展示动画效果
   * @default true
   */
  active?: boolean;

  /**
   * 段落行数
   * @default 3
   */
  rows?: number;

  /**
   * 自定义类名
   */
  className?: string;
}

export interface SkeletonProps extends ViewProps {
  /**
   * 是否展示动画效果
   * @default true
   */
  active?: boolean;

  /**
   * 是否显示头像占位图
   * @default false
   */
  avatar?: boolean | SkeletonAvatarProps;

  /**
   * 是否显示段落占位图
   * @default true
   */
  paragraph?: boolean | SkeletonParagraphProps;

  /**
   * 自定义类名
   */
  className?: string;
}

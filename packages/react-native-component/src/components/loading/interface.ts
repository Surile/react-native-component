import type { ColorValue, ViewProps } from 'react-native';

export interface LoadingProps extends ViewProps {
  /**
   * 文案的样式
   */
  textClassName?: string;

  /**
   * 颜色
   */
  colorClassName?: string;

  color?: ColorValue

  /**
   * 加载图标大小，默认单位为px
   */
  size?: number;

  /**
   * 文字大小
   */
  textSize?: number;

  /**
   * 是否垂直排列图标和文字内容
   * @default false
   */
  vertical?: boolean;

  /**
   * 自定义 loading 图标，需要自己实现动画
   */
  loadingIcon?: React.ReactNode | ((className?: string) => React.ReactNode);
}

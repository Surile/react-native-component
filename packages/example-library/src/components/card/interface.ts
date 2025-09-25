import type { ReactNode } from 'react'
import type { ViewProps } from 'react-native'

export interface CardBodyProps extends ViewProps {
  /**
   * 内边距配置
   * @default true
   */
  padding?: boolean | number | {
    left?: boolean | number
    right?: boolean | number
    top?: boolean | number
    bottom?: boolean | number
  }
  /**
   * 自定义类名
   */
  className?: string
}

export interface CardProps extends ViewProps {
  /**
   * 标题
   */
  title?: ReactNode

  /**
   * 标题左侧操作区
   */
  titleLeftExtra?: ReactNode

  /**
   * 卡片右上角的操作区域
   */
  extra?: ReactNode

  /**
   * 底部区域
   */
  footer?: ReactNode

  /**
   * 自定义标题区域样式
   */
  titleClassName?: string

  /**
   * 头部标题的样式
   */
  titleTextClassName?: string

  /**
   * 内容区域自定义样式
   */
  bodyClassName?: string

  /**
   * 底部自定义样式
   */
  footerClassName?: string

  /**
   * 底部文案自定义样式
   */
  footerTextClassName?: string

  /**
   * 大小
   * @default 'm'
   */
  size?: 's' | 'm'

  /**
   * 是否为方形
   * @default false
   */
  square?: boolean

  /**
   * 当卡片内容还在加载中时，可以用 loading 展示一个占位
   * @default false
   */
  loading?: boolean

  /**
   * header 区域显示分割线
   * @default true
   */
  headerDivider?: boolean

  /**
   * footer 区域显示分割线
   * @default true
   */
  footerDivider?: boolean

  /**
   * body 是否有内边距
   * @default true
   */
  bodyPadding?: boolean | number | {
        left?: boolean | number
        right?: boolean | number
        top?: boolean | number
        bottom?: boolean | number
      }

  /**
   * 点击 header 区域，该区域包含 titleLeftExtra、title、extra
   */
  onPressHeader?: () => void

  /**
   * header 区域渲染完成
   */
  onLayoutHeader?: ViewProps['onLayout']

  /**
   * body 区域渲染完成
   */
  onLayoutBody?: ViewProps['onLayout']

  /**
   * 容器自定义类名
   */
  className?: string
}

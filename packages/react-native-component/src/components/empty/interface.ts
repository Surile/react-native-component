import type React from 'react'
import type { ViewProps } from 'react-native'

export interface EmptyProps extends Pick<ViewProps, 'testID' | 'className'> {
  /**
   * 文案文字样式
   */
  textClassName?: string

  /**
   * 图标样式
   */
  iconClassName?: string

  /**
   * 自定义图标
   */
  icon?: React.ReactNode

  /**
   * 空数据提示文案
   * @default '暂无数据'
   */
  text?: React.ReactNode

  /**
   * 全屏填充
   * @default false
   */
  full?: boolean
}

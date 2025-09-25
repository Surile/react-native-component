import isUndefined from 'lodash/isUndefined'

import type { FieldTextCellPropsUsed } from './interface'

export const pickCellProps = <T extends FieldTextCellPropsUsed>(
  {
    innerClassName,
    title,
    titleClassName,
    titleTextClassName,
    titleExtra,
    valueClassName,
    valueExtra,
    extra,
    extraTextClassName,
    contentClassName,
    divider,
    dividerLeftGap,
    dividerRightGap,
    isLink,
    onPressLink,
    center,
    arrowDirection,
    required,
    vertical,
    titleTextNumberOfLines,
    style,
    testID,
    ...otherProps
  }: T,
  defaultProps?: Partial<T>,
) => {
  const cellProps: Partial<FieldTextCellPropsUsed> = {
    innerClassName,
    title,
    titleClassName,
    titleTextClassName,
    titleExtra,
    valueClassName,
    valueExtra,
    extra,
    extraTextClassName,
    contentClassName,
    divider,
    dividerLeftGap,
    dividerRightGap,
    isLink,
    onPressLink,
    center,
    arrowDirection,
    required,
    vertical,
    titleTextNumberOfLines,
    style,
    testID,
  }

  if (defaultProps && typeof defaultProps === 'object') {
    Object.entries(defaultProps).forEach(([key, value]) => {
      if (isUndefined(cellProps[key as keyof typeof cellProps])) {
        cellProps[key as keyof typeof cellProps] = value
      }
    })
  }

  return {
    cellProps,
    otherProps,
  }
}

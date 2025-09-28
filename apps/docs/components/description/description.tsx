import isNil from 'lodash/isNil';
import React, { memo, isValidElement } from 'react';
import { View } from 'react-native';

import { useDescription } from './context';
import type { DescriptionProps } from './interface';
import { getDefaultValue, renderTextLikeJSX } from '../../helpers';
import { cn } from '../../lib/utils';
import { vars } from 'nativewind';
import { textSizeVariants } from './styles';

const Description: React.FC<DescriptionProps> = ({
  colon,
  contentClassName,
  contentTextClassName,
  labelClassName,
  labelTextClassName,
  labelWidth,
  layout,
  size,
  numberOfLines,
  justify,
  align,
  label,
  text,
  hidden = false,
  bold = false,
  color,
  addonBefore,
  addonAfter,
  renderLabel,
  render,
  empty,
  showEmpty,

  children,
  style,
  ...restProps
}) => {
  const descriptionContext = useDescription();

  // 整理默认值
  const _colon = getDefaultValue(colon, descriptionContext.colon);
  const _contentClassName = getDefaultValue(contentClassName, descriptionContext.contentClassName);
  const _contentTextClassName = getDefaultValue(
    contentTextClassName,
    descriptionContext.contentTextClassName
  );
  const _labelClassName = getDefaultValue(labelClassName, descriptionContext.labelClassName);
  const _labelTextClassName = getDefaultValue(
    labelTextClassName,
    descriptionContext.labelTextClassName
  );
  const _labelWidth = getDefaultValue(labelWidth, descriptionContext.labelWidth);
  const _layout = getDefaultValue(layout, descriptionContext.layout);
  const _size = getDefaultValue(size, descriptionContext.size);
  const _justify = getDefaultValue(justify, descriptionContext.justify);
  const _align = getDefaultValue(align, descriptionContext.align);
  const _numberOfLines = getDefaultValue(numberOfLines, descriptionContext.numberOfLines);
  const _empty = getDefaultValue(empty, descriptionContext.empty);
  const _showEmpty = getDefaultValue(showEmpty, descriptionContext.showEmpty);

  const colonStr = _colon ? '：' : '';
  const labelJSX = !isNil(renderLabel)
    ? renderLabel(colonStr)
    : !isNil(label)
    ? renderTextLikeJSX(
        `${label}${colonStr}`,
        cn('text-gray-700', textSizeVariants({ size: _size }), _labelTextClassName)
      )
    : null;

  const renderText = (node: React.ReactNode) =>
    renderTextLikeJSX(
      node,
      cn(
        'text-gray-800 shrink max-w-[100%]',
        {
          'font-bold': bold,
        },
        textSizeVariants({ size: _size }),
        _contentTextClassName
      ),
      {
        style: !isNil(color) ? { color } : null,
        numberOfLines: _numberOfLines,
      }
    );
  const contentJSX = isValidElement(children)
    ? children
    : renderText(!isNil(text) ? text : children);

  // 判断是否渲染空数据占位符
  const renderContentJSX =
    (isNil(contentJSX) || text === '' || children === '') && _showEmpty
      ? renderText(_empty)
      : contentJSX;

  const renderJSX = !isNil(render) ? (
    render(renderContentJSX, addonBefore, addonAfter)
  ) : (
    <>
      {addonBefore}
      {renderContentJSX}
      {addonAfter}
    </>
  );

  if (hidden) {
    return null;
  }

  return (
    <View
      {...restProps}
      style={vars({
        '--label-width': _labelWidth ?? 0,
        '--justify': _justify || '',
        '--align': align || '',
      })}
      className={cn(
        {
          'flex-row': _layout === 'horizontal',
          'flex-col': _layout === 'vertical',
          'items-[var(--align)]': align,
          'justify-[var(--justify)]': justify,
        },
        restProps.className
      )}
    >
      <View
        className={cn(_labelClassName, {
          'w-[var(--label-width)]': !isNil(_labelWidth),
        })}
      >
        {labelJSX}
      </View>
      <View className={cn('overflow-hidden flex-1 flex-row items-center', _contentClassName)}>
        {renderJSX}
      </View>
    </View>
  );
};

export default memo(Description);

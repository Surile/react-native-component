import isArray from 'lodash/isArray';
import noop from 'lodash/noop';
import React, { memo } from 'react';

import ActionSheet from '../action-sheet';
import BottomBar from '../bottom-bar';
import Button from '../button';
import Space from '../space';

import type { ButtonBarProps } from './interface';
import { size } from '../styles';
import { cn } from '../../lib/utils';

const ButtonBar: React.FC<ButtonBarProps> = ({
  alone = false,
  buttons,
  count = 4,
  moreText,
  blankSize = 'm',
  className,
  children,
  style,
  ...restProps
}) => {
  const realButtons = (buttons || []).filter((item) => !item.hidden);
  const isConfig = isArray(buttons);
  const showMore = realButtons.length > count;
  const bottomButtons = showMore ? realButtons.slice(0, count - 1) : realButtons;

  const onPressMore = () => {
    const restButtons = realButtons.slice(count - 1);

    ActionSheet({
      actions: restButtons.map((item) => item.text),
      cancelText: '取消',
    })
      .then(({ index }: { index: number }) => {
        restButtons[index].onPress?.();
      })
      .catch(noop);
  };

  const defaultGap = size[blankSize];

  if (isConfig && realButtons.length === 0) {
    return null;
  }

  return (
    <BottomBar
      className={cn(
        'flex-row justify-end items-center',
        {
          'flex-col items-stretch justify-center': alone,
        },
        className
      )}
      style={[
        {
          paddingHorizontal: defaultGap,
        },
        style,
      ]}
      {...restProps}
    >
      {isConfig ? (
        <Space justify='end' align='center' direction='horizontal' gapHorizontal={8}>
          {showMore ? <Button type='link' text={moreText ?? '更多'} onPress={onPressMore} /> : null}
          {bottomButtons.reverse().map((b, index) => {
            return <Button key={index} {...b} size={b.size || 'm'} />;
          })}
        </Space>
      ) : (
        children
      )}
    </BottomBar>
  );
};

export default memo(ButtonBar);

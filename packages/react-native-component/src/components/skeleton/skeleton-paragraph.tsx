import React, { useMemo, memo } from 'react';
import { PlaceholderLine } from 'rn-placeholder';

import Space from '../space';

import type { SkeletonParagraphProps } from './interface';
import SkeletonActive from './skeleton-active';

const SkeletonParagraph: React.FC<SkeletonParagraphProps> = ({
  active = true,
  rows,
  widths,
  testID,
}) => {
  const paragraphs = useMemo(() => new Array(rows).fill(0).map((_, i) => i), [rows]);
  const nodeJSX = (
    <Space testID={testID}>
      {paragraphs.map((n) => {
        return (
          <PlaceholderLine
            style={{ backgroundColor: '#EDEFF2' }}
            key={n}
            width={widths?.[n]}
            noMargin
          />
        );
      })}
    </Space>
  );

  if (active) {
    return <SkeletonActive>{nodeJSX}</SkeletonActive>;
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return nodeJSX;
};

export default memo(SkeletonParagraph);

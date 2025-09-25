import isNil from 'lodash/isNil';
import React, { memo } from 'react';

import Description from './description';
import type { DescriptionThousandProps } from './interface';
import { formatThousandths } from '../../helpers';

const DescriptionThousand: React.FC<DescriptionThousandProps> = ({ text, ...restProps }) => {
  const value = !isNil(text) ? formatThousandths(`${text}`) : text;

  return <Description {...restProps} text={value} />;
};

export default memo(DescriptionThousand);

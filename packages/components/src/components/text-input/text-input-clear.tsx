import React, { memo } from 'react';

import type { TextInputClearProps } from './interface';
import { CrossOutline } from '../icons';

const TextInputClear: React.FC<TextInputClearProps> = ({ onPress }) => {
  return (
    <CrossOutline
      className='self-center size-4 rounded-lg text-[#B9BEC5] items-center justify-center ml-2'
      color='#FFFFFF'
      size={12}
      onPress={onPress}
    />
  );
};

export default memo(TextInputClear);

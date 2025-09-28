import React from 'react';
import Overlay from './overlay';
import type { OverlayProps } from './types';

/**
 * Overlay 遮罩层
 * @description 创建一个遮罩层，用于强调特定的页面元素，并阻止用户进行其他操作。
 */
const OverlayContainer: React.FC<OverlayProps> = (props) => {
  return <Overlay {...props} />;
};

export default OverlayContainer;

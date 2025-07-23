import React, { memo } from 'react';
import Popup from './popup';
import PopupHeader from './popup-header';
import PopupPage from './popup-page';
import type { PopupPageProps, PopupProps } from './types';
import Portal from '../portal';
import { attachPropertiesToComponent } from '../../helpers';
import PopupKeyboardShim from './popup-keyboard-shim';

/**
 * Popup 弹出层
 * @description 弹出层容器，用于展示弹窗、信息提示等内容，支持多个弹出层叠加展示。
 */
const PopupContainer: React.FC<PopupProps> = (props) => {
  return (
    <Portal>
      <Popup {...props} />
    </Portal>
  );
};

const PopupPageContainer: React.FC<PopupPageProps> = (props) => {
  return (
    <Portal>
      <PopupPage {...props} />
    </Portal>
  );
};

export default attachPropertiesToComponent(memo(PopupContainer), {
  PopupComponent: Popup,
  Page: PopupPageContainer,
  Header: PopupHeader,
  PageComponent: PopupPage,
  KeyboardShim: PopupKeyboardShim,
});

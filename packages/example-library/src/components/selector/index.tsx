import React from 'react';
import type { SelectorProps } from './interface';
import Selector from './selector';
import SelectorInstance from './selector-instance';
import SelectorText from './selector-text';
import Portal from '../portal';
import { attachPropertiesToComponent } from '../../helpers';

const Component: React.FC<SelectorProps> = (props) => {
  return (
    <Portal>
      <Selector {...props} />
    </Portal>
  );
};

export default attachPropertiesToComponent(SelectorInstance, {
  Component,
  SelectorComponent: Selector,
  Text: SelectorText,
});

import React from 'react';
import type { SelectorOptions, SelectorValue } from './interface';
import SelectorMethod from './selector-method';
import Portal from '../portal';

const SelectorInstance = (opt: SelectorOptions) =>
  new Promise<SelectorValue[] | SelectorValue>((resolve, reject) => {
    const key = Portal.add(
      <SelectorMethod
        {...opt}
        onChange={(v, o) => {
          opt.onChange?.(v, o);
          resolve(v);
        }}
        onClose={() => {
          opt.onClose?.();
          reject(new Error());
        }}
        onClosed={() => {
          opt.onClosed?.();

          Portal.remove(key);
        }}
      />
    );
  });

export default SelectorInstance;

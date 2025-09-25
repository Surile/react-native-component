import { useCallback, useState } from 'react';
import isFunction from 'lodash/isFunction';
import useDestroyed from './useDestroyed';
import { isObject } from '../helpers';

type UpdateStateParam<T> = Partial<T> | ((s: T) => Partial<T>);

type UpdateState<T> = (p: UpdateStateParam<T>) => void;

/**
 * useState 类似 this.setState 可以传入部分字段更新
 * @param state 状态
 */
const useStateUpdate = <T>(state: T | (() => T)): [T, UpdateState<T>] => {
  const [localState, setLocalState] = useState<T>(state);
  const getDestroyed = useDestroyed();
  const updateState = useCallback(
    (s: UpdateStateParam<T>) => {
      if (!getDestroyed()) {
        setLocalState((ls) => {
          const value = isFunction(s) ? s(ls) : s;

          if (isObject(ls)) {
            return {
              ...ls,
              ...value,
            };
          }

          return value as T;
        });
      }
    },
    [getDestroyed],
  );

  return [localState, updateState];
};

export default useStateUpdate;

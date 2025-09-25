import React, { memo } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Portal from '../portal';

import type { ProviderProps } from './interface';

/**
 * 统一的配置
 * 将来 Portal 准备统一的入口，https://github.com/callstack/react-native-paper/blob/master/src/components/Portal/Portal.tsx
 */
const Provider: React.FC<React.PropsWithChildren<ProviderProps>> = ({ children }) => {
  return (
    <SafeAreaProvider>
      <Portal.Host>{children}</Portal.Host>
    </SafeAreaProvider>
  );
};

export default memo(Provider);

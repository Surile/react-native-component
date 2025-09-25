import { memo, useCallback, useRef, useState } from 'react';
import type { ScrollViewProps } from 'react-native';
import { View, ScrollView } from 'react-native';

import FloatingPanel from './floating-panel';
import type { FloatingPanelScrollViewProps } from './interface';

const FloatingPanelScrollView: React.FC<React.PropsWithChildren<FloatingPanelScrollViewProps>> = ({
  onAnimationEnd,

  children,
  ...restProps
}) => {
  const [scrollEnabled, setScrollEnabled] = useState(false);

  const scrollTopRef = useRef(0);
  const _onMoveShouldSetPanResponder = useCallback(() => {
    if (scrollTopRef.current > 0) {
      return false;
    }
  }, []);
  const _onAnimationEnd = useCallback(
    (opened: boolean) => {
      setScrollEnabled(opened);
      onAnimationEnd?.(opened);
    },
    [onAnimationEnd]
  );
  const onScroll = useCallback<Exclude<ScrollViewProps['onScroll'], undefined>>((e) => {
    scrollTopRef.current = e.nativeEvent.contentOffset.y;
  }, []);

  return (
    <FloatingPanel
      {...restProps}
      _onMoveShouldSetPanResponder={_onMoveShouldSetPanResponder}
      onAnimationEnd={_onAnimationEnd}
    >
      <View className='flex-1'>
        <ScrollView scrollEventThrottle={16} scrollEnabled={scrollEnabled} onScroll={onScroll}>
          {children}
        </ScrollView>
      </View>
    </FloatingPanel>
  );
};

export default memo(FloatingPanelScrollView);

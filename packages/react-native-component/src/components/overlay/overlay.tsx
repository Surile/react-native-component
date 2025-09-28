import React, { memo, useEffect, useRef, useState } from "react";
import {
  Animated,
  BackHandler,
  Platform,
  TouchableOpacity,
} from "react-native";
import type { OverlayProps } from "./types";
import { cn } from "../../lib/utils";

/**
 * Overlay 遮罩层
 * @description 创建一个遮罩层，用于强调特定的页面元素，并阻止用户进行其他操作。
 * TODO 统计遮罩层数量，动态控制状态栏的颜色，避免黑色遮罩层配合黑色文字的状态栏。
 */
const Overlay: React.FC<OverlayProps> = ({
  testID,
  children,
  className,
  overlayClassName,
  visible = false,
  duration = 300,
  onPress,
  onRequestClose,
}) => {
  const fadeAnim = useRef(new Animated.Value(0));
  const fadeInstance = useRef<Animated.CompositeAnimation | null>(null);
  const [localVisible, setLocalVisible] = useState(visible);

  // 监听状态变化，执行动画
  useEffect(() => {
    if (visible) {
      setLocalVisible(true);
    }

    fadeInstance.current = Animated.timing(
      fadeAnim.current, // 动画中的变量值
      {
        toValue: visible ? 1 : 0,
        duration,
        useNativeDriver: true,
      }
    );

    fadeInstance.current.start(({ finished }) => {
      if (finished) {
        fadeInstance.current = null;

        if (!visible) {
          setLocalVisible(false);
        }
      }
    });

    return () => {
      // 停止动画
      if (fadeInstance.current) {
        fadeInstance.current.stop();
        fadeInstance.current = null;
      }
    };
  }, [visible, duration]);

  // Android 返回按钮
  useEffect(() => {
    if (Platform.OS === "android") {
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        () => {
          if (typeof onRequestClose === "function" && visible) {
            return onRequestClose();
          }

          return false;
        }
      );

      return () => backHandler.remove();
    }
  }, [visible, onRequestClose]);

  if (!localVisible) {
    // TODO 优化文档报错
    // 直接返回 null dumi 报错 -、-

    return <></>;
  }

  return (
    <Animated.View
      testID={testID}
      style={{
        opacity: fadeAnim.current,
      }}
      className={cn(
        "relative left-0 right-0 bottom-0 top-0 bg-black/70",
        localVisible ? "absolute" : null,
        overlayClassName
      )}
    >
      <TouchableOpacity
        className={cn("flex-1", className)}
        activeOpacity={1}
        onPress={onPress}
      >
        {children}
      </TouchableOpacity>
    </Animated.View>
  );
};

export default memo(Overlay);

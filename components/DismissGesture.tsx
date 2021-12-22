import React from "react";
import { StyleProp } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import {
  Easing,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import Layout from "../constants/Layout";

function clamp(number: number, min: number, max: number): number {
  "worklet";
  return Math.max(min, Math.min(number, max));
}

function DismissGesture({
  itemHeight,
  children,
  onDismiss,
}: {
  itemHeight: number;
  children: (
    cardAnimatedStyle: StyleProp<any>,
    btnAnimatatedStyle: StyleProp<any>,
    wrapperAnimatedStyle: StyleProp<any>
  ) => React.ReactNode;
  onDismiss: () => void;
}) {
  const THRESHOLD = 100;
  const offsetX = useSharedValue(0);
  const savedOffset = useSharedValue(0);
  const opacity = useSharedValue(0);
  const itemHeightVal = useSharedValue(itemHeight);

  // config
  const springConfigDismiss = {
    stiffness: 250,
    damping: 10,
    mass: 0.3,
  };

  const springConfigCancel = {
    stiffness: 250,
    damping: 25,
  };

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      offsetX.value = clamp(
        event.translationX + savedOffset.value,
        0,
        Layout.window.width
      );
      opacity.value = interpolate(event.translationX, [0, THRESHOLD], [0, 1]);
    })
    .onEnd((event) => {
      if (event.translationX > THRESHOLD) {
        opacity.value = withTiming(0);
        itemHeightVal.value = withTiming(0);
        offsetX.value = withSpring(
          Layout.window.width,
          springConfigDismiss,
          (finished) => {
            if (finished) {
              runOnJS(onDismiss)();
            }
          }
        );
      } else {
        opacity.value = withTiming(0);
        offsetX.value = withSpring(0, springConfigCancel);
      }
    });

  const cardAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: offsetX.value }],
  }));

  const btnAnimatatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const wrapperAnimatedStyle = useAnimatedStyle(() => ({
    height: itemHeightVal.value,
  }));

  return (
    <GestureDetector gesture={panGesture}>
      {children(cardAnimatedStyle, btnAnimatatedStyle, wrapperAnimatedStyle)}
    </GestureDetector>
  );
}

export default DismissGesture;

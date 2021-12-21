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

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      offsetX.value = clamp(
        event.translationX + savedOffset.value,
        0,
        Layout.window.width
      );
      opacity.value = interpolate(
        event.translationX,
        [0, 30, THRESHOLD],
        [0, 0, 1]
      );
    })
    .onEnd((event) => {
      if (event.translationX > THRESHOLD) {
        opacity.value = withTiming(0, {
          duration: 1,
          easing: Easing.ease,
        });
        offsetX.value = withSpring(
          Layout.window.width,
          {
            stiffness: 250,
            damping: 10,
            mass: 0.3,
          },
          (isFinished) => {
            if (isFinished) {
              itemHeightVal.value = withTiming(0, undefined, (isFinished2) => {
                if (isFinished2) {
                  runOnJS(onDismiss)();
                }
              });
            }
          }
        );
      } else {
        opacity.value = withSpring(0);
        offsetX.value = withSpring(0, {
          stiffness: 250,
          damping: 25,
        });
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

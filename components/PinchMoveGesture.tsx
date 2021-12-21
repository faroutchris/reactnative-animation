import React from "react";
import { StyleProp } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import {
  useAnimatedStyle,
  useSharedValue,
  withDecay,
  withSpring,
} from "react-native-reanimated";

function PinchMoveGesture({
  children,
}: {
  children: (
    animatedStyle: StyleProp<any>,
    reset: () => void
  ) => React.ReactNode;
}) {
  // Animated values
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const savedOffset = useSharedValue({ x: 0, y: 0 });
  // Constants
  const DECELERATION = 0.997;

  function reset() {
    offsetX.value = withSpring(0, { damping: 11, mass: 0.5 });
    offsetY.value = withSpring(0, { damping: 11, mass: 0.5 });
    scale.value = withSpring(1, { damping: 10, mass: 1 });
    savedScale.value = 1;
    savedOffset.value = { x: 0, y: 0 };
  }

  const pinchGesture = Gesture.Pinch()
    .onUpdate((event) => {
      scale.value = event.scale * savedScale.value;
    })
    .onEnd(() => {
      savedScale.value = scale.value;
    });

  const panGesture = Gesture.Pan()
    .onBegin(() => {
      savedOffset.value = { x: offsetX.value, y: offsetY.value };
    })
    .onUpdate((event) => {
      offsetX.value = event.translationX / scale.value + savedOffset.value.x;
      offsetY.value = event.translationY / scale.value + savedOffset.value.y;
    })
    .onEnd((event) => {
      offsetX.value = withDecay({
        velocity: event.velocityX,
        deceleration: DECELERATION,
      });
      offsetY.value = withDecay({
        velocity: event.velocityY,
        deceleration: DECELERATION,
      });
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { translateX: offsetX.value },
      { translateY: offsetY.value },
    ],
  }));

  const composedGesture = Gesture.Simultaneous(pinchGesture, panGesture);

  return (
    <GestureDetector gesture={composedGesture}>
      {children(animatedStyle, reset)}
    </GestureDetector>
  );
}

export default PinchMoveGesture;

import React, { useRef, useState } from "react";
import {
  Alert,
  StyleProp,
  StyleSheet,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableOpacity,
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDecay,
  withSpring,
} from "react-native-reanimated";
import Card, { Cards } from "./Card";
import { View, Text } from "./Themed";

function CardGesture({
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

export default () => {
  const reset = useRef(() => {});
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={reset.current}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>Reset</Text>
        </View>
      </TouchableOpacity>
      <CardGesture>
        {(animatedStyle: StyleProp<any>, _reset) => {
          reset.current = _reset;
          return (
            <Animated.View style={animatedStyle}>
              <View style={styles.card}>
                <Card card={Cards.Card2} />
              </View>
            </Animated.View>
          );
        }}
      </CardGesture>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  card: {
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  btn: {
    backgroundColor: "#e68075",
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 30,
  },
  btnText: {
    color: "white",
  },
});

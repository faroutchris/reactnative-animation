import { Ionicons } from "@expo/vector-icons";
import * as React from "react";
import { LayoutChangeEvent, StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Easing,
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import useLayoutInset from "../hooks/useLayoutInsets";
import { clamp } from "../libs/AnimationHelpers";
import { LinearGradient } from "expo-linear-gradient";

const AnimatedIonicon = Animated.createAnimatedComponent(Ionicons);

const BUTTON_WIDTH = 80;

function SwipeToConfirm() {
  const [width, setWidth] = React.useState(0);
  const [complete, setComplete] = React.useState(false);
  const { top } = useLayoutInset();
  const blink = useSharedValue(0);
  const panX = useSharedValue(0);
  const done = useSharedValue(0);
  const context = { x: useSharedValue(0) };

  const _setComplete = () => {
    setComplete(true);
  };

  const onLayout = (event: LayoutChangeEvent) => {
    const _width = event.nativeEvent.layout.width;
    setWidth(_width - BUTTON_WIDTH - 6);
  };

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      if (!complete) {
        panX.value = clamp(event.translationX + context.x.value, 0, width);
      }
    })
    .onEnd(() => {
      if (!complete) {
        if (panX.value >= width) {
          runOnJS(_setComplete)();
        } else {
          panX.value = withTiming(0);
          context.x.value = withTiming(0);
        }
      }
    });

  React.useEffect(() => {
    if (complete) {
      blink.value = withTiming(0);
      done.value = withDelay(
        0,
        withTiming(1, {
          duration: 400,
          easing: Easing.ease,
        })
      );
    } else {
      blink.value = withRepeat(
        withTiming(1, {
          duration: 1000,
          easing: Easing.ease,
        }),
        -1,
        true
      );
    }
  }, [blink, complete]);

  const translateAnim = useAnimatedStyle(() => ({
    transform: [{ translateX: panX.value }],
  }));

  const completeAnim = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(
          done.value,
          [0, 0.5, 1],
          [0, 1.4, 1],
          Extrapolate.CLAMP
        ),
      },
    ],
  }));

  const textFadeAnim = useAnimatedStyle(() => ({
    opacity: interpolate(done.value, [0, 1], [1, 0], Extrapolate.CLAMP),
    transform: [
      {
        scale: interpolate(
          done.value,
          [0, 0.5, 1],
          [1, 1.4, 1],
          Extrapolate.CLAMP
        ),
      },
    ],
  }));

  return (
    <View style={[styles.container, { marginTop: top }]}>
      <View style={styles.track} onLayout={onLayout}>
        <LinearGradient
          style={styles.trackShadow}
          colors={[
            "rgba(200, 200, 218, 0.25)",
            "rgba(200, 200, 218, 0.005)",
            "transparent",
          ]}
          locations={[0, 0.15, 0.15]}
        />
        <Animated.Text style={[styles.instruction, textFadeAnim]}>
          Slide to confirm
        </Animated.Text>
        <GestureDetector gesture={panGesture}>
          <Animated.View style={[styles.button, translateAnim]}>
            <AnimatedIonicon
              name="checkmark"
              size={36}
              style={[styles.complete, completeAnim]}
            />
            {[0, 0, 0].map((_, index) => {
              const opacityAnim = useAnimatedStyle(() => {
                const opacity = interpolate(
                  blink.value,
                  [0 + 0.15 * index, 1],
                  [0, 1]
                );
                return { opacity };
              });
              return (
                <AnimatedIonicon
                  name="chevron-forward"
                  size={24}
                  style={[
                    styles.chevron,
                    { left: BUTTON_WIDTH / 2 - 18 + index * 8 },
                    opacityAnim,
                  ]}
                />
              );
            })}
          </Animated.View>
        </GestureDetector>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    flex: 1,
    justifyContent: "center",
  },
  track: {
    position: "relative",
    backgroundColor: "#fdfdfd",
    height: 66,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 100,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#ddd",
    overflow: "hidden",
  },
  trackShadow: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  instruction: {
    fontFamily: "inter-xlight",
    fontSize: 20,
    color: "#000",
  },
  button: {
    position: "absolute",
    left: 2,
    top: 2,
    width: BUTTON_WIDTH,
    height: 61,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#fff",
    shadowColor: "rgba(0,0,0,0.5)",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,

    elevation: 13,
    borderRadius: 100,
  },
  chevron: {
    position: "absolute",
    color: "#adadad",
  },
  complete: {
    color: "#28b463",
  },
});

export default SwipeToConfirm;

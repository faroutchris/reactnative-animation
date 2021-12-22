import React from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View,
} from "react-native";
import {
  useAnimatedRef,
  useDerivedValue,
  useSharedValue,
  scrollTo,
  useAnimatedStyle,
  interpolateColor,
} from "react-native-reanimated";

import Layout from "../constants/Layout";
import Slide, { Slides } from "./Slide";
import { HeadingText } from "./StyledText";
import { ScrollView } from "react-native-gesture-handler";

const SLIDES = [Slides.Slide1, Slides.Slide2, Slides.Slide3, Slides.Slide4];

function Carousel() {
  const scrollRef = useAnimatedRef<ScrollView>();
  const scrollIndex = useSharedValue(0);
  const scrollPixelValue = useSharedValue(0);

  useDerivedValue(() => {
    scrollTo(scrollRef, scrollIndex.value * Layout.window.width, 0, true);
  });

  const onPressNext = (index: number) => {
    scrollIndex.value = index === SLIDES.length - 1 ? 0 : scrollIndex.value + 1;
  };

  const updateIndex = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollIndex.value = Math.floor(
      event.nativeEvent.contentOffset.x / Layout.window.width
    );
  };

  const updatePixelValue = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollPixelValue.value = Math.floor(event.nativeEvent.contentOffset.x);
  };

  const backgroundStyles = useAnimatedStyle(() => {
    return {
      // interpolatecolor requires hermes to be enabled in react-native v66 & reanimated v.2.3.x
      // https://github.com/software-mansion/react-native-reanimated/issues/2329
      backgroundColor: interpolateColor(
        scrollPixelValue.value,
        [
          0,
          1 * Layout.window.width,
          2 * Layout.window.width,
          3 * Layout.window.width,
        ],
        ["#E4C7B8", "#B7D6D0", "#FFF7CE", "#D8E0E8"],
        "RGB"
      ),
    };
  });

  return (
    <View style={styles.outer}>
      <ScrollView
        ref={scrollRef}
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        style={styles.container}
        onMomentumScrollEnd={updateIndex}
        onScroll={updatePixelValue}
        scrollEventThrottle={16}
      >
        {scrollPixelValue &&
          SLIDES.map((slide, index) => (
            <Slide
              key={index.toString()}
              backgroundStyles={backgroundStyles}
              scrollPixelValue={scrollPixelValue}
              slide={slide}
              index={index}
              onPressNext={onPressNext}
            />
          ))}
      </ScrollView>
      <View style={styles.logo}>
        <HeadingText style={styles.logoText}>MidCentury.</HeadingText>
      </View>
    </View>
  );
}

export default Carousel;

const styles = StyleSheet.create({
  outer: {
    position: "relative",
    flex: 1,
  },
  container: {
    flex: 1,
  },
  logo: {
    position: "absolute",
    top: 60,
    left: 20,
    fontSize: 30,
  },
  logoText: {
    fontSize: 20,
  },
});

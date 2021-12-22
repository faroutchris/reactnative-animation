import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import Layout from "../constants/Layout";

const data = [
  {
    img: require("../assets/images/slides/pineapplelamp.png"),
    bgColor: "#E4C7B8",
    btnColor: "#B47948",
    height: 300,
    width: 245,
    title: "Miranda Pineapple",
    description: "A fanciful lamp to add a tropical vibe",
  },
  {
    img: require("../assets/images/slides/bogardearmchair.png"),
    bgColor: "#D8E0E8",
    btnColor: "#8CA79F",
    height: 300,
    width: 260,
    title: "Bogarde Armchair",
    description: "Perfect for any living room or lobby",
  },
  {
    img: require("../assets/images/slides/minelliarmchair.png"),
    bgColor: "#527185",
    btnColor: "#8E959C",
    height: 270,
    width: 300,
    title: "Minelli armchair",
    description: "Timeless pieces never go out of fashion",
  },
];

export const getSlideData = (slide: Slides) => {
  return data[slide];
};

export enum Slides {
  Slide1 = 0,
  Slide2 = 1,
  Slide3 = 2,
}

type Props = {
  slide: Slides;
  index: number;
  onPressNext: (index: number) => void;
  backgroundStyles: {
    backgroundColor: string | number;
  };
  scrollPixelValue: SharedValue<number>;
};

export default function ({
  slide,
  index,
  onPressNext,
  backgroundStyles,
  scrollPixelValue,
}: Props) {
  const _slide = data[slide];
  const inputRange = [
    (index - 1) * Layout.window.width,
    index * Layout.window.width,
    (index + 1) * Layout.window.width,
  ];

  const animatedImageStyles = useAnimatedStyle(() => {
    const rot = interpolate(
      scrollPixelValue.value,
      inputRange,
      [25, 0, -25],
      Extrapolate.CLAMP
    );
    const scale = interpolate(
      scrollPixelValue.value,
      inputRange,
      [0.6, 1, 0.6],
      Extrapolate.CLAMP
    );
    return {
      transform: [{ rotateZ: `${rot}deg` }, { scale }],
    };
  });

  const animatedTitleStyles = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollPixelValue.value,
      inputRange,
      [0, 1, 0],
      Extrapolate.CLAMP
    );
    const translateX = interpolate(
      scrollPixelValue.value,
      inputRange,
      [-100, 0, -100],
      Extrapolate.CLAMP
    );
    return {
      opacity,
      transform: [{ translateX }],
    };
  });

  const animatedDescStyles = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollPixelValue.value,
      inputRange,
      [0, 1, 0],
      Extrapolate.CLAMP
    );
    const translateX = interpolate(
      scrollPixelValue.value,
      inputRange,
      [100, 0, 100],
      Extrapolate.CLAMP
    );
    return {
      opacity,
      transform: [{ translateX }],
    };
  });

  const animateIndexStyles = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollPixelValue.value,
      inputRange,
      [0, 1, 0],
      Extrapolate.CLAMP
    );
    return { opacity };
  });

  return (
    <Animated.View style={[styles.wrapper, backgroundStyles]}>
      <Animated.Image
        source={_slide.img}
        style={[
          styles.image,
          animatedImageStyles,
          { height: _slide.height, width: _slide.width },
        ]}
      />
      <Animated.View style={[styles.textContainer]}>
        <Animated.Text style={[styles.index, animateIndexStyles]}>
          {"0" + (index + 1) + "."}
        </Animated.Text>
        <Animated.Text style={[styles.title, animatedTitleStyles]}>
          {_slide.title}
        </Animated.Text>
        <Animated.Text style={[styles.desc, animatedDescStyles]}>
          {_slide.description}
        </Animated.Text>
        <TouchableWithoutFeedback onPress={() => onPressNext(index)}>
          <View style={[styles.pager]}>
            <AntDesign name="arrowright" size={30}></AntDesign>
          </View>
        </TouchableWithoutFeedback>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: Layout.window.width,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  textContainer: {
    width: Layout.window.width,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  image: {
    width: Layout.window.width,
  },
  index: {
    fontSize: 40,
    fontFamily: "inter-bold",
    marginVertical: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: "inter-bold",
    marginBottom: 15,
  },
  desc: {
    fontSize: 16,
    fontFamily: "inter-xlight",
    marginBottom: 40,
  },
  pager: {
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
  },
});

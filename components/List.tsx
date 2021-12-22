import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Animated, { FadeIn, FadeInLeft } from "react-native-reanimated";
import { FontAwesome5 } from "@expo/vector-icons";
import DismissGesture from "./DismissGesture";
import { View, Text } from "./Themed";

const COLORS = [
  "#FFAEBC",
  "#A0E7E5",
  "#B4F8C8",
  "#FBE7C6",
  "#ef7c8e",
  "#fae8e0",
  "#b6e2d3",
];

const ITEM_HEIGHT = 100;

function List() {
  const [colors, setColors] = useState(COLORS);

  const handleDelete = (color: string) => {
    setColors(colors.filter((_col) => color !== _col));
  };

  const reset = () => {
    setColors(COLORS);
  };

  return (
    <ScrollView style={styles.wrapper}>
      {colors.length === 0 && (
        <Animated.View entering={FadeIn.duration(700)}>
          <TouchableOpacity onPress={reset}>
            <View style={styles.btn}>
              <Text style={styles.btnText}>Reset</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      )}
      {colors.map((color, index) => (
        <DismissGesture
          key={color}
          itemHeight={ITEM_HEIGHT}
          onDismiss={() => handleDelete(color)}
        >
          {(cardAnimatedStyle, btnAnimatatedStyle, wrapperAnimatedStyle) => {
            return (
              <Animated.View
                style={[wrapperAnimatedStyle, styles.itemWrapper]}
                entering={FadeInLeft.duration(400).delay(index * 100)}
              >
                <Animated.View style={[btnAnimatatedStyle, styles.itemDelete]}>
                  <FontAwesome5 name="trash-alt" color="red" size={32} />
                </Animated.View>

                <Animated.View
                  style={[
                    cardAnimatedStyle,
                    styles.itemCard,
                    { backgroundColor: color },
                  ]}
                ></Animated.View>
              </Animated.View>
            );
          }}
        </DismissGesture>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  itemWrapper: {
    position: "relative",
    height: ITEM_HEIGHT,
  },
  itemDelete: {
    position: "absolute",
    top: 32,
    left: 10,
    color: "red",
  },
  itemCardBg: {
    position: "absolute",
    width: "100%",
    height: ITEM_HEIGHT - 20,
    marginVertical: 10,
    borderRadius: 16,
    backgroundColor: "#EE4949",
  },
  itemCard: {
    width: "100%",
    height: ITEM_HEIGHT - 20,
    marginVertical: 10,
    borderRadius: 16,
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

export default List;

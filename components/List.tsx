import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { FontAwesome5 } from "@expo/vector-icons";
import DismissGesture from "./DismissGesture";

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

  return (
    <ScrollView style={styles.wrapper}>
      {colors.map((color) => (
        <DismissGesture
          key={color}
          itemHeight={ITEM_HEIGHT}
          onDismiss={() => handleDelete(color)}
        >
          {(cardAnimatedStyle, btnAnimatatedStyle, wrapperAnimatedStyle) => {
            return (
              <Animated.View style={[wrapperAnimatedStyle, styles.itemWrapper]}>
                <Animated.View style={[btnAnimatatedStyle, styles.itemDelete]}>
                  <FontAwesome5 name="trash-alt" color="red" size={40} />
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
  },
  itemWrapper: {
    position: "relative",
    height: ITEM_HEIGHT,
  },
  itemDelete: {
    position: "absolute",
    top: 28,
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
});

export default List;

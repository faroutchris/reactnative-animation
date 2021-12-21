import React, { useEffect, useRef, useState } from "react";
import { StyleProp, StyleSheet, TouchableOpacity } from "react-native";
import Animated from "react-native-reanimated";
import PinchMoveGesture from "./PinchMoveGesture";
import Card, { Cards } from "./Card";
import { View, Text } from "./Themed";

function CardDetail() {
  const reset = useRef<() => void>();
  const [btnEnabled, setBtnEnabled] = useState(false);
  useEffect(() => {
    if (reset.current !== undefined) setBtnEnabled(true);
  }, [reset.current]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        disabled={!btnEnabled}
        onPress={btnEnabled ? reset.current : () => {}}
      >
        <View style={styles.btn}>
          <Text style={styles.btnText}>Reset</Text>
        </View>
      </TouchableOpacity>
      <PinchMoveGesture>
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
      </PinchMoveGesture>
    </View>
  );
}

export default CardDetail;

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

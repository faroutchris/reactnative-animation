import React from "react";
import { Image, StyleSheet } from "react-native";
import Layout from "../constants/Layout";

const ratio = 228 / 362;
export const CARD_WIDTH = Layout.window.width * 0.8;
export const CARD_HEIGHT = CARD_WIDTH * ratio;

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
  },
});

const assets = [
  require("../assets/images/cards/card1.png"),
  require("../assets/images/cards/card2.png"),
  require("../assets/images/cards/card3.png"),
  require("../assets/images/cards/card4.png"),
  require("../assets/images/cards/card5.png"),
  require("../assets/images/cards/card6.png"),
];

export enum Cards {
  Card1 = 0,
  Card2 = 1,
  Card3 = 2,
  Card4 = 3,
  Card5 = 4,
  Card6 = 5,
}

type Props = {
  card: Cards;
};

export default function ({ card }: Props) {
  return <Image source={assets[card]} style={styles.card} />;
}

import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import { FlatList, StyleSheet, View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

type TMenu = {
  id: number;
  name: string;
  route: keyof ReactNavigation.RootParamList;
  emoji: string;
};
const menuData: TMenu[] = [
  { id: 1, name: "Pinch Gesture", route: "PinchGesture", emoji: "🤌" },
  { id: 2, name: "Swipe to dismiss", route: "SwipeDelete", emoji: "💨" },
  { id: 3, name: "Carousel", route: "Carousel", emoji: "🎪" },
];

export default function TabOneScreen() {
  const navigation = useNavigation();
  return (
    <FlatList
      style={styles.wrapper}
      data={menuData}
      renderItem={(item) => Menu(item, navigation)}
      keyExtractor={(item) => item.id.toString()}
    />
  );
}

const Menu = (
  { item }: { item: TMenu },
  navigation: NavigationProp<ReactNavigation.RootParamList>
) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate(item.route)}>
      <View style={styles.menuItem}>
        <Text style={styles.emoji}>{item.emoji}</Text>
        <Text style={styles.name}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#fff",
  },
  menuItem: {
    borderBottomColor: "#ddd",
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 64,
    flexDirection: "row",
    alignItems: "center",
  },
  emoji: {
    fontSize: 32,
    marginHorizontal: 20,
  },
  name: {
    fontSize: 18,
    fontFamily: "inter-regular",
  },
});

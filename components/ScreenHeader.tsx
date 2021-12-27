import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { HeadingText } from "./StyledText";
import { Ionicons } from "@expo/vector-icons";
import { HEADER_HEIGHT } from "../hooks/useLayoutInsets";

export default function ScreenHeader({
  back,
  options,
  navigation,
}: NativeStackHeaderProps) {
  const insets = useSafeAreaInsets();

  const wrapperStyles = [styles.wrapper, { paddingTop: insets.top }];

  return (
    <View style={wrapperStyles}>
      {back ? (
        <Pressable
          onPress={() =>
            navigation.canGoBack()
              ? navigation.goBack()
              : navigation.navigate("Root")
          }
        >
          <View style={styles.leftAction}>
            <Ionicons name="chevron-back" size={20}></Ionicons>
          </View>
        </Pressable>
      ) : null}
      <HeadingText style={styles.title}>{options.title}</HeadingText>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    height: HEADER_HEIGHT,
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "transparent",
    zIndex: 100,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
  },
  leftAction: {
    marginRight: 10,
  },
  rightAction: {},
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

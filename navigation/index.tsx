/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName } from "react-native";
import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import StartScreen from "../screens/StartScreen";
import PinchGestureScreen from "../screens/PinchGestureScreen";
import CarouselScreen from "../screens/CarouselScreen";
import { RootStackParamList } from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import SwipeDeleteScreen from "../screens/SwipeDeleteScreen";
import SwipeToConfirmScreen from "../screens/SwipeToConfirmScreen";
import ScreenHeader from "../components/ScreenHeader";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        options={{ title: "Start" }}
        component={StartScreen}
      />
      <Stack.Screen
        name="PinchGesture"
        component={PinchGestureScreen}
        options={{ title: "Pinch and pan!" }}
      />
      <Stack.Screen
        name="SwipeDelete"
        component={SwipeDeleteScreen}
        options={{ title: "Swipe to delete" }}
      />
      <Stack.Screen
        name="Carousel"
        component={CarouselScreen}
        options={{
          title: "Midcentury.",
          header: (props) => <ScreenHeader {...props} />,
        }}
      />
      <Stack.Screen
        name="SwipeToConfirm"
        component={SwipeToConfirmScreen}
        options={{
          title: "Swipe to confirm",
          header: (props) => <ScreenHeader {...props} />,
        }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

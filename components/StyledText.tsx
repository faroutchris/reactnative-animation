import React from "react";
import { Text, TextProps } from "./Themed";

export function MonoText(props: TextProps) {
  return (
    <Text {...props} style={[props.style, { fontFamily: "space-mono" }]} />
  );
}

export function BodyText(props: TextProps) {
  return (
    <Text {...props} style={[props.style, { fontFamily: "inter-regular" }]} />
  );
}

export function HeadingText(props: TextProps) {
  return (
    <Text {...props} style={[props.style, { fontFamily: "inter-bold" }]} />
  );
}

export function PreambleText(props: TextProps) {
  return (
    <Text {...props} style={[props.style, { fontFamily: "inter-xlight" }]} />
  );
}

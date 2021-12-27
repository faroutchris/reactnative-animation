import { useSafeAreaInsets } from "react-native-safe-area-context";

export const HEADER_HEIGHT = 100;

function useLayoutInset() {
  const safeAreaInsets = useSafeAreaInsets();

  return {
    top: HEADER_HEIGHT,
    bottom: safeAreaInsets.bottom,
  };
}

export default useLayoutInset;

import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface CustomSafeAreaProps {
  children: React.ReactNode;
}

const CustomSafeArea = ({ children }: CustomSafeAreaProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      {children}
    </View>
  );
};

export default CustomSafeArea;

const styles = StyleSheet.create({
  container: {},
});

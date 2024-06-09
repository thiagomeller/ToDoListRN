import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Checkbox } from "react-native-paper";
import Swipeable from "react-native-gesture-handler/Swipeable";

interface ListItemProps {
  text: string;
  isChecked: boolean;
  setIsChecked: () => void;
  deleteFunction: () => void;
}

const ListItem = ({
  isChecked,
  text,
  setIsChecked,
  deleteFunction,
}: ListItemProps) => {
  const renderLeft = () => {
    return (
      <View style={styles.deleteContainer}>
        <Text style={styles.deleteText}>EXCLUIR</Text>
      </View>
    );
  };

  return (
    <Swipeable
      renderLeftActions={renderLeft}
      onSwipeableOpen={() => deleteFunction()}
    >
      <View style={styles.container}>
        <Text style={styles.txt}>{text}</Text>
        <Checkbox
          status={isChecked ? "checked" : "unchecked"}
          onPress={() => {
            setIsChecked();
          }}
        />
      </View>
    </Swipeable>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#ebebeb",
    borderBottomWidth: 1,
    borderBottomColor: "#999",
  },
  txt: {
    flex: 1,
    textAlign: "center",
  },
  deleteContainer: {
    backgroundColor: "red",
    padding: 16,
    alignItems: "center",
  },
  deleteText: {
    color: "white",
    fontWeight: "bold",
  },
});

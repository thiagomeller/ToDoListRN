import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import CustomSafeArea from "../../components/CustomSafeArea";
import { Button, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import openDB from "../../service/sqlfunction";

interface AddItemProps {}

const db = openDB();

const AddItem = (props: AddItemProps) => {
  const navigation = useNavigation();

  const [text, setText] = React.useState("");

  const addItem = (text: string) => {
    db.withTransactionSync(() => {
      db.execSync(`INSERT into 
        ToDoItems (text, checked) VALUES ('${text}', 0);
        `);
    });

    navigation.navigate("ToDoList");
  };

  return (
    <CustomSafeArea>
      <View style={styles.container}>
        <TextInput
          label="O que registrar?"
          onChangeText={(txt) => setText(txt)}
        />
        <Button
          mode="contained"
          onPress={() => {
            addItem(text);
          }}
        >
          Cadastrar
        </Button>
      </View>
    </CustomSafeArea>
  );
};

export default AddItem;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
  },
});

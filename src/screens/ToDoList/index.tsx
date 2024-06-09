import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import CustomSafeArea from "../../components/CustomSafeArea";
import ListItem from "../../components/ListItem";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { Button } from "react-native-paper";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import openDB from "../../service/sqlfunction";

interface ToDoListProps {}

interface ItemListProps {
  id: number;
  text: string;
  checked: number;
}

const db = openDB();

const ToDoList = (props: ToDoListProps) => {
  const navigation = useNavigation();

  const [checked, setChecked] = React.useState(false);
  const [itemsList, setItemsList] = React.useState<ItemListProps[]>([]);

  const getAllItems = async () => {
    const list: ItemListProps[] = db.getAllSync("select * from ToDoItems");
    setItemsList(list);
  };

  const setCheckedItem = (id: number, checked: number) => {
    let newChecked = 0;
    if (checked > 0) {
      newChecked = 0;
    } else newChecked = 1;

    db.withTransactionSync(() => {
      db.execSync(`UPDATE ToDoItems
        SET checked = ${newChecked}
        WHERE id = ${id}`);
    });

    getAllItems();
  };

  const deleteItem = (id: number) => {
    db.withTransactionSync(() => {
      db.execSync(`DELETE FROM ToDoItems
        WHERE id = ${id}`);
    });

    getAllItems();
  };

  useFocusEffect(
    React.useCallback(() => {
      getAllItems();
    }, [])
  );

  return (
    <CustomSafeArea>
      <View>
        <View>
          <Text style={styles.title}>TO DO LIST</Text>
        </View>
        <FlatList
          data={itemsList}
          renderItem={({ item }) => (
            <ListItem
              text={item.text}
              isChecked={item.checked > 0}
              setIsChecked={() => setCheckedItem(item.id, item.checked)}
              deleteFunction={() => deleteItem(item.id)}
            />
          )}
        />

        <View style={styles.button}>
          <Button
            mode="contained"
            onPress={() => {
              console.log("foi");
              navigation.navigate("AddItem");
            }}
          >
            Cadastrar
          </Button>
        </View>
        <Text style={styles.adviceText}>
          Arraste para a direita para excluir
        </Text>
      </View>
    </CustomSafeArea>
  );
};

export default ToDoList;

const styles = StyleSheet.create({
  button: {
    padding: 32,
  },
  title: {
    fontSize: 24,
    backgroundColor: "#611f9e",
    color: "#FFF",
    padding: 16,
    textAlign: "center",
    justifyContent: "center",
    width: "100%",
  },
  adviceText: {
    textAlign: "center",
    color: "#999",
  },
});

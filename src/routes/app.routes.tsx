import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ToDoList from "../screens/ToDoList";
import AddItem from "../screens/AddItem";

interface AppRoutesProps {}

const Stack = createStackNavigator();

const AppRoutes = (props: AppRoutesProps) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ToDoList" component={ToDoList} />
      <Stack.Screen name="AddItem" component={AddItem} />
    </Stack.Navigator>
  );
};

export default AppRoutes;

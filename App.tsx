import { StyleSheet, View } from "react-native";
import AppRoutes from "./src/routes/app.routes";
import { NavigationContainer } from "@react-navigation/native";
import { PaperProvider } from "react-native-paper";
import openDB from "./src/service/sqlfunction";

export default function App() {
  return (
    <NavigationContainer>
      <PaperProvider>
        <View style={{ flex: 1 }}>
          <AppRoutes />
        </View>
      </PaperProvider>
    </NavigationContainer>
  );
}

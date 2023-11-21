import React from "react";
import { Provider } from "react-redux";
import { Store } from "./redux/store";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GlobalStateProvider } from "./screens/coAir/components/ReusableComponents";
import { View, Text, Pressable, ScrollView } from "react-native";
import styles from "./styles/styleApp";
// LES PAGES
import AirPlongeSimple from "./screens/coAir/airPlongeSimple";
import AirPlongeIterative from "./screens/coAir/airPlongeIterative";
import AirRemonteRapide from "./screens/coAir/airRemonteRapide";
import AirVolConsommation from "./screens/coAir/airVolConsommation";
import AirGaz from "./screens/coAir/airGaz";
import Apropos from "./screens/Apropos";
// -----------

const Stack = createNativeStackNavigator();
function Accueil({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      {/* -------------------------- CO AIR -------------------------- */}
      <View style={styles.coAirContainer}>
        <Text style={styles.headerText}>CO - AIR</Text>

        {/* Button grid starts here */}
        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate("AirPlongeSimple")}
          >
            <Text style={styles.buttonText}>PLONGÉ SIMPLE</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.specialButton]}
            onPress={() => navigation.navigate("AirRemonteRapide")}
          >
            <Text style={styles.buttonTextAlert}>REMONTÉ RAPIDE</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate("AirPlongeIterative")}
          >
            <Text style={styles.buttonText}>PLONGÉ ITÉRATIVE</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate("AirGaz")}
          >
            <Text style={styles.buttonText}> PpO² - PpN² - PEA</Text>
          </Pressable>
        </View>
        <View style={{ width: "100%", paddingHorizontal: 10 }}>
          <Pressable
            style={styles.buttonLarge}
            onPress={() => navigation.navigate("AirVolConsommation")}
          >
            <Text style={styles.buttonText}>VOLUME / CONSOMMATION</Text>
          </Pressable>
        </View>
      </View>
      {/* -------------------------- CO NITROX -------------------------- */}
      {/* -------------------------- SCR CRABE -------------------------- */}
      {/* -------------------------- CF OXY - OTU -------------------------- */}

      <Pressable
        style={{
          marginTop: 30,
          marginBottom: 60,
        }}
        onPress={() => navigation.navigate("À propos")}
      >
        <Text style={{ color: "grey", textAlign: "center" }}>À PROPOS</Text>
      </Pressable>
    </ScrollView>
  );
}
const App = () => {
  return (
    <Provider store={Store}>
      <GlobalStateProvider>
        <NavigationContainer theme={DarkTheme}>
          <Stack.Navigator initialRouteName="Accueil">
            <Stack.Screen name="Accueil" component={Accueil} />
            <Stack.Screen
              options={{ title: "PLONGÉ SIMPLE" }}
              name="AirPlongeSimple"
              component={AirPlongeSimple}
            />

            <Stack.Screen
              options={{ title: "REMONTÉ RAPIDE" }}
              name="AirRemonteRapide"
              component={AirRemonteRapide}
            />
            <Stack.Screen
              options={{ title: "PLONGÉ ITÉRATIVE" }}
              name="AirPlongeIterative"
              component={AirPlongeIterative}
            />
            <Stack.Screen
              options={{ title: "PpO² - PpN² - PEA" }}
              name="AirGaz"
              component={AirGaz}
            />
            <Stack.Screen
              options={{ title: "VOLUME / CONSOMMATION" }}
              name="AirVolConsommation"
              component={AirVolConsommation}
            />
            <Stack.Screen
              options={{ title: "PLONGÉ SIMPLE" }}
              name="À propos"
              component={Apropos}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </GlobalStateProvider>
    </Provider>
  );
};

export default App;

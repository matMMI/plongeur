import React from "react";
import { Provider } from "react-redux";
import { Store } from "./redux/store";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GlobalStateProvider } from "./screens/components/ReusableComponents";
import { View, Text, Pressable, ScrollView } from "react-native";
import colors from "./styles/colors";
import styles from "./styles/styleApp";
// LES PAGES
import AirPlongeSimple from "./screens/coAir/airPlongeSimple";
import AirPlongeIterative from "./screens/coAir/airPlongeIterative";
import AirRemonteRapide from "./screens/coAir/airRemonteRapide";
import Apropos from "./screens/Apropos";
import Otu from "./screens/otuCalcul";
import Vol from "./screens/volCalcul";
import Ppo from "./screens/ppoCalcul";
import CrabePpo from "./screens/crabe/ppoCalcul";

// -----------

const Stack = createNativeStackNavigator();
function Accueil({ navigation }) {
  const ButtonText = ({ text, onPress, style }) => (
    <Pressable style={[styles.button, style]} onPress={onPress}>
      <Text numberOfLines={1} ellipsizeMode="tail" style={styles.buttonText}>
        {text}
      </Text>
    </Pressable>
  );

  const ButtonText100 = ({ text, onPress, style }) => (
    <Pressable style={[styles.button, style]} onPress={onPress}>
      <Text numberOfLines={1} ellipsizeMode="tail" style={styles.buttonText}>
        {text}
      </Text>
    </Pressable>
  );
  return (
    <ScrollView style={styles.container}>
      {/* -------------------------- CO AIR -------------------------- */}
      <View
        style={[
          styles.coAirContainer,
          { backgroundColor: colors.blue3, borderColor: colors.blue2 },
        ]}
      >
        <Text style={[styles.headerText, { backgroundColor: colors.blue1 }]}>
          CO - AIR
        </Text>
        <View style={styles.buttonContainer}>
          <ButtonText
            style={{ backgroundColor: colors.blue2 }}
            text="PLONGÉ SIMPLE"
            onPress={() => navigation.navigate("AirPlongeSimple")}
          />
          <ButtonText
            style={{ backgroundColor: colors.blue2 }}
            text="REMONTÉ RAPIDE"
            onPress={() => navigation.navigate("AirRemonteRapide")}
          />
          <ButtonText100
            style={{ backgroundColor: colors.blue2, width: "100%" }}
            text="PLONGÉ ITÉRATIVE"
            onPress={() => navigation.navigate("AirPlongeIterative")}
          />
        </View>
      </View>
      {/* -------------------------- CRABE -------------------------- */}
      <View
        style={[
          styles.coAirContainer,
          { backgroundColor: colors.crabeCol1, borderColor: colors.crabeCol2 },
        ]}
      >
        <Text
          style={[styles.headerText, { backgroundColor: colors.crabeCol3 }]}
        >
          SCR - CRABE
        </Text>
        <View style={styles.buttonContainer}>
          <ButtonText
            style={{ backgroundColor: colors.crabeCol2 }}
            text="PLONGÉ SIMPLE"
            onPress={() => navigation.navigate("AirPlongeSimple")}
          />

          <ButtonText
            style={{ backgroundColor: colors.crabeCol2 }}
            text="REMONTÉ RAPIDE"
            onPress={() => navigation.navigate("AirRemonteRapide")}
          />
          <ButtonText
            style={{ backgroundColor: colors.crabeCol2 }}
            text="PLONGÉ itérative"
            onPress={() => navigation.navigate("AirRemonteRapide")}
          />
          <ButtonText
            style={{ backgroundColor: colors.crabeCol2 }}
            text="PpO² - PpN² - PEA"
            onPress={() => navigation.navigate("CrabePpoCalcul")}
          />
        </View>
      </View>
      {/* -------------------------- PpO² - PpN² - PEA -------------------------- */}
      <View
        style={[
          styles.coAirContainer,
          { backgroundColor: colors.ppoCol1, borderColor: colors.ppoCol2 },
        ]}
      >
        <Text style={[styles.headerText, { backgroundColor: colors.ppoCol3 }]}>
          PpO² - PpN² - PEA
        </Text>
        <View style={{ width: "100%", paddingHorizontal: 10 }}>
          <ButtonText100
            style={{ backgroundColor: colors.ppoCol2, width: "100%" }}
            text="accéder au calculateur"
            onPress={() => navigation.navigate("PpoCalcul")}
          />
        </View>
      </View>
      {/* -------------------------- VOLUME / CONSOMMATION -------------------------- */}
      <View
        style={[
          styles.coAirContainer,
          { backgroundColor: colors.volCol1, borderColor: colors.volCol2 },
        ]}
      >
        <Text style={[styles.headerText, { backgroundColor: colors.volCol3 }]}>
          volume / consommation
        </Text>
        <View style={{ width: "100%", paddingHorizontal: 10 }}>
          <ButtonText100
            style={{ backgroundColor: colors.volCol2, width: "100%" }}
            text="accéder au calculateur"
            onPress={() => navigation.navigate("VolCalculator")}
          />
        </View>
      </View>
      {/* -------------------------- CF OXY - OTU -------------------------- */}
      <View
        style={[
          styles.coAirContainer,
          { backgroundColor: colors.otuCol1, borderColor: colors.otuCol2 },
        ]}
      >
        <Text style={[styles.headerText, { backgroundColor: colors.otuCol3 }]}>
          cf oxy - otu
        </Text>
        <View style={{ width: "100%", paddingHorizontal: 10 }}>
          <ButtonText100
            style={{ backgroundColor: colors.otuCol2, width: "100%" }}
            text="accéder au calculateur"
            onPress={() => navigation.navigate("OtuCalculator")}
          />
        </View>
      </View>
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
              options={{ title: "VOLUME / CONSOMMATION" }}
              name="VolCalculator"
              component={Vol}
            />
            <Stack.Screen
              options={{ title: "PLONGÉ SIMPLE" }}
              name="À propos"
              component={Apropos}
            />
            <Stack.Screen
              options={{ title: "CF OXY - OTU" }}
              name="OtuCalculator"
              component={Otu}
            />
            <Stack.Screen
              options={{ title: "PpO² - PpN² - PEA" }}
              name="PpoCalcul"
              component={Ppo}
            />
            <Stack.Screen
              options={{ title: "CRABE" }}
              name="CrabePpoCalcul"
              component={CrabePpo}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </GlobalStateProvider>
    </Provider>
  );
};

export default App;

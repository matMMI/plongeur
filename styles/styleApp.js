// styleApp.js

import { StyleSheet, Dimensions } from "react-native";
const totalHeight = Dimensions.get("window").height;
import colors from "../styles/colors";

const darkTheme = {
  container: {
    padding: 10,
    height: totalHeight,
    backgroundColor: "#000",
  },
  coAirContainer: {
    backgroundColor: colors.blue3,
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 3,
    borderColor: colors.blue2,
  },
  headerText: {
    paddingVertical: 10,
    marginTop: 20,
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    backgroundColor: colors.blue1,
    width: "100%",
    textAlign: "center",
    marginBottom: 15,
  },
  buttonContainer: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: colors.blue2,
    paddingHorizontal: 10,
    paddingVertical: 15,
    width: "48%",
    marginBottom: 15,
    borderRadius: 7,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
    fontWeight: "bold",
  },
  specialButton: {
    backgroundColor: "#FF5F2C",
  },
  buttonTextAlert: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  buttonLarge: {
    backgroundColor: "white",
    padding: 15,
    marginBottom: 10,
    width: "100%",
    borderRadius: 7,
    backgroundColor: colors.blue2,
  },
};

const styles = StyleSheet.create(darkTheme);

export default styles;

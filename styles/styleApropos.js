import { StyleSheet, Dimensions } from "react-native";

const windowHeight = Dimensions.get("window").height;
const height90vh = windowHeight * 0.8;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    height: height90vh, // Appliquer 90vh ici
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bkg: {
    backgroundColor: "#E8F1FF",
    borderRadius: 7,
    padding: 10,
  },
  space: { textAlign: "center", marginBottom: 15 },
  dev: {
    color: "#c9c9c9",
  },
  contact: {
    color: "#0250EC",
  },
  imageContainer: {
    alignItems: "center",
    width: "90%",
    height: 90, // Ajuste la largeur du conteneur à 100% de l'écran
  },
  image: {
    width: "90%", // Réinitialise la largeur à 'undefined'
    height: 200, // Réinitialise la hauteur à 'undefined'
    resizeMode: "contain", // Ajuste l'image sans déborder
  },
});

export default styles;

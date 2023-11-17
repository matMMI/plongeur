import color from "./colors";
const main = {
  parentContainer: {
    padding: 10,
    backgroundColor: "#000", // Dark background color
  },
  container: {
    paddingTop: 20,
    marginBottom: 40,
    overflow: "hidden",
    borderRadius: 7,
    borderWidth: 3,
    borderColor: color.blue2,
    backgroundColor: color.blue3,
  },

  header: {
    backgroundColor: color.blue1, // Slightly lighter dark background for header
    padding: 15,
    alignItems: "center",
  },

  inputContainer: {
    margin: 10,
    padding: 20,
  },

  inputLabel: {
    color: "#FFFFFF",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 5,
  },
  // ESPACEMENT
  mb_15: {
    marginBottom: 15,
  },
  mb_20: {
    marginBottom: 20,
  },
  mb_30: {
    marginBottom: 30,
  },
};

export default main;

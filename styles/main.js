import color from "./colors";
const main = {
  parentContainer: {
    padding: 10,
    backgroundColor: "#000", // Dark background color
  },
  container: {
    paddingTop: 20,
    marginBottom: 100,
    overflow: "hidden",
    borderRadius: 7,
    borderWidth: 3,
    borderColor: color.greyCol2,
    backgroundColor: color.greyCol1,
  },

  header: {
    backgroundColor: color.greyCol3, // Slightly lighter dark background for header
    padding: 15,
    alignItems: "center",
  },

  inputContainer: {
    marginHorizontal: 10,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  inputContainerResult: {
    marginHorizontal: 10,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  inputLabel: {
    color: "#FFFFFF",
    fontSize: 17,
    textAlign: "center",
    fontWeight: "300",
    marginBottom: 5,
    textTransform: "uppercase",
  },
  // ESPACEMENT
  mb_10: {
    marginBottom: 10,
  },
  mb_15: {
    marginBottom: 15,
  },
  mb_20: {
    marginBottom: 20,
  },
  mb_30: {
    marginBottom: 30,
  },
  my_10: {
    marginVertical: 10,
  },
  my_15: {
    marginVertical: 15,
  },
  my_20: {
    marginVertical: 20,
  },
  my_30: {
    marginVertical: 30,
  },
};

export default main;

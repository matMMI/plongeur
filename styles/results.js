import color from "./colors";

const results = {
  resultParent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  resultTitle: {
    color: "#fff",
    textTransform: "uppercase",
    fontSize: 15,
  },
  tag: {
    color: "#fff",
    borderWidth: 2,
    borderColor: color.green,
    backgroundColor: color.greenDark,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 7,
    overflow: "hidden",
    fontSize: 17,
    letterSpacing: 1,
  },
};

export default results;

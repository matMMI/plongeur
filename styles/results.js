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
  tagContainer: {
    borderWidth: 2,
    borderColor: color.green,
    backgroundColor: color.greenDark,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 7,
    overflow: "hidden",
  },
  tagContainerAlert: {
    borderWidth: 2,
    borderColor: color.redCol2,
    backgroundColor: color.redCol1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 7,
    overflow: "hidden",
  },
  tagText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 17,
    letterSpacing: 1,
  },
};

export default results;

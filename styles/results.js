import color from "./colors";

const results = {
  resultParent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  resultTitle: {
    color: "#fff",
    fontSize: 15,
  },
  tagContainer: {
    borderWidth: 2,
    borderColor: color.green,
    backgroundColor: color.greenDark,
    paddingVertical: 7,
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
    marginBottom: 10,
    borderRadius: 7,
    overflow: "hidden",
  },
  tagContainerWarning: {
    borderWidth: 2,
    borderColor: color.warningCol2,
    backgroundColor: color.warningCol1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 7,
    overflow: "hidden",
  },

  tagText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 15,
    fontWeight: "300",
    letterSpacing: 1,
  },
};

export default results;

import React, { useState, useEffect } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { View, Text } from "react-native";
import { crabe30, crabe40, crabe50, crabe60 } from "./ppoJson";
import RNPickerSelect from "react-native-picker-select";
import input from "../../styles/inputs";
import { DepthInputComponent } from "../components/ReusableComponents";
import colors from "../../styles/colors";
import title from "../../styles/titles";
import result from "../../styles/results";
import main from "../../styles/main";
const CrabePpoCalcul = () => {
  const plchProf = "Insérer une profondeur";
  const [selectedGaz, setSelectedGaz] = useState("");
  const [depth, setDepth] = useState("");
  const [ppO2Min, setPpO2Min] = useState("0");
  const [ppO2Max, setPpO2Max] = useState("0");
  const [ppN2Max, setPpN2Max] = useState("0");
  const [pea, setPea] = useState("0");

  const handleGazChange = (itemValue) => {
    setSelectedGaz(itemValue);
    updatePpoValues();
  };

  const handleDepthInput = (text) => {
    setDepth(text);
    updatePpoValues();
  };

  const calculatePpoMin = () => {
    if (!depth) return null;
    let crabeTable;
    switch (selectedGaz) {
      case "30":
        crabeTable = crabe30;
        break;
      case "40":
        crabeTable = crabe40;
        break;
      case "50":
        crabeTable = crabe50;
        break;
      case "60":
        crabeTable = crabe60;
        break;
      default:
        return;
    }
    const depthEntry = crabeTable.find(
      (entry) => entry.prof === parseInt(depth)
    );
    return depthEntry ? depthEntry.co35 : null;
  };
  const calculatePpoMax = () => {
    if (!depth) return null;
    let crabeTable;
    switch (selectedGaz) {
      case "30":
        crabeTable = crabe30;
        break;
      case "40":
        crabeTable = crabe40;
        break;
      case "50":
        crabeTable = crabe50;
        break;
      case "60":
        crabeTable = crabe60;
        break;
      default:
        return;
    }
    const depthEntry = crabeTable.find(
      (entry) => entry.prof === parseInt(depth)
    );
    return depthEntry ? depthEntry.co55 : null;
  };
  const calculatePEA = () => {
    if (!depth || !selectedGaz) return "N/A";

    let crabeTable;
    switch (selectedGaz) {
      case "30":
        crabeTable = crabe30;
        break;
      case "40":
        crabeTable = crabe40;
        break;
      case "50":
        crabeTable = crabe50;
        break;
      case "60":
        crabeTable = crabe60;
        break;
      default:
        return "N/A";
    }
    const depthValue = parseInt(depth, 10);
    const depthEntry = crabeTable.find((entry) => entry.prof === depthValue);
    return depthEntry && depthEntry.pea !== "" ? `${depthEntry.pea} m` : "N/A";
  };

  const calculatePpN2Max = () => {
    if (!depth || !ppO2Max) return null;
    const depthValue = parseFloat(depth);
    const ppO2MaxValue = parseFloat(ppO2Max);
    const ppN2MaxValue = depthValue / 10 + 1 - ppO2MaxValue;
    return ppN2MaxValue.toFixed(2);
  };

  const updatePpoValues = () => {
    const ppoMin = calculatePpoMin();
    const ppoMax = calculatePpoMax();
    const n2Max = calculatePpN2Max();
    const peaValue = calculatePEA();
    setPpO2Min(ppoMin);
    setPpO2Max(ppoMax);
    setPpN2Max(n2Max);
    setPea(peaValue);
  };

  useEffect(() => {
    if (selectedGaz && depth != null) {
      const ppoMin = calculatePpoMin();
      const ppoMax = calculatePpoMax();
      const n2Max = calculatePpN2Max();
      const peaValue = calculatePEA();
      setPpO2Min(ppoMin);
      setPpO2Max(ppoMax);
      setPpN2Max(n2Max);
      setPea(peaValue);
    }
  }, [selectedGaz, depth, ppO2Max]);

  return (
    <KeyboardAwareScrollView style={main.parentContainer}>
      <View
        style={[
          main.container,
          { backgroundColor: colors.greyCol1, borderColor: colors.greyCol2 },
        ]}
      >
        <View style={[main.header, { backgroundColor: colors.greyCol3 }]}>
          <Text style={[title.headerText, { color: colors.col1 }]}>
            CRABE • PpO²-PpN²-PEA
          </Text>
        </View>
        <View style={[main.inputContainer, { paddingTop: 30 }]}>
          <View style={main.mb_15}>
            <View style={title.subTitle}>
              <Text style={main.inputLabel}>Gaz Crabe</Text>
              <Text style={main.inputLabel}></Text>
            </View>
            <RNPickerSelect
              onValueChange={handleGazChange}
              items={[
                { label: "30 %", value: "30" },
                { label: "40 %", value: "40" },
                { label: "50 %", value: "50" },
                { label: "60 %", value: "60" },
              ]}
              style={{
                inputIOS: {
                  ...input.inputCoAir,
                  borderColor: colors.greyCol2,
                },
                inputAndroid: {
                  ...input.inputCoAir,
                  borderColor: colors.greyCol2,
                },
              }}
              value={selectedGaz}
              useNativeAndroidPickerStyle={false}
              placeholder={{
                label: "Gaz CRABE",
                value: null,
                color: "grey",
              }}
            />
          </View>
          <View style={title.subTitle}>
            <Text style={main.inputLabel}>Profondeur</Text>
            <Text style={main.inputLabel}>mètres</Text>
          </View>
          <DepthInputComponent
            onDepthChange={handleDepthInput}
            style={{ borderColor: colors.greyCol2 }}
            placeholder={plchProf}
          />
        </View>
        <View style={main.inputContainerResult}>
          <View style={title.subTitle}>
            <Text style={main.inputLabel}>PpO² (Bar):</Text>
          </View>
          <View style={main.mb_10}></View>
          <View style={[result.resultParent]}>
            <View style={result.tagContainer}>
              <Text style={result.tagText}>
                PpO² min : {ppO2Max !== null ? `${ppO2Max}` : "N/A"}
              </Text>
            </View>
            <View style={result.tagContainer}>
              <Text style={result.tagText}>
                PpO² max: {ppO2Min !== null ? `${ppO2Min}` : "N/A"}
              </Text>
            </View>
          </View>
        </View>
        {ppO2Max > 1.6 && (
          <View style={main.inputContainerResult}>
            <View style={result.tagContainerAlert}>
              <Text style={result.tagText}>PpO² Haute</Text>
            </View>
          </View>
        )}

        {ppN2Max > 3.5 && (
          <View style={main.inputContainerResult}>
            <View style={result.tagContainerAlert}>
              <Text style={result.tagText}>Domaine narcotique</Text>
            </View>
          </View>
        )}
        <View style={main.inputContainerResult}>
          <View style={[result.resultParent]}>
            <Text style={[result.resultTitle, { color: colors.green }]}>
              PpN² max :
            </Text>
            <View style={result.tagContainer}>
              <Text style={result.tagText}>
                <Text style={result.tagText}>
                  {ppN2Max !== null ? `${ppN2Max} bar` : "N/A"}
                </Text>
              </Text>
            </View>
          </View>
        </View>
        <View style={main.inputContainerResult}>
          <View style={[result.resultParent]}>
            <Text style={[result.resultTitle, { color: colors.green }]}>
              PEA :
            </Text>
            <View style={result.tagContainer}>
              <Text style={result.tagText}>{pea !== "N/A" ? pea : "N/A"}</Text>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};
export default CrabePpoCalcul;

import React, { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { View, Text } from "react-native";
import {
  MinutesInputComponent,
  DepthInputComponent,
} from "./components/ReusableComponents";
import colors from "../styles/colors";
import title from "../styles/titles";
import result from "../styles/results";
import main from "../styles/main";
const OtuCalculator = () => {
  const [depth, setDepth] = useState("");
  const [time, setTime] = useState("");
  const [previousDoses, setPreviousDoses] = useState("");
  const handleDepthChange = (newDepth) => {
    setDepth(parseInt(newDepth, 10));
  };
  const handleTimeChange = (newTime) => {
    setTime(parseInt(newTime, 10));
  };
  const handlePreviousDosesChange = (newDoses) => {
    setPreviousDoses(parseInt(newDoses, 10));
  };
  const calculateOTU = () => {
    return Math.ceil(time * Math.pow((depth / 10 + 1 - 0.5) / 0.5, 0.83));
  };
  const totalOTU = calculateOTU() + previousDoses;
  const getLimitExceededMessages = () => {
    const messages = [];
    if (totalOTU > 2300) {
      messages.push("Limite 120h dépassée");
    }
    if (totalOTU > 2100) {
      messages.push("Limite 96h dépassée");
    }
    if (totalOTU > 1860) {
      messages.push("Limite 72h dépassée");
    }
    if (totalOTU > 1400) {
      messages.push("Limite 48h dépassée");
    }
    if (totalOTU > 850) {
      messages.push("Limite 24h dépassée");
    }
    return messages;
  };

  const plchProf = "Insérer une profondeur";
  const plchMin = "Insérer un temps";
  const plchDose = "Insérer une dose";
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
            CF OXY - OTU
          </Text>
        </View>
        <View style={[main.inputContainer, { paddingTop: 30 }]}>
          <View style={main.mb_15}>
            <View style={title.subTitle}>
              <Text style={main.inputLabel}>profondeur</Text>
              <Text style={main.inputLabel}>(mètres)</Text>
            </View>
            <DepthInputComponent
              style={{ borderColor: colors.greyCol2 }}
              onDepthChange={handleDepthChange}
              placeholder={plchProf}
            />
          </View>
          <View style={title.subTitle}>
            <Text style={main.inputLabel}>temps</Text>
            <Text style={main.inputLabel}>(minutes)</Text>
          </View>
          <MinutesInputComponent
            style={{ borderColor: colors.greyCol2 }}
            onMinutesChange={handleTimeChange}
            placeholder={plchMin}
          />
        </View>
        <View style={main.inputContainerResult}>
          <View style={[result.resultParent]}>
            <Text style={[result.resultTitle, { color: colors.green }]}>
              OTU :
            </Text>
            <View style={result.tagContainer}>
              <Text style={result.tagText}>{calculateOTU()}</Text>
            </View>
          </View>
        </View>
        <View style={main.inputContainer}>
          <View style={main.mb_15}>
            <View style={title.subTitle}>
              <Text style={main.inputLabel}>doses précédentes</Text>
              <Text style={main.inputLabel}>(otu)</Text>
            </View>
            <DepthInputComponent
              style={{ borderColor: colors.greyCol2 }}
              onDepthChange={handlePreviousDosesChange}
              placeholder={plchDose}
            />
          </View>
        </View>
        <View style={main.inputContainerResult}>
          <View style={[result.resultParent]}>
            <Text style={[result.resultTitle, { color: colors.green }]}>
              TOTAL :
            </Text>
            <View style={result.tagContainer}>
              <Text style={result.tagText}>{Math.ceil(totalOTU)} OTU</Text>
            </View>
          </View>
        </View>
        <View style={main.inputContainerResult}>
          {getLimitExceededMessages().map((message, index) => (
            <View key={index} style={result.tagContainerAlert}>
              <Text style={result.tagText}>{message}</Text>
            </View>
          ))}
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};
export default OtuCalculator;

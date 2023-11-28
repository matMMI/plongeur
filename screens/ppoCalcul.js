import React, { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { View, Text } from "react-native";
import {
  OxyInputComponent,
  DepthInputComponent,
} from "./coAir/components/ReusableComponents";
import colors from "../styles/colors";
import title from "../styles/titles";
import result from "../styles/results";
import main from "../styles/main";
const PpoCalcul = () => {
  const [profondeur, setProfondeur] = useState("");
  const [teneurOxy, setTeneurOxy] = useState("");
  const handleDepthChange = (newDepth) => {
    setProfondeur(parseFloat(newDepth));
  };
  const handleOxyChange = (newOxy) => {
    setTeneurOxy(parseFloat(newOxy));
  };
  const calculerPpo = () => {
    if (!profondeur || !teneurOxy) return { ppo2: 0, ppn2: 0, pea: 0 };
    const pressionAmbiante = profondeur / 10 + 1;
    const ppo2 = pressionAmbiante * (teneurOxy / 100);
    const n2 = 100 - teneurOxy;
    const ppn2 = pressionAmbiante * (n2 / 100);
    const pea = (profondeur + 10) * (n2 / 79) - 10;
    return { ppo2, ppn2, pea };
  };
  const { ppo2, ppn2, pea } = calculerPpo();
  const plchProf = "Insérer une profondeur";
  const plchOxy = "Teneur en oxygène";
  return (
    <KeyboardAwareScrollView style={main.parentContainer}>
      <View
        style={[
          main.container,
          { backgroundColor: colors.greyCol1, borderColor: colors.greyCol2 },
        ]}
      >
        <View style={[main.header, { backgroundColor: colors.greyCol2 }]}>
          <Text style={[title.headerText, { color: colors.col1 }]}>
            PpO² - PpN² - PEA
          </Text>
        </View>
        <View style={[main.inputContainer, { paddingTop: 30 }]}>
          <View style={main.mb_15}>
            <View style={title.subTitle}>
              <Text style={main.inputLabel}>profondeur</Text>
              <Text style={main.inputLabel}>mètres</Text>
            </View>
            <DepthInputComponent
              style={{ borderColor: colors.greyCol2 }}
              onDepthChange={handleDepthChange}
              placeholder={plchProf}
            />
          </View>
          <View style={title.subTitle}>
            <Text style={main.inputLabel}>TENEUR EN OXYGÈNE</Text>
            <Text style={main.inputLabel}>%</Text>
          </View>
          <OxyInputComponent
            style={{ borderColor: colors.greyCol2 }}
            onOxyChange={handleOxyChange}
            placeholder={plchOxy}
          />
        </View>
        <View style={main.inputContainerResult}>
          <View style={[result.resultParent]}>
            <Text style={[result.resultTitle, { color: colors.green }]}>
              PpO² :
            </Text>
            <View style={result.tagContainer}>
              <Text style={result.tagText}>{ppo2.toFixed(2)} BAR</Text>
            </View>
          </View>
        </View>
        {ppo2 > 1.6 && (
          <View style={main.inputContainerResult}>
            {/* Bloc "PpO² Haute" */}
            <View style={result.tagContainerWarning}>
              <Text style={result.tagText}>PpO² Haute</Text>
            </View>
          </View>
        )}
        <View style={main.inputContainerResult}>
          <View style={[result.resultParent]}>
            <Text style={[result.resultTitle, { color: colors.green }]}>
              PpN² :
            </Text>
            <View style={result.tagContainer}>
              <Text style={result.tagText}>{ppn2.toFixed(2)} BAR</Text>
            </View>
          </View>
        </View>
        {ppn2 > 3.5 && (
          <View style={main.inputContainerResult}>
            {/* Bloc "Domaine narcotique" */}
            <View style={result.tagContainerWarning}>
              <Text style={result.tagText}>Domaine narcotique</Text>
            </View>
          </View>
        )}

        <View style={main.inputContainerResult}>
          <View style={[result.resultParent]}>
            <Text style={[result.resultTitle, { color: colors.green }]}>
              PEA :
            </Text>
            <View style={result.tagContainer}>
              <Text style={result.tagText}>{pea.toFixed(2)}</Text>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};
export default PpoCalcul;

import React, { useState, useRef } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { View, Text, Pressable } from "react-native";
import styles from "../../styles/buttons";
import RNPickerSelect from "react-native-picker-select";
import input from "../../styles/inputs";

import { OxyInputComponent } from "../components/ReusableComponents";
import colors from "../../styles/colors";
import title from "../../styles/titles";
import result from "../../styles/results";
import main from "../../styles/main";
const CrabePpoCalcul = () => {
  const plchOxy = "Teneur en oxygène";
  const plchProf = "Insérer une profondeur";
  const [selectedGaz, setSelectedGaz] = useState("30");
  const [showPicker, setShowPicker] = useState(false); // Ajout de l'état pour le Picker
  const pickerRef = useRef();
  const openPicker = () => {
    // Vérifier si la méthode togglePicker existe et l'appeler, sinon utiliser focus()
    if (pickerRef.current && pickerRef.current.togglePicker) {
      pickerRef.current.togglePicker(true);
    } else {
      pickerRef.current.focus();
    }
  };
  const handleDepthChange = (itemValue) => {
    setSelectedGaz(itemValue);
    setShowPicker(false); // Cache le Picker après la sélection
  };
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
              onValueChange={handleDepthChange}
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
                label: "Choisir la profondeur",
                value: null,
                color: "blue", // La couleur de votre texte "placeholder"
              }}
            />
          </View>
          <View style={title.subTitle}>
            <Text style={main.inputLabel}>Profondeur</Text>
            <Text style={main.inputLabel}>mètres</Text>
          </View>
          <OxyInputComponent
            style={{ borderColor: colors.greyCol2 }}
            // onOxyChange={handleOxyChange}
            placeholder={plchOxy}
          />
        </View>
        <View style={main.inputContainerResult}>
          <View style={[result.resultParent]}>
            <Text style={[result.resultTitle, { color: colors.green }]}>
              PpO² min :
            </Text>
            <View style={result.tagContainer}>
              <Text style={result.tagText}>12 bar</Text>
            </View>
          </View>
        </View>

        <View style={main.inputContainerResult}>
          <View style={result.tagContainerWarning}>
            <Text style={result.tagText}>PpO² Haute</Text>
          </View>
        </View>

        <View style={main.inputContainerResult}>
          <View style={[result.resultParent]}>
            <Text style={[result.resultTitle, { color: colors.green }]}>
              PpO² max:
            </Text>
            <View style={result.tagContainer}>
              <Text style={result.tagText}>12 bar</Text>
            </View>
          </View>
        </View>

        <View style={main.inputContainerResult}>
          <View style={result.tagContainerWarning}>
            <Text style={result.tagText}>Domaine narcotique</Text>
          </View>
        </View>

        <View style={main.inputContainerResult}>
          <View style={[result.resultParent]}>
            <Text style={[result.resultTitle, { color: colors.green }]}>
              PpN² max :
            </Text>
            <View style={result.tagContainer}>
              <Text style={result.tagText}>12 bar</Text>
            </View>
          </View>
        </View>
        <View style={main.inputContainerResult}>
          <View style={[result.resultParent]}>
            <Text style={[result.resultTitle, { color: colors.green }]}>
              PEA :
            </Text>
            <View style={result.tagContainer}>
              <Text style={result.tagText}>12 m</Text>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};
export default CrabePpoCalcul;

import React, { useState } from "react";
import { View, Text } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  DatePickerComponent,
  MinutesInputComponent,
  DepthInputComponent,
} from "./components/ReusableComponents";

// --- STYLES --- //
import title from "../../styles/titles";
import result from "../../styles/results";
import main from "../../styles/main";
// ------------- //

const AirPlongeSimple = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [time, setTime] = useState("");
  const handleDateChange = (selectedDate) => {
    const currentTime = selectedDate || new Date();
    setTime(
      currentTime.toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
      })
    ); // Format de l'heure selon votre besoin
    setStartDate(currentTime); // Si vous souhaitez également mettre à jour la date de départ
  };
  return (
    <KeyboardAwareScrollView style={main.parentContainer}>
      <View style={main.container}>
        <View style={main.header}>
          <Text style={title.headerText}>PLONGÉ SIMPLE</Text>
        </View>
        <View style={main.inputContainer}>
          <View style={main.mb_30}>
            <Text style={[main.inputLabel, main.mb_20]}>DÉPART SURFACE</Text>
            <Text style={[main.inputLabel, main.mb_20]}>{time}</Text>
            <DatePickerComponent onDateChange={handleDateChange} />
          </View>
          <View style={main.mb_15}>
            <View style={title.subTitle}>
              <Text style={main.inputLabel}>DURÉE DE TRAVAIL</Text>
              <Text style={main.inputLabel}>(MINUTES)</Text>
            </View>
            <MinutesInputComponent />
          </View>
          <View style={title.subTitle}>
            <Text style={main.inputLabel}>PROFONDEUR</Text>
            <Text style={main.inputLabel}>(MÈTRES)</Text>
          </View>
          <DepthInputComponent />
        </View>
        <View style={main.header}>
          <Text style={title.headerText}>PALIERS</Text>
        </View>
        <View style={main.inputContainer}>
          <View style={[result.resultParent, main.mb_15]}>
            <Text style={result.resultTitle}>@6m</Text>
            <Text style={result.tag}>3</Text>
          </View>
          <View style={[result.resultParent, main.mb_15]}>
            <Text style={result.resultTitle}>@3m</Text>
            <Text style={result.tag}>29</Text>
          </View>
          <View style={[result.resultParent, main.mb_15]}>
            <Text style={result.resultTitle}>HEURE DE SORTIE</Text>
            <Text style={result.tag}>19:11</Text>
          </View>
          <View style={result.resultParent}>
            <Text style={result.resultTitle}>GROUPE PLONGÉ SUCCESSIF</Text>
            <Text style={result.tag}>K</Text>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};
export default AirPlongeSimple;

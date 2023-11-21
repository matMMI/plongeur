import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { useGlobalState } from "./components/ReusableComponents";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { pdtmille } from "../../utils/pdtmille";
import {
  DatePickerComponent,
  MinutesInputComponent,
  DepthInputComponent,
} from "./components/ReusableComponents";
import { formaterHeureLocale } from "../../utils/calculs";
// --- STYLES --- //
import title from "../../styles/titles";
import result from "../../styles/results";
import main from "../../styles/main";
const AirPlongeSimple = () => {
  console.log("Depth received:", depth);
  const { date, minutes, depth } = useGlobalState();
  const [heureSortie, setHeureSortie] = useState(new Date());
  const [time, setTime] = useState("00:00");
  const handleDateChange = (selectedDate) => {
    const currentTime = selectedDate || new Date();
    setTime(
      currentTime.toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
  };

  function calculerHeureSortie(ds, dt, depth) {
    const dataForDepth = pdtmille.find(
      (data) => data.profondeurDtMill <= parseFloat(depth)
    );

    // Vérifiez si dataForDepth est défini
    if (!dataForDepth) {
      // Lancez une erreur ou retournez une valeur par défaut
      console.log(`Aucune donnée trouvée pour la profondeur : ${depth}`);
      return;
    }

    const dtMs = dt * 60 * 1000;
    const palierTimesMs = Object.keys(dataForDepth)
      .filter(
        (key) =>
          key.endsWith("m") &&
          dataForDepth[key] !== "Hors table" &&
          dataForDepth[key] !== ""
      )
      .map((key) => parseInt(dataForDepth[key]) * 60 * 1000);
    const sumPaliersMs = palierTimesMs.reduce((acc, time) => acc + time, 0);
    const hs = new Date(ds.getTime() + dtMs + sumPaliersMs);
    return hs;
  }
  useEffect(() => {
    const dt = parseFloat(minutes);
    const hs = calculerHeureSortie(date, dt, depth);
    setHeureSortie(hs);
  }, [date, minutes, depth]);
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
            <Text style={result.resultTitle}>@9m</Text>
            <View style={result.tagContainer}>
              <Text style={result.tagText}>3</Text>
            </View>
          </View>
          <View style={[result.resultParent, main.mb_15]}>
            <Text style={result.resultTitle}>@6m</Text>
            <View style={result.tagContainer}>
              <Text style={result.tagText}>29</Text>
            </View>
          </View>
          <View style={[result.resultParent, main.mb_15]}>
            <Text style={result.resultTitle}>@3m</Text>
            <View style={result.tagContainer}>
              <Text style={result.tagText}>29</Text>
            </View>
          </View>
          <View style={[result.resultParent, main.mb_15]}>
            <Text style={result.resultTitle}>HEURE DE SORTIE</Text>
            <View style={result.tagContainer}>
              <Text style={result.tagText}>
                {heureSortie && formaterHeureLocale(heureSortie)}
              </Text>
            </View>
          </View>
          <View style={result.resultParent}>
            <Text style={result.resultTitle}>GROUPE PLONGÉ SUCCESSIF</Text>
            <View style={result.tagContainer}>
              <Text style={result.tagText}>K</Text>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};
export default AirPlongeSimple;

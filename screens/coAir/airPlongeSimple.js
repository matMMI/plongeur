import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { useGlobalState } from "./components/ReusableComponents";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import gpsTarArray from "../../utils/gpsTar.js";
import profondeurDtMille from "../../utils/profondeurDtMille.js";
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
//------ Ajout de la nouvelle fonction de calcul de l'heure de sortie ------//
function calculerHeureSortie(departPlongee, tempsFond, tempsPaliers) {
  const tempsFondMs = tempsFond * 60 * 1000;
  const tempsPaliersMs =
    tempsPaliers.reduce((acc, val) => acc + val, 0) * 60 * 1000;
  const I3Ms = 1 * 60 * 60 * 1000;
  const I8Ms = 30 * 60 * 1000;
  const I9Ms = I8Ms + I3Ms + tempsPaliersMs;
  const B6 = new Date(departPlongee.getTime() + tempsFondMs);
  const HS = new Date(B6.getTime() + I9Ms);
  return HS;
}
// ------------- //
const AirPlongeSimple = () => {
  const { date, minutes, depth } = useGlobalState();
  const [time, setTime] = useState("00:00");
  const [ds, setDs] = useState(new Date());
  const [dt, setDt] = useState(0);
  const [pal, setPal] = useState([]);
  const [heureSortie, setHeureSortie] = useState(new Date());
  const handleDateChange = (selectedDate) => {
    const currentTime = selectedDate || new Date();
    setTime(
      currentTime.toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
  };
  useEffect(() => {
    const dt = parseFloat(minutes);
    const hs = calculerHeureSortie(date, dt);
    setHeureSortie(hs);
  }, [date, minutes]);
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
                {formaterHeureLocale(heureSortie)}
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

import React, { useState, useEffect } from "react";
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
  const [time, setTime] = useState("00:00");
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
  const [ds, setDs] = useState(new Date()); // DS: Départ Surface
  const [dt, setDt] = useState(0); // DT: Durée de Travail
  const [dr, setDr] = useState(0); // DR: Durée de Remontée
  const [pal, setPal] = useState([]); // PAL: Paliers (Array de durées pour chaque palier)
  const [chPal, setChPal] = useState([]); // ch/PAL: Changements de Palier (Array de durées)
  // Calculer le départ fond (DF)
  const calculerDF = () => {
    const df = new Date(ds.getTime() + dt * 60000); // 60000 ms dans une minute
    return df;
  };
  // Calculer la durée totale de remontée (DTR)
  const calculerDTR = () => {
    const totalPaliers = pal.reduce((acc, curr) => acc + curr, 0); // Somme des durées de paliers
    const totalChPal = chPal.reduce((acc, curr) => acc + curr, 0); // Somme des changements de palier
    const dtr = dr + totalPaliers + totalChPal;
    return dtr;
  };
  // Calculer l'heure de sortie (HS)
  const calculerHS = () => {
    const df = calculerDF();
    const dtr = calculerDTR();
    const hs = new Date(df.getTime() + dtr * 60000); // Convertir en millisecondes
    return hs;
  };

  const [departFond, setDepartFond] = useState(new Date());
  const [dureeTotalRemontee, setDureeTotalRemontee] = useState(0);
  const [heureSortie, setHeureSortie] = useState(new Date());

  useEffect(() => {
    const df = calculerDF();
    setDepartFond(df);

    const dtr = calculerDTR();
    setDureeTotalRemontee(dtr);

    const hs = calculerHS();
    setHeureSortie(hs);
  }, [ds, dt, dr, pal, chPal]);
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
            <View style={result.tagContainer}>
              <Text style={result.tagText}>3</Text>
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
                {heureSortie.toLocaleTimeString("fr-FR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
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

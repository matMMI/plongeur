import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { pdt } from "../../utils/pdt";
import { pdtmille } from "../../utils/pdtmille";
import { profSecPlonge } from "../../utils/profondeurSecondePlonge";
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
const AirPlongeSimple = () => {
  const handleDurationChange = (newDuration) => {
    setWorkDuration(parseInt(newDuration, 10));
  };

  const handleDepthChange = (newDepth) => {
    setDepth(parseInt(newDepth, 10));
  };
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
  const [departureTime, setDepartureTime] = useState(new Date());
  const [workDuration, setWorkDuration] = useState(0);
  const [depth, setDepth] = useState(0);
  const [exitTime, setExitTime] = useState("");
  const findPdtmilleEntry = (P_DT) => {
    return pdtmille.find((entry) => entry.profondeurDtMill === P_DT);
  };
  const calculateExitTime = () => {
    const DTInDays = workDuration / 1440;
    const P_DT = depth + DTInDays;
    const pdtmilleEntry = findPdtmilleEntry(P_DT);
    const ch_pal =
      (["15m", "12m", "9m", "6m", "3m"].reduce((count, palier) => {
        return pdtmilleEntry && pdtmilleEntry[palier] ? count + 1 : count;
      }, 0) *
        (30 / 60)) /
      24;
    const DR = Math.ceil(
      ["15m", "12m", "9m", "6m", "3m"]
        .map((palier, index) =>
          pdtmilleEntry && pdtmilleEntry[palier] >= 1
            ? (depth - index * 3) / 12
            : 0
        )
        .reduce((max, time) => Math.max(max, time), 0)
    );
    const sumOfPalierTimes =
      ["15m", "12m", "9m", "6m", "3m"].reduce(
        (sum, palier) => sum + ((pdtmilleEntry && pdtmilleEntry[palier]) || 0),
        0
      ) / 24;
    const DTRInDays = ch_pal + DR + sumOfPalierTimes;
    const exitDateTime = new Date(
      departureTime.getTime() + (DTInDays + DTRInDays) * 86400000
    );
    const exitTimeFormatted = exitDateTime.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });
    setExitTime(exitTimeFormatted);
  };
  useEffect(() => {
    calculateExitTime();
  }, [departureTime, workDuration, depth]);
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
            <MinutesInputComponent onMinutesChange={handleDurationChange} />
          </View>
          <View style={title.subTitle}>
            <Text style={main.inputLabel}>PROFONDEUR</Text>
            <Text style={main.inputLabel}>(MÈTRES)</Text>
          </View>
          <DepthInputComponent onDepthChange={handleDepthChange} />
        </View>
        <View style={main.header}>
          <Text style={title.headerText}>PALIERS</Text>
        </View>
        <View style={main.inputContainer}>
          <View style={[result.resultParent, main.mb_15]}>
            <Text style={result.resultTitle}>HEURE DE SORTIE</Text>
            <View style={result.tagContainer}>
              <Text style={result.tagText}>
                {exitTime}
                {/* résultat heure de sortie (HS) */}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};
export default AirPlongeSimple;

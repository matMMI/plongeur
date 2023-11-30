import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { pdt } from "../../utils/pdt";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  DatePickerComponent,
  MinutesInputComponent,
  DepthInputComponent,
} from "../components/ReusableComponents";
import title from "../../styles/titles";
import result from "../../styles/results";
import main from "../../styles/main";
import colors from "../../styles/colors";
const AirPlongeSimple = () => {
  const [workDuration, setWorkDuration] = useState(0);
  const [depth, setDepth] = useState(0);
  const [gps, setGps] = useState("");
  const [stages, setStages] = useState({
    "3m": "",
    "6m": "",
    "9m": "",
    "12m": "",
  });
  const findClosestPdtEntry = (profondeur, DT) => {
    let matchingEntries = pdt
      .filter((entry) => entry.Profondeur >= profondeur)
      .sort((a, b) => {
        if (a.Profondeur === b.Profondeur) {
          return a.DT - b.DT;
        }
        return a.Profondeur - b.Profondeur;
      });
    let closestEntry = matchingEntries.find((entry) => entry.DT >= DT);
    return closestEntry || matchingEntries[0];
  };
  const calculateGPS = (depth, DT) => {
    const closestPdtEntry = findClosestPdtEntry(depth, DT);
    return closestPdtEntry ? closestPdtEntry.GPS : "";
  };
  const handleDurationChange = (newDuration) => {
    setWorkDuration(parseInt(newDuration, 10));
  };
  const handleDepthChange = (newDepth) => {
    setDepth(parseInt(newDepth, 10));
  };
  const [time, setTime] = useState("18:00");
  const [departureTime, setDepartureTime] = useState(() => {
    const initialTime = new Date();
    const [hours, minutes] = "18:00".split(":").map(Number);
    initialTime.setHours(hours, minutes, 0, 0);
    return initialTime;
  });
  const handleDateChange = (selectedDate) => {
    const newTime = selectedDate || new Date();
    setTime(
      newTime.toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
    setDepartureTime(newTime);
  };
  useEffect(() => {
    setGps(calculateGPS(depth, workDuration));
  }, [depth, workDuration]);
  useEffect(() => {
    const closestPdtEntry = findClosestPdtEntry(depth, workDuration);
    if (closestPdtEntry) {
      setGps(closestPdtEntry.GPS);
      setStages({
        "3m": closestPdtEntry["3m"] || "-",
        "6m": closestPdtEntry["6m"] || "-",
        "9m": closestPdtEntry["9m"] || "-",
        "12m": closestPdtEntry["12m"] || "-",
      });
    } else {
      setGps("");
      setStages({ "3m": "", "6m": "", "9m": "", "12m": "" });
    }
  }, [depth, workDuration]);
  return (
    <KeyboardAwareScrollView style={main.parentContainer}>
      <View style={main.container}>
        <View style={main.header}>
          <Text style={title.headerText}>PLONGÉE SIMPLE</Text>
        </View>
        <View style={[main.inputContainer, { paddingTop: 30 }]}>
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
            <MinutesInputComponent
              onMinutesChange={handleDurationChange}
              workDuration={workDuration}
              style={{ borderColor: colors.greyCol2 }}
            />
          </View>
          <View style={title.subTitle}>
            <Text style={main.inputLabel}>PROFONDEUR</Text>
            <Text style={main.inputLabel}>(MÈTRES)</Text>
          </View>
          <DepthInputComponent
            onDepthChange={handleDepthChange}
            depth={depth}
            style={{ borderColor: colors.greyCol2 }}
          />
        </View>
        <View style={main.header}>
          <Text style={title.headerText}>GPS</Text>
        </View>
        <View style={[main.inputContainer, { marginTop: 20 }]}>
          {/* Affichage des paliers si la valeur n'est pas vide */}
          {Object.keys(stages).map((key) => {
            const value = stages[key];
            return (
              value &&
              !isNaN(value) && (
                <View
                  key={key}
                  style={[result.resultParent, { marginBottom: 15 }]}
                >
                  <Text style={result.resultTitle}>{key}</Text>
                  <View style={result.tagContainer}>
                    <Text style={result.tagText}>{value}</Text>
                  </View>
                </View>
              )
            );
          })}
          <View style={result.resultParent}>
            <Text style={result.resultTitle}>Groupe de plongée successif</Text>
            <View style={result.tagContainer}>
              <Text style={result.tagText}>{gps}</Text>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default AirPlongeSimple;

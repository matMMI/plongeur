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
  const [time, setTime] = useState("18:00");
  const [stages, setStages] = useState({
    "3m": "",
    "6m": "",
    "9m": "",
    "12m": "",
  });
  const [departureTime, setDepartureTime] = useState(() => {
    const initialTime = new Date();
    const [hours, minutes] = "18:00".split(":").map(Number);
    initialTime.setHours(hours, minutes, 0, 0);
    return initialTime;
  });
  const updateStages = (depth, workDuration) => {
    const matchingEntry = pdt.find(
      (entry) => entry.Profondeur === depth && entry.DT === workDuration
    );
    if (matchingEntry) {
      setStages({
        "3m": matchingEntry["3m"] || "0",
        "6m": matchingEntry["6m"] || "0",
        "9m": matchingEntry["9m"] || "0",
        "12m": matchingEntry["12m"] || "0",
      });
    }
  };
  const calculateGPS = (depth, DT) =>
    pdt.find((entry) => entry.Profondeur >= depth && entry.DT >= DT)?.GPS || "";
  const handleDurationChange = (newDuration) => {
    setWorkDuration(parseInt(newDuration, 10));
  };
  const handleDepthChange = (newDepth) => {
    setDepth(parseInt(newDepth, 10));
  };
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
  const calculateDR = (depth, stages) => {
    const stageDepths = Object.keys(stages)
      .map((k) => parseInt(k, 10))
      .filter((k) => stages[`${k}m`] > 0);
    let DR = 0;
    if (stageDepths.length > 0) {
      const closestStageDepth = Math.max(...stageDepths);
      DR = Math.ceil((depth - closestStageDepth) / 12);
    }
    return DR;
  };
  const calculateChPAL = (stages) =>
    Object.values(stages).filter((time) => parseInt(time) > 0).length * 0.5;
  const calculateDTR = (depth, stages) => {
    const DR = calculateDR(depth, stages);
    const PAL = Object.values(stages).reduce(
      (sum, time) => sum + (parseInt(time, 10) || 0),
      0
    );
    const ChPAL = calculateChPAL(stages);
    return DR + PAL + ChPAL;
  };
  const calculateExitTime = () => {
    const DTR = calculateDTR(depth, stages);
    const exitTime = new Date(
      departureTime.getTime() + (DTR + workDuration) * 60000
    );
    return exitTime.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  useEffect(() => {
    updateStages(depth, workDuration);
    setGps(calculateGPS(depth, workDuration));
  }, [depth, workDuration]);
  useEffect(() => {
    const newGPS = calculateGPS(depth, workDuration);
    setGps(newGPS);
    if (newGPS) {
      const newStages = { "3m": "", "6m": "", "9m": "", "12m": "" };
      pdt.forEach((entry) => {
        if (entry.Profondeur === depth && entry.DT === workDuration) {
          Object.keys(stages).forEach((k) => {
            newStages[k] = entry[k] || "-";
          });
        }
      });
      setStages(newStages);
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
            <Text style={result.resultTitle}>
              Groupe de plongées successives
            </Text>
            <View style={result.tagContainer}>
              <Text style={result.tagText}>{gps}</Text>
            </View>
          </View>
          <View style={main.mb_15}></View>
          <View style={result.resultParent}>
            <Text style={result.resultTitle}>Heure de sortie</Text>
            <View
              style={{
                borderWidth: 2,
                borderColor: colors.blueAlertCol2,
                backgroundColor: colors.blueAlertCol1,
                paddingVertical: 7,
                paddingHorizontal: 10,
                borderRadius: 7,
                overflow: "hidden",
              }}
            >
              <Text style={result.tagText}>{calculateExitTime()}</Text>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};
export default AirPlongeSimple;

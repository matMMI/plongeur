import React, { useState, createContext, useContext, useEffect } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TextInput, TouchableOpacity, Text } from "react-native";
//------------ STYLE ------------//
import input from "../../styles/inputs";
import button from "../../styles/buttons";
//-------------------------------//
const GlobalStateContext = createContext();
export const useGlobalState = () => useContext(GlobalStateContext);
export const GlobalStateProvider = ({ children }) => {
  const [date, setDate] = useState(new Date());
  const [minutes, setMinutes] = useState("");
  const [depth, setDepth] = useState("");
  return (
    <GlobalStateContext.Provider
      value={{ date, setDate, minutes, setMinutes, depth, setDepth }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

//------- TRAITEMENT -------//
const convertInput = (value) => {
  let normalized = value
    .replace(",", ".")
    .replace(";", ".")
    .replace("-", ".")
    .replace(" ", ".")
    .replace(/^[0]+([1-9])/, "$1")
    .replace(/^-/, "");
  if (/^\./.test(normalized)) {
    normalized = "0" + normalized;
  }
  return normalized;
};

// DateTimePicker components
export const DatePickerComponent = ({ onDateChange }) => {
  const [showPicker, setShowPicker] = useState(false);
  const handlePress = () => {
    setShowPicker(true);
  };
  const handleChange = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) {
      onDateChange(selectedDate);
    }
  };
  return (
    <>
      {showPicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date()}
          mode={"time"}
          display="default"
          onChange={handleChange}
          is24Hour={true}
        />
      )}
      <TouchableOpacity style={button.button} onPress={handlePress}>
        <Text style={button.buttonText}>Choisir une heure</Text>
      </TouchableOpacity>
    </>
  );
};

// Input TEMPS saisie
export const MinutesInputComponent = ({
  onMinutesChange,
  workDuration = "",
  style,
  placeholder,
}) => {
  const { setMinutes } = useGlobalState();
  const [localMinutes, setLocalMinutes] = useState(String(workDuration));
  useEffect(() => {
    setLocalMinutes(String(workDuration));
  }, [workDuration]);
  const handleMinutesChange = (text) => {
    const normalizedText = convertInput(text);
    setLocalMinutes(normalizedText);
    const value = normalizedText === "" ? 0 : parseInt(normalizedText, 10);
    onMinutesChange(value);
  };
  return (
    <TextInput
      style={[input.inputCoAir, style]}
      value={localMinutes}
      keyboardType="numeric"
      onChangeText={handleMinutesChange}
      placeholder={placeholder}
    />
  );
};

// OXY
export const OxyInputComponent = ({
  onOxyChange,
  oxy = "",
  style,
  placeholder,
}) => {
  const { setDepth } = useGlobalState();
  const [localDepth, setLocalDepth] = useState(oxy);
  useEffect(() => {
    setLocalDepth(oxy);
  }, [oxy]);
  const handleDepthChange = (text) => {
    const normalizedText = convertInput(text);
    setLocalDepth(normalizedText);
    const value = normalizedText === "" ? 0 : parseInt(normalizedText, 10);
    onOxyChange(value);
  };
  return (
    <TextInput
      style={[input.inputCoAir, style]}
      value={String(localDepth)}
      keyboardType="numeric"
      onChangeText={handleDepthChange}
      placeholder={placeholder}
    />
  );
};
// Picker components
export const PickerInputComponent = ({
  style,
  onValueChange,
  value,
  placeholder,
}) => {
  const [inputValue, setInputValue] = useState(value);
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleValueChange = (newDepth) => {
    setInputValue(newDepth);
    if (onValueChange) {
      onValueChange(newDepth);
    }
  };
  return (
    <TextInput
      style={[input.inputCoAir, style]}
      onChangeText={handleValueChange}
      value={inputValue}
      placeholder={placeholder}
    />
  );
};

// Profondeur
export const DepthInputComponent = ({
  onDepthChange,
  depth = "",
  style,
  placeholder,
}) => {
  const { setDepth } = useGlobalState();
  const [localDepth, setLocalDepth] = useState(depth);
  useEffect(() => {
    setLocalDepth(depth);
  }, [depth]);
  const handleDepthChange = (text) => {
    const normalizedText = convertInput(text);
    setLocalDepth(normalizedText);
    const value = normalizedText === "" ? 0 : parseInt(normalizedText, 10);
    onDepthChange(value);
  };
  return (
    <TextInput
      style={[input.inputCoAir, style]}
      value={String(localDepth)}
      keyboardType="numeric"
      onChangeText={handleDepthChange}
      placeholder={placeholder}
    />
  );
};

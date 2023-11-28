import React, { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { View, Text } from "react-native";
import { DepthInputComponent } from "./components/ReusableComponents";
import colors from "../styles/colors";
import title from "../styles/titles";
import result from "../styles/results";
import main from "../styles/main";

const VolCalculator = () => {
  const [volumeBouteille, setVolumeBouteille] = useState(0);
  const [pressionInitiale, setPressionInitiale] = useState(0);
  const [profondeur, setProfondeur] = useState(0);
  const [ventilation, setVentilation] = useState(0);
  const handleVolumeChange = (newVolume) => {
    setVolumeBouteille(parseFloat(newVolume));
  };

  const handlePressionChange = (newPression) => {
    setPressionInitiale(parseFloat(newPression));
  };

  const handleProfondeurChange = (newProfondeur) => {
    setProfondeur(parseInt(newProfondeur, 10));
  };

  const handleVentilationChange = (newVentilation) => {
    setVentilation(parseFloat(newVentilation));
  };
  const calculateAutonomy = () => {
    if (
      volumeBouteille === 0 ||
      pressionInitiale === 0 ||
      ventilation === 0 ||
      isNaN(volumeBouteille) ||
      isNaN(pressionInitiale) ||
      isNaN(ventilation)
    ) {
      return 0; // Retourne 0 si une des valeurs est non définie ou non numérique
    }
    const pression = profondeur / 10 + 1;
    const volumeAP =
      (volumeBouteille * pressionInitiale) / pression - volumeBouteille;
    const autonomieEstimee = Math.floor(volumeAP / ventilation);
    return autonomieEstimee;
  };
  const plchProf = "0";

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
            Volume / Consommation
          </Text>
          <Text style={[title.headerSubText, { color: colors.col1 }]}>
            Autonomie circuit ouvert
          </Text>
        </View>
        <View style={[main.inputContainer, { paddingTop: 30 }]}>
          <View style={title.subTitle}>
            <Text style={main.inputLabel}>volume bouteille :</Text>
            <Text style={main.inputLabel}>(Litres)</Text>
          </View>
          <DepthInputComponent
            style={{ borderColor: colors.greyCol2 }}
            onDepthChange={handleVolumeChange}
            placeholder={plchProf}
          />
          <View style={main.mb_20}></View>
          <View style={title.subTitle}>
            <Text style={main.inputLabel}>Pression initiale :</Text>
            <Text style={main.inputLabel}>(bars)</Text>
          </View>
          <DepthInputComponent
            style={{ borderColor: colors.greyCol2 }}
            onDepthChange={handlePressionChange}
            placeholder={plchProf}
          />
          <View style={main.mb_20}></View>
          <View style={title.subTitle}>
            <Text style={main.inputLabel}>Profondeur :</Text>
            <Text style={main.inputLabel}>(mètres)</Text>
          </View>
          <DepthInputComponent
            style={{ borderColor: colors.greyCol2 }}
            onDepthChange={handleProfondeurChange}
            placeholder={plchProf}
          />
          <View style={main.mb_20}></View>

          <View style={title.subTitle}>
            <Text style={main.inputLabel}>ventilation :</Text>
            <Text style={main.inputLabel}>(L/Min)</Text>
          </View>
          <DepthInputComponent
            style={{ borderColor: colors.greyCol2 }}
            onDepthChange={handleVentilationChange}
            placeholder={plchProf}
          />
        </View>
        <View style={main.inputContainerResult}>
          <View style={[result.resultParent]}>
            <Text style={[result.resultTitle, { color: colors.green }]}>
              autonomie estimée à P :
            </Text>
            <View style={result.tagContainer}>
              <Text style={result.tagText}>{calculateAutonomy()} min</Text>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default VolCalculator;

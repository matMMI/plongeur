import React from "react";
import { View, Text, SafeAreaView, ScrollView, Image } from "react-native";
import styles from "../styles/styleApropos";
import fanlab from "../assets/img/fanlab.png";

const Apropos = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.imageContainer}>
          <Image source={fanlab} style={styles.image} />
        </View>
        <View>
          <Text style={[{ textTransform: "uppercase" }, styles.space]}>
            Application développée au FANLab
          </Text>
          <View style={styles.bkg}>
            <Text style={styles.contact}>
              alfan-fanlab-toulon.accueil.fct@intradef.gouv.fr
            </Text>
          </View>
        </View>

        <View>
          <Text style={styles.dev}>Développée par Mathis T.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Apropos;

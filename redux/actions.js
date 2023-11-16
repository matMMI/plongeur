export const SET_PDC = "SET_PDC";
export const SET_K = "SET_K";
export const SET_TAILLE_ECHELLE_CARTE = "SET_TAILLE_ECHELLE_CARTE";
export const SET_TAILLE_MESUREE = "SET_TAILLE_MESUREE";
export const SET_TAILLE_REELLE = "SET_TAILLE_REELLE";
export const SET_TAILLE_CARTE = "SET_TAILLE_CARTE";
export const SET_NB_TIRS = "SET_NB_TIRS";
export const SET_NB_PULSE_PAR_TIR = "SET_NB_PULSE_PAR_TIR";
export const SET_DISTANCE_PASSAGE_PAX = "SET_DISTANCE_PASSAGE_PAX";
export const SET_GPS_POSITION = "SET_GPS_POSITION";
export const SET_CIRCLE_RADIUS = "SET_CIRCLE_RADIUS";
export const setPdC = (PdC) => (dispatch) => {
  dispatch({
    type: SET_PDC,
    payload: PdC,
  });
};
export const setK = (K) => (dispatch) => {
  dispatch({
    type: SET_K,
    payload: K,
  });
};
export const setTailleEchelleCarte = (tailleEchelleCarte) => (dispatch) => {
  dispatch({
    type: SET_TAILLE_ECHELLE_CARTE,
    payload: tailleEchelleCarte,
  });
};
export const setTailleMesuree = (tailleMesuree) => (dispatch) => {
  dispatch({
    type: SET_TAILLE_MESUREE,
    payload: tailleMesuree,
  });
};
export const setTailleReelle = (tailleReelle) => (dispatch) => {
  dispatch({
    type: SET_TAILLE_REELLE,
    payload: tailleReelle,
  });
};
export const setTailleCarte = (tailleCarte) => (dispatch) => {
  dispatch({
    type: SET_TAILLE_CARTE,
    payload: tailleCarte,
  });
};
export const setNbTirs = (nbTirs) => (dispatch) => {
  dispatch({
    type: SET_NB_TIRS,
    payload: nbTirs,
  });
};
export const setNbPulseParTir = (nbPulseParTir) => (dispatch) => {
  dispatch({
    type: SET_NB_PULSE_PAR_TIR,
    payload: nbPulseParTir,
  });
};
export const setDistancePassagePax = (distancePassagePax) => (dispatch) => {
  dispatch({
    type: SET_DISTANCE_PASSAGE_PAX,
    payload: distancePassagePax,
  });
};

export function setCircleRadius(circleRadius) {
  return {
    type: SET_CIRCLE_RADIUS,
    payload: circleRadius,
  };
}

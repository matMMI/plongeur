import {
  SET_PDC,
  SET_K,
  SET_TAILLE_ECHELLE_CARTE,
  SET_TAILLE_MESUREE,
  SET_TAILLE_REELLE,
  SET_TAILLE_CARTE,
  SET_NB_TIRS,
  SET_NB_PULSE_PAR_TIR,
  SET_DISTANCE_PASSAGE_PAX,
  SET_CIRCLE_RADIUS,
} from "./actions";

const initialState = {
  PdC: 80,
  K: 0.5,
  tailleEchelleCarte: 100,
  tailleMesuree: 5,
  tailleReelle: 8.6,
  tailleCarte: 2.5,
  nbTirs: 1,
  nbPulseParTir: 50,
  distancePassagePax: 2.68,
  circleRadius: "",
};

function crReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PDC:
      return {
        ...state,
        PdC: action.payload,
      };
    case SET_K:
      return {
        ...state,
        K: action.payload,
      };
    case SET_TAILLE_ECHELLE_CARTE:
      return {
        ...state,
        tailleEchelleCarte: action.payload,
      };
    case SET_TAILLE_MESUREE:
      return {
        ...state,
        tailleMesuree: action.payload,
      };
    case SET_TAILLE_REELLE:
      return {
        ...state,
        tailleReelle: action.payload,
      };
    case SET_TAILLE_CARTE:
      return {
        ...state,
        tailleCarte: action.payload,
      };
    case SET_NB_TIRS:
      return {
        ...state,
        nbTirs: action.payload,
      };
    case SET_NB_PULSE_PAR_TIR:
      return {
        ...state,
        nbPulseParTir: action.payload,
      };
    case SET_DISTANCE_PASSAGE_PAX:
      return {
        ...state,
        distancePassagePax: action.payload,
      };

    case SET_CIRCLE_RADIUS:
      return {
        ...state,
        circleRadius: action.payload,
      };
    default:
      return state;
  }
}

export default crReducer;

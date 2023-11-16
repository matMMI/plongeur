// Calculs de rayons
export function rayon1(PdC) {
  return Math.sqrt(PdC) * 5;
}
export function rayon2(PdC) {
  return Math.sqrt(PdC) * 10;
}
export function rayon3(PdC) {
  return PdC <= 80 ? 20 * Math.sqrt(PdC) : 50 * Math.sqrt(PdC);
}
export const ongletCalculDeRayon = [
  { func: rayon1, color: "green" },
  { func: rayon2, color: "orange" },
  { func: rayon3, color: "red" },
];

// Rayons Carte
export function displayTailleCarte(
  tailleReelle,
  tailleMesuree,
  tailleEchelleCarte
) {
  return (tailleReelle * tailleMesuree) / tailleEchelleCarte;
}

import AsyncStorage from "@react-native-async-storage/async-storage";

export const loadFromStorage = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (error) {
    console.error(`Error loading ${key} from storage:`, error);
  }
  return null;
};

import AsyncStorage from "@react-native-async-storage/async-storage";

export const STORAGE_KEYS = {
  USER: "@prf/user",
  USERS_LIST: "@prf/users_list",
  POSTS: "@prf/posts",
  COMMENTS: "@prf/comments",
  STUDY_PROGRESS: "@prf/study_progress",
  SIMULADO_RESULTS: "@prf/simulado_results",
  SCHEDULE: "@prf/schedule",
  NOTIFICATIONS: "@prf/notifications",
  COMMUNITY_POSTS: "@prf/community_posts",
};

export async function storeData<T>(key: string, value: T): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("Error storing data:", e);
  }
}

export async function getData<T>(key: string): Promise<T | null> {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : null;
  } catch (e) {
    console.error("Error getting data:", e);
    return null;
  }
}

export async function removeData(key: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error("Error removing data:", e);
  }
}

export async function mergeData<T extends object>(
  key: string,
  value: Partial<T>
): Promise<void> {
  try {
    await AsyncStorage.mergeItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("Error merging data:", e);
  }
}

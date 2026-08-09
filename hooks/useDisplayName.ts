import { useCallback, useEffect, useState } from "react";
import { getData, storeData, STORAGE_KEYS } from "@/lib/storage";

/**
 * Local-only display name for this device. There are no accounts —
 * this is just a label the person sets once so screens like Início
 * can greet them by name. Nothing is sent anywhere.
 */
export function useDisplayName() {
  const [displayName, setDisplayNameState] = useState<string>("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getData<string>(STORAGE_KEYS.DISPLAY_NAME).then((value) => {
      if (value) setDisplayNameState(value);
      setLoaded(true);
    });
  }, []);

  const setDisplayName = useCallback(async (value: string) => {
    const trimmed = value.trim();
    setDisplayNameState(trimmed);
    await storeData(STORAGE_KEYS.DISPLAY_NAME, trimmed);
  }, []);

  return { displayName, setDisplayName, loaded };
}

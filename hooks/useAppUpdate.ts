import { useCallback, useEffect, useState } from "react";
import { Linking } from "react-native";
import Constants from "expo-constants";
import {
  compareVersions,
  fetchRemoteVersionInfo,
  type RemoteVersionInfo,
} from "@/lib/updates";

const CURRENT_VERSION =
  (Constants.expoConfig?.version as string | undefined) ?? "1.0.0";

export function useAppUpdate() {
  const [info, setInfo] = useState<RemoteVersionInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetchRemoteVersionInfo().then((result) => {
      if (!cancelled) {
        setInfo(result);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const updateAvailable =
    !!info && compareVersions(info.versaoMaisRecente, CURRENT_VERSION) > 0;

  const openUpdate = useCallback(() => {
    if (info?.linkApk) {
      Linking.openURL(info.linkApk);
    }
  }, [info]);

  return {
    currentVersion: CURRENT_VERSION,
    info,
    loading,
    updateAvailable,
    openUpdate,
  };
}

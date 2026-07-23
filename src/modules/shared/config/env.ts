import { Platform } from 'react-native';
import Constants from 'expo-constants';

function hostFromExpo(): string | null {
  const hostUri =
    Constants.expoConfig?.hostUri ??
    Constants.expoGoConfig?.debuggerHost ??
    Constants.manifest2?.extra?.expoClient?.hostUri;

  if (!hostUri || typeof hostUri !== 'string') return null;

  const host = hostUri.split(':')[0]?.trim();
  if (!host || host === 'localhost' || host === '127.0.0.1') return null;
  return host;
}

function defaultApiUrl(): string {
  const expoHost = hostFromExpo();
  if (expoHost) {
    return `http://${expoHost}:8000/api`;
  }

  // Android emulator reaches the host machine via 10.0.2.2
  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:8000/api';
  }

  return 'http://localhost:8000/api';
}

const configured = process.env.EXPO_PUBLIC_API_URL?.trim();

/**
 * Prefer EXPO_PUBLIC_API_URL.
 * Fallback: same LAN host Expo Go uses for Metro (good for physical devices).
 *
 * Physical devices cannot use localhost. Example:
 * EXPO_PUBLIC_API_URL=http://192.168.1.2:8000/api
 */
export const env = {
  apiUrl: configured && configured.length > 0 ? configured : defaultApiUrl(),
};

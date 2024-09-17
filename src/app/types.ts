export interface DeviceOrientationInside360 extends DeviceOrientationEvent {
  requestPermission?: () => Promise<string>;
}
export async function getCurrentLanguage(): Promise<string> {
  try {
    const language = navigator.language.startsWith("es") ? "es" : "en";
    return language;
  } catch (error) {
    return "es";
  }
}

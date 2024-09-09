export interface DeviceOrientationInside360 extends DeviceOrientationEvent {
  requestPermission?: () => Promise<string>;
}

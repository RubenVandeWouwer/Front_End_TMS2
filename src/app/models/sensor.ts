export interface Sensor {
  id: number;
  siteId: number;
  date: Date;
  sensorValue: number;
  isDefective: Boolean;
  sensorLogs?: number;
}

export interface Sensor {
  id: number;
  name: string;
  siteId: number;
  date: Date;
  sensorValue?: number;
  isDefective: Boolean;
  sensorLogs?: number;
}

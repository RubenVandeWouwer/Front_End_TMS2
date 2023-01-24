export interface SensorLogs {
  id: number;
  sensorId: number;
  date: Date;
  sensorValueId: number;
  error: string;
  isDefective: Boolean;
}

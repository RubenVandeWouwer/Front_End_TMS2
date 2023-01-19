import {SensorValues} from "./sensorValues";

export interface Sensor {
  id: number;
  name: string;
  siteId: number;
  date: Date;
  sensorValues?: SensorValues[];
  isDefective: Boolean;
  sensorLogs?: number;
}

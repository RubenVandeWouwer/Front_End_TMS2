import {SensorValues} from "./sensorValues";
import {Pump} from "./pump";
import {OldPump} from "./oldPump";
import { SensorLogs } from "./sensorLogs";

export interface Sensor {
  id: number;
  name: string;
  siteId: any;
  // date: Date;
  sensorValues: SensorValues[];
  isDefective: Boolean;
  sensorLogs: SensorLogs[];
  pumps: Pump[];
  oldPumps: OldPump[];
  siteChange: boolean;
  siteDelete: boolean;
  user: string;
}

import { Pump } from "./pump";
import { Sensor } from "./sensor";

export interface Site {
  id: number;
  name: string;
  address: string;
  siteManager: string;
  siteManagerNbr: string;
  drainageDepth: number;
  sensorDepth: number;
  sensors: Sensor[];
  pumps: Pump[];
}

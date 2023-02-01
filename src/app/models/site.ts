import {Pump} from "./pump";
import {Sensor} from "./sensor";
import {OldPump} from "./oldPump";

export interface Site {
  id: number;
  name: string;
  address: string;
  siteManager: string;
  siteManagerNbr: string;
  email: string;
  drainageDepth: number;
  sensorDepth: number;
  sensors: Sensor[];
}

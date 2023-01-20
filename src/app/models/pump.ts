import {PumpValues} from "./pumpValues";

export interface Pump {
  id: number;
  name: String;
  siteId?: any;
  inputValue: number;
  pumpValues: PumpValues[];
  isDefective: Boolean;
  pumpLogs?: number;
}



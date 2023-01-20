import {PumpValues} from "./pumpValues";

export interface Pump {
  id: number;
  name: string;
  siteId?: any;
  inputValue: number;
  pumpValues: PumpValues[];
  isDefective: Boolean;
  pumpLogs?: number;
}



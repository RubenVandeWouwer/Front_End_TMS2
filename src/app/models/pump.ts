import { PumpValues } from "./pumpValues";

export interface Pump {
  id: number;
  name: String
  siteId: number;
  inputValue: number;
  pumpValues: PumpValues[];
  outputValue: number;
  flowRate: number;
  date: Date;
  isDefective: Boolean;
  pumplogs?: number;
}



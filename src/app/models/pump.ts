import { pumpValues } from "./pumpValues";

export interface Pump {
  id: number;
  name: String
  siteId: number;
  inputValue: number;
  pumpValues: pumpValues[];
  outputValue: number;
  flowRate: number;
  date: Date;
  isDefective: Boolean;
  pumplogs?: number;
}



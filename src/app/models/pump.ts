import {PumpLog} from "./pumplogs";
import {PumpValues} from "./pumpValues";

export interface Pump {
  id: number;
  name: string;
  sensorId: any;
  inputValue: number;
  pumpValues: PumpValues[];
  isDefective: Boolean;
  pumpLogs: PumpLog[];
  isUserInput: boolean;
}



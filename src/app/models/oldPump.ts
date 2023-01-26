import {OldPumpValues} from "./oldPumpValues";
import { PumpLog } from "./pumplogs";

export interface OldPump {
  id: number;
  name: string;
  sensorId?: any;
  inputValue: Boolean;
  oldPumpValues: OldPumpValues[];
  isDefective: Boolean;
  pumpLogs: PumpLog[];
  isUserInput: Boolean;
}



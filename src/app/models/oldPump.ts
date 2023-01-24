import {OldPumpValues} from "./oldPumpValues";

export interface OldPump {
  id: number;
  name: string;
  sensorId?: any;
  inputValue: Boolean;
  oldPumpValues: OldPumpValues[];
  isDefective: Boolean;
  pumpLogs?: number;
}



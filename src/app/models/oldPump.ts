import {OldPumpValues} from "./oldPumpValues";

export interface OldPump {
  id: number;
  name: String;
  siteId?: any;
  inputValue: number;
  oldPumpValues: OldPumpValues[];
  isDefective: Boolean;
  pumpLogs?: number;
}



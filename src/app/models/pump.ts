export interface Pump {
  id: number;
  siteId: number;
  inputValue: number;
  outputValue: number;
  flowRate: number;
  date: Date;
  isDefective: Boolean;
  pumplogs?: number;
}



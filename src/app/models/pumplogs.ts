export interface PumpLog {
  id: number;
  pumpId: number;
  userId: number;
  date: Date;
  error: string;
  pumpValueId: number;
  isDefective: Boolean;
}

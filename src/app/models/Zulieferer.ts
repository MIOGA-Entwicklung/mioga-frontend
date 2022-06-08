import {Connection} from "./Connection";
import {Contacts} from "./Contacts";

export interface Zulieferer {
  id: number; // Liferant ID
  title: string; // Name of the Company or Name
  connectionId: number;
  description: string; //
  belongsTo : string
  uuid: string;
  updatedAt: string;
  successAt: string;
  timetableId: number;
  username: string;
  password: string;
  key: string;
  contacts : Contacts[]
  connection: Connection[]
}

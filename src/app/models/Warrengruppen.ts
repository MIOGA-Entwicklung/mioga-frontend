import {Category} from "./Category";

export interface warenGruppe{
  id: string
  name: string
  zuliefererId: string,
  createdAt: string,
  updatedAt: string,
  children : Category[]
}

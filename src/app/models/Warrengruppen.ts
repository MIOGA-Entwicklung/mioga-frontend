import {Category} from "./Category";

export interface Warrengruppe{
  id: string
  name: string
  zuliefererId: string,
  createdAt: string,
  updatedAt: string,
  categories : Category[]
}

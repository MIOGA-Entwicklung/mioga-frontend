import {Category} from "./Category";

export interface Warrengruppe{
  id: string
  name: string
  zuliefererId: number
  status:boolean
  createdAt: string
  updatedAt: string
  categories : Category[]
}

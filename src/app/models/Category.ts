import {ChildOne} from "./ChildOne";

export interface Category{
  id: string
  name: string
  connectionId: number,
  type: string
  childCount : number
  level:number
  createdAt: string,
  updatedAt: string,
  children?: Category []
}

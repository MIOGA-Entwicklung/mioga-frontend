import {ChildTwo} from "./ChildTwo";

export interface ChildOne{
  id: string
  name: string
  connectionId: string,
  type: string
  childCount : number
  level:number
  createdAt: string,
  updatedAt: string,
  categoryId?:string
  children?: ChildTwo[]
}

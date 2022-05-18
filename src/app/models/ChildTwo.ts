import {ChildThree} from "./ChildThree";

export interface ChildTwo{
  id: string
  name: string
  connectionId: string,
  type: string
  childCount : number
  level:number
  createdAt: string,
  updatedAt: string,
  childOneId?:string ,
  children?: ChildThree[]
}

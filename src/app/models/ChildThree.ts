import {ChildFour} from "./ChildFour";

export interface ChildThree{
  id: string
  name: string
  connectionId: string,
  type: string
  childCount : number
  level:number
  createdAt: string,
  updatedAt: string,
  childTwoId?:string
  children?: ChildFour[]
}

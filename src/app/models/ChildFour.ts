import {ChildTwo} from "./ChildTwo";
import {ChildFive} from "./ChildFive";

export interface ChildFour{
  id: string
  name: string
  connectionId: string,
  type: string
  childCount : number
  level:number
  createdAt: string,
  updatedAt: string,
  childThreeId?:string
  children?: ChildFive[]
}

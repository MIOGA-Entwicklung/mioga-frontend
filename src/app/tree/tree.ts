import {Category} from "./warrengruppe";

export interface Tree {
  "id": string,
  "name": string,
  "connectionId": number,
  "type": string,
  "childCount": number,
  "mainCategoryId": string,
  "level": number,
  "createdAt": string,
  "updatedAt": string,
  "warenGruppeId": string
}

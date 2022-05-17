export interface Category {
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
  subCategories: [
    {
      "id": string,
      "name": string,
      "connectionId": number,
      "type": string,
      "childCount": number,
      "mainCategoryId": string,
      "level": number,
      "createdAt": string,
      "updatedAt": string,
      "categoryId": string
      subCategories: [
        {
          "id": string,
          "name": string,
          "connectionId": number,
          "type": string,
          "childCount": number,
          "mainCategoryId": string,
          "level": number,
          "createdAt": string,
          "updatedAt": string,
          "childTwoId": string

          subCategories: [{
            "id": string,
            "name": string,
            "connectionId": number,
            "type": string,
            "childCount": number,
            "mainCategoryId": string,
            "level": number,
            "createdAt": string,
            "updatedAt": string,
            "childThreeId": string

            subCategories: [{
              "id": string,
              "name": string,
              "connectionId": number,
              "type": string,
              "childCount": number,
              "mainCategoryId": string,
              "level": number,
              "createdAt": string,
              "updatedAt": string,
              "childFourId": string
              subCategories: [
                {
                  "id": string,
                  "name": string,
                  "connectionId": number,
                  "type": string,
                  "mainCategoryId": string,
                  "level": number,
                  "createdAt": string,
                  "updatedAt": string,
                  "childFiveId": string
                }
              ]
            }]
          }]
        }
      ]
    }
  ],

}

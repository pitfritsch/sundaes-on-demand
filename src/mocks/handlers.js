import { rest } from 'msw'

const serverUrl = 'http://localhost:3030'

export const handlers = [
  rest.get(`${serverUrl}/scoops`, (req, res, ctx) => {
    return res(
      ctx.json([
        { name: 'Chocolate', imagePath: '/images/chocolate.png' },
        { name: 'Vanilla', imagePath: '/images/vanilla.png' },
      ])
    )
  }),
  rest.get(`${serverUrl}/toppings`, (req, res, ctx) => {
    return res(
      ctx.json([
        {
          name: "M&Ms",
          imagePath: "/images/m-and-ms.png"
        },
        {
          name: "Hot fudge",
          imagePath: "/images/hot-fudge.png"
        },
        {
          name: "Peanut butter cups",
          imagePath: "/images/peanut-butter-cups.png"
        }
      ])
    )
  })
]
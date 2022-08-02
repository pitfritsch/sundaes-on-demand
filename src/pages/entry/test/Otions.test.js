import { render, screen } from "@testing-library/react"
import Options from "../Options"

describe('Testing scoop options',  () => {
  test('display images for each scoop from server', async () => {
    render(<Options optionType={'scoops'} />)

    const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i })
    expect(scoopImages).toHaveLength(2)

    const altTexts = scoopImages.map(image => image.alt)
    expect(altTexts).toEqual(['Chocolate scoop', 'Vanilla scoop'])
  })
})

describe('Testing topping options',  () => {
  test('display images for each topping option', async () => {
    render(<Options optionType={'toppings'} />)

    const toppingImages = await screen.findAllByRole('img', { name: /topping$/i })
    expect(toppingImages).toHaveLength(3)

    const texts = toppingImages.map(img => img.alt)
    expect(texts).toEqual(['M&Ms topping', 'Hot fudge topping', 'Peanut butter cups topping'])
  })
})
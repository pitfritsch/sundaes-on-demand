import { render, screen } from "@testing-library/react"
import Options from "../Options"

describe('Testing sundae options',  () => {
  test('display images for each scoop from server', async () => {
    render(<Options optionType={'scoops'} />)

    const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i })
    expect(scoopImages).toHaveLength(2)

    const altTexts = scoopImages.map(image => image.alt)
    expect(altTexts).toEqual(['Chocolate scoop', 'Vanilla scoop'])
  })
})
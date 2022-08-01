import { render, screen } from "@testing-library/react"
import Options from "../Options"

describe('Testing sundae options', () => {
  test('display images for each scoop from server', () => {
    render(<Options optionType={'scoops'} />)

    const scoopImages = screen.getAllByRole('img', { name: /scoop$/i })
    expect(scoopImages).toHaveLength(2)

    const altTexts = scoopImages.map(image => image.alt)
    expect(altTexts).toEqual(['Chocolate scoop', 'Vanilla scoop'])
  })
})
import { render, screen, fireEvent, waitForElementToBeRemoved } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import SummaryForm from '../SummaryForm'

const checkboxLabel = 'I agree to Terms and Conditions'
const buttonLabel = 'Confirm order'

describe('Testing the Summary Form', () => {
  test('Initial page state', () => {
    render(<SummaryForm/>)
    
    const checkbox = screen.getByRole('checkbox', { name: checkboxLabel })
    const button = screen.getByRole('button', { name: buttonLabel })

    expect(checkbox).not.toBeChecked()
    expect(button).toBeDisabled()
  })
  
  test('Button must be enabled if the checkbox is checked', () => {
    render(<SummaryForm/>)

    const checkbox = screen.getByRole('checkbox', { name: checkboxLabel })
    const button = screen.getByRole('button', { name: buttonLabel})

    fireEvent.click(checkbox)

    expect(button).toBeEnabled()
  })

  test('Button must disable after uncheck the checkbox', () => {
    render(<SummaryForm/>)

    const checkbox = screen.getByRole('checkbox', { name: checkboxLabel })
    const button = screen.getByRole('button', { name: buttonLabel })

    fireEvent.click(checkbox)
    fireEvent.click(checkbox)

    expect(button).toBeDisabled()
  })

  test('Popover responses', async () => {
    const popoverRegex = /no ice cream will actually be delivered/i
    render(<SummaryForm/>)

    const nullPopover = screen.queryByText(popoverRegex)
    expect(nullPopover).not.toBeInTheDocument()

    const termsAndConditions = screen.getByText(/terms and conditions/i)
    userEvent.hover(termsAndConditions)

    const popover = screen.getByText(popoverRegex)
    expect(popover).toBeInTheDocument()

    userEvent.unhover(termsAndConditions)

    await waitForElementToBeRemoved(() => screen.queryByText(popoverRegex))
    // expect(nullPopover).not.toBeInTheDocument() 
  })
})
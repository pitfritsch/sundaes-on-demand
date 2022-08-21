import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { OrderDetailsProvider } from '../../../contexts/OrderDetails'
import { renderWithContext } from '../../../test-utils/testing-library-utils'
import Options from '../Options'

test('update scoop subtotal when scoops change', async () => {
  render(<Options optionType='scoops' />, { wrapper: OrderDetailsProvider })

  const scoopsSubtotal = screen.getByText('Scoops total: $', {
    exact: false
  })
  expect(scoopsSubtotal).toHaveTextContent('$0.00')

  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla'
  })
  userEvent.clear(vanillaInput)
  userEvent.type(vanillaInput, '1')
  expect(scoopsSubtotal).toHaveTextContent('$2.00')

  const chocolateInput = await screen.findByRole('spinbutton', {
    name: 'Chocolate'
  })
  userEvent.clear(chocolateInput)
  userEvent.type(chocolateInput, '2')
  expect(scoopsSubtotal).toHaveTextContent('$6.00')
  
})

test('update toppings subtotal when toppings change', async () => {
  renderWithContext(<Options optionType='toppings' />)

  const toppingsSubtotal = screen.getByText('Toppings total: $', {
    exact: false
  })
  expect(toppingsSubtotal).toHaveTextContent('$0.00')

  const checkboxHF = await screen.findByRole('checkbox', { name: 'Hot fudge' })
  fireEvent.click(checkboxHF)
  expect(toppingsSubtotal).toHaveTextContent('$1.50')

  const checkboxMM = await screen.findByRole('checkbox', { name: 'M&Ms' })
  fireEvent.click(checkboxMM)
  expect(toppingsSubtotal).toHaveTextContent('$3.00')

  fireEvent.click(checkboxHF)
  expect(toppingsSubtotal).toHaveTextContent('$1.50')
})
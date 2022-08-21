import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { OrderDetailsProvider } from '../../../contexts/OrderDetails'
import { renderWithContext } from '../../../test-utils/testing-library-utils'
import Options from '../Options'
import OrderEntry from '../OrderEntry'

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

describe('grand total', () => {

  test('updates properly if scoops is added first', async () => {
    renderWithContext(<OrderEntry/>)
    const grandTotal = screen.getByRole('heading', {
      name: /grand total: \$/i
    })
    expect(grandTotal).toHaveTextContent('0.00')

    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla'
    })
    userEvent.clear(vanillaInput)
    userEvent.type(vanillaInput, '2')
    expect(grandTotal).toHaveTextContent('4.00')

    const mmCheckbox = await screen.findByRole('checkbox', {
      name: 'M&Ms'
    })
    userEvent.click(mmCheckbox)
    expect(grandTotal).toHaveTextContent('5.50')
  })

  test('updates properly if toppings is added first', async () => {
    renderWithContext(<OrderEntry/>)
    const grandTotal = screen.getByRole('heading', {
      name: /grand total: \$/i
    })

    const mmCheckbox = await screen.findByRole('checkbox', {
      name: 'M&Ms'
    })
    userEvent.click(mmCheckbox)
    expect(grandTotal).toHaveTextContent('1.50')

    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla'
    })
    userEvent.clear(vanillaInput)
    userEvent.type(vanillaInput, '2')
    expect(grandTotal).toHaveTextContent('5.50')
  })

  test('updates properly if item is removed', async () => {
    renderWithContext(<OrderEntry/>)
    const grandTotal = screen.getByRole('heading', {
      name: /grand total: \$/i
    })

    const mmCheckbox = await screen.findByRole('checkbox', {
      name: 'M&Ms'
    })
    userEvent.click(mmCheckbox)

    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla'
    })
    userEvent.clear(vanillaInput)
    userEvent.type(vanillaInput, '2')
    expect(grandTotal).toHaveTextContent('5.50')

    userEvent.clear(vanillaInput)
    userEvent.type(vanillaInput, '1')
    expect(grandTotal).toHaveTextContent('3.50')
    
    userEvent.click(mmCheckbox)
    expect(grandTotal).toHaveTextContent('2.00')
  })
})
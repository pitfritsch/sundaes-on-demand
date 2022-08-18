import {screen, render} from '@testing-library/react'
import { OrderDetailsProvider } from '../contexts/OrderDetails'

export function renderWithContext(ui, options){
  return render(ui, {
    wrapper: OrderDetailsProvider,
    ...options
  })
}
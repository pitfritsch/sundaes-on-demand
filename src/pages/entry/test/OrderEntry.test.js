import { screen, waitFor } from '@testing-library/react'
import { rest } from 'msw'
import { server } from '../../../mocks/server'
import { renderWithContext } from '../../../test-utils/testing-library-utils'
import OrderEntry from '../OrderEntry'

test('handle errors for scoops and topping routes', async () => {
  server.resetHandlers(
    rest.get('http://localhost:3030/scoops', (req, res, ctx) => 
      res(ctx.status(500))
    ),
    rest.get('http://localhost:3030/toppings', (req, res, ctx) => 
      res(ctx.status(500))
    )
  )

  renderWithContext(
    <OrderEntry/>
  )

  await waitFor(async () => {
    const alerts = await screen.findAllByRole('alert')
    expect(alerts).toHaveLength(2)
  })
})
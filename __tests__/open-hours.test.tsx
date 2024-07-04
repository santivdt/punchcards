import { render, screen, waitFor } from '@testing-library/react'
import OpenHours from '../app/(loggedIn)/dashboard/open-hours'

describe('open-hours', () => {
  it('shows open hours when there are open hours', async () => {
    render(<OpenHours openHours={5} />)

    await waitFor(() => {
      const number = screen.getByText('5')
      expect(number).toBeInTheDocument()
    })
  })

  it('shows no open hours when there are no open hours', async () => {
    render(<OpenHours openHours={0} />)

    await waitFor(() => {
      const message = screen.getByText('No open hours')
      expect(message).toBeInTheDocument()
    })
  })
})

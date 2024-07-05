import { render, screen, waitFor } from '@testing-library/react'
import ActiveCards from '../app/(loggedIn)/dashboard/active-cards'

describe('active-cards', () => {
  it('shows active cards when there are active cards', async () => {
    const cards = [
      {
        id: 'hefjjkfdhs',
        hours: 10,
        hours_left: 1,
        created_at: '2021-09-01T00:00:00.000Z',
        user_id: 'hefjjkfdhs',
        client_id: 'hefjjkfdhs',
        ends_at: '2021-09-01T00:00:00.000Z',
        is_active: true,
        readable_id: '2024001',
        price: 10,
        last_updated: '2021-09-01T00:00:00.000Z',
      },
    ]
    render(<ActiveCards cards={cards} />)

    await waitFor(() => {
      const number = screen.getByText('1')
      expect(number).toBeInTheDocument()
    })
  })

  it('shows no active cards when there are no active cards', async () => {
    render(<ActiveCards cards={[]} />)

    await waitFor(() => {
      const message = screen.getByText('No active cards')
      expect(message).toBeInTheDocument()
    })
  })
})

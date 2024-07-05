import { render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { DataTable } from '../app/(loggedIn)/hours/table'
import { columns } from '../app/(loggedIn)/hours/table/columns'
jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  useFormState: () => [{ state: { status: 'success' } }, jest.fn()],
}))
describe('table', () => {
  it('should render columns ', async () => {
    const data = [
      {
        card_id: '78r234rh',
        client_id: '5678',
        clients: [{ name: 'Maardij', id: 'fsdfsdfs' }],
        date: '12-01-2020',
        description: 'Work on app',
        duration: 12,
        id: 'sgsdgsdgdsgdsg',
        user_id: 'w43463wgweg',
        created_at: '12-01-2020',
      },
    ]
    render(<DataTable columns={columns} data={data} />)

    await waitFor(() => {
      const workOnApp = screen.getByText('Work on app')
      expect(workOnApp).not.toBeUndefined()
    })
  })
})

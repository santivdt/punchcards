import ClientsPage from '@/app/(loggedIn)/clients/page.tsx'
import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import fetchClientData from '../__mocks__/fetch-client-data'

jest.mock('../__mocks__/fetch-client-data', () => ({
  __esModule: true,
  default: jest.fn(),
}))

describe('Clients page renders with clients', () => {
  beforeEach(() => {
    fetchClientData.mockResolvedValue([
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
    ])
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('loads and displays data correctly', async () => {
    render(<ClientsPage />)

    await waitFor(() => {
      expect(screen.getByText('Item 1')).toBeInTheDocument(),
        expect(screen.getByText('Item 2')).toBeInTheDocument()
    })
  })

  it('renders a heading', () => {
    render(<ClientsPage />)

    const heading = screen.getByRole('heading', { level: 1 })

    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent('Clients')
  })
})

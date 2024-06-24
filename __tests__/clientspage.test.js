import ClientsPage from '@/app/(loggedIn)/clients/page.tsx'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

jest.mock('next/headers')

describe('Hero', () => {
  it('renders a heading', () => {
    render(<ClientsPage />)

    const heading = screen.getByRole('heading', { level: 1 })

    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent('Clients')
  })
})

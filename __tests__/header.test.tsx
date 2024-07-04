import Header from '@/components/header'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

describe('The header element', () => {
  it('renders a heading', () => {
    render(<Header title='Header Title' crumbs={false} />)

    const heading = screen.getByRole('heading', { level: 1 })

    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent('Header Title')
  })
})

import Hero from '@/app/(website)/components/hero'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

describe('Hero', () => {
  it('renders a heading', () => {
    render(<Hero />)

    const heading = screen.getByRole('heading', { level: 1 })

    expect(heading).toBeInTheDocument()
  })
})

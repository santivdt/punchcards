import Hero from '@/app/(public)/components/hero'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
jest.setTimeout(10000)
import { performance } from 'perf_hooks'

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt} />
  },
}))

describe('Hero', () => {
  it('renders a heading', () => {
    render(<Hero />)

    const heading = screen.getByRole('heading', { level: 1 })

    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent('Manage your prepaid hours with ease')
  })
})

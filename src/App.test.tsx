import { it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { App } from '@/App'

it('renders learn react link', () => {
  render(<App />)
  const linkElement = screen.getByText(/React dogs app/i)
  expect(linkElement).toBeInTheDocument()
})

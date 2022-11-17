import React from 'react'
import { render, screen } from '@testing-library/react'
import { MainLayout } from '@/components/layout/MainLayout'

describe('Components - Layouts - MainLayout', () => {
  test('should render child element', () => {
    const content = 'Test text'
    render(<MainLayout>{content}</MainLayout>)

    const layout = screen.getByText(content)

    expect(layout).toBeInTheDocument()
  })

  test('should contain title', () => {
    render(<MainLayout>Test</MainLayout>)

    const title = screen.getByText('React dogs app')

    expect(title).toBeInTheDocument()
  })
})

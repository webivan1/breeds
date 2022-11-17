import React from 'react'
import { screen, render } from '@testing-library/react'
import { ImageItem } from '@/components/breedImages/image/ImageItem'

describe('Components - Breed images - Image - ImageItem', () => {
  test('should render block with url', () => {
    const testImageUrl = 'http://example.com/image.jpeg'

    render(<ImageItem url={testImageUrl} />)

    const image = screen.getByTestId('image')

    expect(image).toBeInTheDocument()
    expect(image.getAttribute('style')).toContain(testImageUrl)
  })
})

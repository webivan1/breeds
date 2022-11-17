import React from 'react'
import { screen, render } from '@testing-library/react'
import { ImageList } from '@/components/breedImages/image/ImageList'

describe('Components - Breed images - Image - ImageList', () => {
  test('should render list of images', () => {
    const images = [
      'http://example.com/image1.jpeg',
      'http://example.com/image2.jpeg',
      'http://example.com/image3.jpeg',
      'http://example.com/image4.jpeg',
    ]

    render(<ImageList images={images} />)

    const elements = screen.getAllByTestId('image')

    expect(elements).toHaveLength(images.length)

    elements.forEach((element, index) => {
      expect(element.getAttribute('style')).toContain(images[index])
    })
  })
})

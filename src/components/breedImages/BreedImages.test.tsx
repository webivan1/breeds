import React from 'react'
import { act, render, RenderResult } from '@testing-library/react'
import { BreedImages } from '@/components/breedImages/BreedImages'
import { httpClient } from '@/services/httpClient'
import * as hook from '@/components/breedImages/useImages'

describe('Components - UI - Form - FieldSelect', () => {
  beforeEach(() => {
    jest.spyOn(httpClient, 'get').mockImplementation(() =>
      Promise.resolve({
        data: {
          message: {
            breed: [],
          },
        },
      })
    )
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  const createComponent = async () => {
    let component: RenderResult = {} as RenderResult

    await act(async () => {
      component = render(<BreedImages />)
    })

    return component
  }

  test('should contain form and no images', async () => {
    jest.spyOn(hook, 'useImages').mockImplementation(() => ({
      images: [],
      loading: false,
      fetchImages: async () => {},
    }))

    const { getByTestId, queryByTestId } = await createComponent()

    expect(getByTestId('form')).toBeInTheDocument()
    expect(queryByTestId('images')).not.toBeInTheDocument()
  })

  test('should contain form and loading images', async () => {
    jest.spyOn(hook, 'useImages').mockImplementation(() => ({
      images: [],
      loading: true,
      fetchImages: async () => {},
    }))

    const { getByTestId } = await createComponent()

    expect(getByTestId('form')).toBeInTheDocument()
    expect(getByTestId('loading')).toBeInTheDocument()
  })

  test('should contain form and some images', async () => {
    jest.spyOn(hook, 'useImages').mockImplementation(() => ({
      images: ['http://example.com/image.jpg'],
      loading: false,
      fetchImages: async () => {},
    }))

    const { getByTestId } = await createComponent()

    expect(getByTestId('form')).toBeInTheDocument()
    expect(getByTestId('images')).toBeInTheDocument()
  })
})

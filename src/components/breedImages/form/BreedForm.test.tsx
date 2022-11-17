import React from 'react'
import { render, act, RenderResult } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BreedForm } from '@/components/breedImages/form/BreedForm'
import { httpClient } from '@/services/httpClient'

const breedList = {
  message: {
    breed1: [],
    breed2: ['subbreed1', 'subbreed2'],
    breed3: [],
  },
}

describe('Components - Breed images - Form - BreedForm', () => {
  beforeAll(() => {
    jest.spyOn(httpClient, 'get').mockImplementation(() =>
      Promise.resolve({
        data: breedList,
      })
    )
  })

  afterAll(() => {
    jest.clearAllMocks()
  })

  const createComponent = async (handler: () => void, loading: boolean) => {
    let component: RenderResult = {} as RenderResult

    await act(async () => {
      component = render(
        <BreedForm onLoadImages={handler} imageLoading={loading} />
      )
    })

    return component
  }

  test('should render form and display list of breed', async () => {
    const { getByTestId, getByRole } = await createComponent(jest.fn(), false)

    const field = getByTestId('breed')

    expect(field).toBeInTheDocument()
    expect(Object.keys(breedList.message).length).toEqual(
      field.childNodes.length - 1
    )

    Object.keys(breedList.message).forEach((name) => {
      expect(getByRole('option', { name })).toBeInTheDocument()
    })
  })

  test('should select breed and subBreed field must be hidden', async () => {
    const { getByTestId, queryByTestId } = await createComponent(
      jest.fn(),
      false
    )

    const field = getByTestId('breed')

    userEvent.selectOptions(field, 'breed1')

    expect(queryByTestId('subBreed')).not.toBeInTheDocument()
  })

  test('should display a sub breed field', async () => {
    const { getByTestId } = await createComponent(jest.fn(), false)

    const field = getByTestId('breed')

    userEvent.selectOptions(field, 'breed2')

    expect(getByTestId('subBreed')).toBeInTheDocument()
  })

  test('should disable button when loading is active', async () => {
    const { getByTestId } = await createComponent(jest.fn(), true)

    const button = getByTestId('button')

    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('disabled')
    expect(button).toHaveTextContent('Loading...')
  })

  test('should display validation error', async () => {
    const { getByTestId } = await createComponent(jest.fn(), false)

    const button = getByTestId('button')

    await act(async () => userEvent.click(button))

    const breedField = getByTestId('breed')

    expect(breedField).toHaveClass('is-invalid')

    const quantityField = getByTestId('quantity')

    expect(quantityField).not.toHaveClass('is-invalid')
  })

  test('number of images must be more than 0 and less or equol then 50', async () => {
    const { getByTestId } = await createComponent(jest.fn(), false)

    // initial validation
    await act(async () => userEvent.click(getByTestId('button')))

    const checkField = async (value: string | number, valid: boolean) => {
      const quantityField = getByTestId('quantity') as HTMLInputElement

      quantityField.setSelectionRange(0, 100)

      await act(async () => {
        userEvent.type(quantityField, `{del}${value}`)
      })

      expect(quantityField).toHaveValue(String(value))

      if (valid) {
        expect(quantityField).not.toHaveClass('is-invalid')
      } else {
        expect(quantityField).toHaveClass('is-invalid')
      }
    }

    await checkField(0, false)
    await checkField('hello', false)
    await checkField(1, true)
    await checkField(10, true)
    await checkField('33check', false)
    await checkField(43, true)
    await checkField(50, true)
    await checkField(51, false)
  })

  test('should fetch images', async () => {
    const onLoadImages = jest.fn()

    const { getByTestId } = await createComponent(onLoadImages, false)

    await act(async () =>
      userEvent.selectOptions(getByTestId('breed'), 'breed2')
    )
    await act(async () =>
      userEvent.selectOptions(getByTestId('subBreed'), 'subbreed2')
    )
    await act(async () => userEvent.click(getByTestId('button')))

    expect(onLoadImages).toHaveBeenCalledTimes(1)
    expect(onLoadImages.mock.calls[0][0]).toEqual({
      breed: 'breed2',
      subBreed: 'subbreed2',
      quantity: 3,
    })
  })
})

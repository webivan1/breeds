import { vi } from 'vitest'
import { httpClient } from '@/services/httpClient'
import api from '@/api'

describe('Api request', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  test('should replace object of breed with array of breed for fetchBreedList', async () => {
    const mockResponse = {
      message: {
        breed1: [],
        breed2: ['subbreed1', 'subbreed2'],
        breed3: ['subbreed1'],
      },
    }

    // Mock http request
    vi.spyOn(httpClient, 'get').mockImplementation(() =>
      Promise.resolve({
        data: mockResponse,
      })
    )

    const breeds = await api.fetchBreedList()

    expect(httpClient.get).toHaveBeenCalledTimes(1)
    expect(Array.isArray(breeds)).toBeTruthy()
    expect(Object.keys(mockResponse.message).length).toBe(breeds.length)

    breeds.forEach(({ breed, subBreeds }) => {
      expect(mockResponse.message).toHaveProperty(breed)
      expect(
        mockResponse.message[breed as keyof typeof mockResponse.message]
      ).toEqual(subBreeds)
    })
  })

  test('should return array of images for fetchImages', async () => {
    const mockResponse = {
      message: ['http://image1.jpeg', 'http://image2.jpeg'],
    }
    const breed = 'breed-1'
    const subBreed = 'sub-breed-2'
    const quantity = 25

    // Mock http request
    vi.spyOn(httpClient, 'get').mockImplementation(() =>
      Promise.resolve({
        data: mockResponse,
      })
    )

    const images = await api.fetchImages(quantity, breed, subBreed)

    expect(httpClient.get).toHaveBeenCalledTimes(1)
    expect(mockResponse.message).toEqual(images)
    expect(httpClient.get).toHaveBeenCalledWith(
      `/breed/${breed}/${subBreed}/images/random/${quantity}`
    )
  })

  test('should not contain sub breed', async () => {
    const mockResponse = {
      message: ['http://image1.jpeg'],
    }
    const breed = 'breed-2'
    const quantity = 10

    // Mock http request
    vi.spyOn(httpClient, 'get').mockImplementation(() =>
      Promise.resolve({
        data: mockResponse,
      })
    )

    const checkEmptyValues = async (value: string | undefined) => {
      await api.fetchImages(quantity, breed, value)
      expect(httpClient.get).toHaveBeenCalledWith(
        `/breed/${breed}/images/random/${quantity}`
      )
    }

    await checkEmptyValues('')
    await checkEmptyValues(undefined)
  })
})

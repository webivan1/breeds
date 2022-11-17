import { httpClient } from '@/services/httpClient'
import { BreedType } from '@/api/types/BreedType'
import { BreedsResponseType } from '@/api/types/BreedsResponseType'
import { ImagesResponseType } from '@/api/types/ImagesResponseType'

export const fetchBreedList = async (): Promise<BreedType[]> => {
  const { data } = await httpClient.get<BreedsResponseType>('/breeds/list/all')

  return Object.keys(data?.message ?? {}).map((breed) => ({
    breed,
    subBreeds: data.message[breed] ?? [],
  }))
}

export const fetchImages = async (
  quantity: number,
  breed: string,
  subBreed?: string
): Promise<string[]> => {
  const subBreedSegment = subBreed ? `${subBreed}/` : ''
  const url = `/breed/${breed}/${subBreedSegment}images/random/${quantity}`

  const { data } = await httpClient.get<ImagesResponseType>(url)

  return data?.message ?? []
}

export default { fetchBreedList, fetchImages }

import { AxiosError } from 'axios'
import api from '@/api'
import { useState } from 'react'
import { BreedFormType } from '@/components/breedImages/types/BreedFormType'

export const useImages = () => {
  const [images, setImages] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | undefined>(undefined)

  const fetchImages = async ({ breed, subBreed, quantity }: BreedFormType) => {
    setLoading(true)
    try {
      setImages(await api.fetchImages(quantity, breed, subBreed))
      setError(undefined)
    } catch (err) {
      setError((err as AxiosError).message)
    } finally {
      setLoading(false)
    }
  }

  return { images, loading, fetchImages, error }
}

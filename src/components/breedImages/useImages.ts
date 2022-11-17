import api from '@/api'
import { useState } from 'react'
import { BreedFormType } from '@/components/breedImages/types/BreedFormType'

export const useImages = () => {
  const [images, setImages] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  // @todo add [error, setError] = useState<string|undefined>(undefined)

  const fetchImages = async ({ breed, subBreed, quantity }: BreedFormType) => {
    setLoading(true)
    // @todo add `try catch` to protect the request and display a proper error message to a client
    setImages(await api.fetchImages(quantity, breed, subBreed))
    setLoading(false)
  }

  return { images, loading, fetchImages }
}

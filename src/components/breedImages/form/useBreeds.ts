import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import api from '@/api'
import { BreedType } from '@/api/types/BreedType'

export const useBreeds = () => {
  const [breeds, setBreeds] = useState<BreedType[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | undefined>(undefined)

  useEffect(() => {
    setLoading(true)
    ;(async () => {
      try {
        setBreeds(await api.fetchBreedList())
      } catch (err) {
        setError((err as AxiosError).message)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  return { breeds, loading, error }
}

import { useEffect, useState } from 'react'
import api from '@/api'
import { BreedType } from '@/api/types/BreedType'

export const useBreeds = () => {
  const [breeds, setBreeds] = useState<BreedType[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  // @todo add [error, setError] = useState<string|undefined>(undefined)

  useEffect(() => {
    setLoading(true)
    // @todo here must be `try catch` to catch any error from server
    api
      .fetchBreedList()
      .then(setBreeds)
      .finally(() => setLoading(false))
  }, [])

  return { breeds, loading }
}

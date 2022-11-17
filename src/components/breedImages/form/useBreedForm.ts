import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { BreedFormType } from '@/components/breedImages/types/BreedFormType'
import { BreedType } from '@/api/types/BreedType'

export const useBreedForm = (breeds: BreedType[]) => {
  const [subBreeds, setSubBreeds] = useState<string[]>([])

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<BreedFormType>({
    defaultValues: {
      breed: '',
      subBreed: undefined,
      // set default number of images
      quantity: 3,
    },
  })

  useEffect(() => {
    const selectBreed = breeds.find(({ breed }) => breed === watch('breed'))

    if (selectBreed) {
      setSubBreeds(selectBreed.subBreeds)
    }

    // reset subBreed when breed is changed
    setValue('subBreed', undefined)
  }, [watch('breed')])

  return { subBreeds, register, handleSubmit, errors }
}

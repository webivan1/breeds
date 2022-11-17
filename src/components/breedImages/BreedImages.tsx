import React, { FC } from 'react'
import { Spinner } from 'react-bootstrap'
import { useImages } from '@/components/breedImages/useImages'
import { BreedForm } from '@/components/breedImages/form/BreedForm'
import { ImageList } from '@/components/breedImages/image/ImageList'

export const BreedImages: FC = () => {
  const { images, loading, fetchImages } = useImages()

  return (
    <>
      <BreedForm onLoadImages={fetchImages} imageLoading={loading} />

      {loading ? (
        <Spinner data-testid="loading" animation="border" />
      ) : images.length > 0 ? (
        <ImageList images={images} />
      ) : null}
    </>
  )
}

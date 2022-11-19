import React, { FC } from 'react'
import { Form, Button, Row, Col, Alert } from 'react-bootstrap'
import { useBreeds } from '@/components/breedImages/form/useBreeds'
import { BreedFormType } from '@/components/breedImages/types/BreedFormType'
import { useBreedForm } from '@/components/breedImages/form/useBreedForm'
import { FieldSelect } from '@/components/ui/form/FieldSelect'
import { FieldText } from '@/components/ui/form/FieldText'

type PropType = {
  onLoadImages: (data: BreedFormType) => void
  imageLoading: boolean
}

export const BreedForm: FC<PropType> = ({ onLoadImages, imageLoading }) => {
  const { breeds, loading: breedLoading, error } = useBreeds()
  const { subBreeds, register, handleSubmit, errors } = useBreedForm(breeds)

  const loading = breedLoading || imageLoading

  if (error) {
    return (
      <Alert variant="danger">Error: {error} (Try to reload the page)</Alert>
    )
  }

  return (
    <Form data-testid="form" noValidate onSubmit={handleSubmit(onLoadImages)}>
      <Row className="align-items-end">
        <Col sm={3}>
          <FieldSelect
            id="breed"
            label="Breed"
            isInvalid={!!errors.breed}
            register={register('breed', { required: true })}
          >
            {breeds.map(({ breed }) => (
              <option data-testid="option" key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </FieldSelect>
        </Col>

        {subBreeds.length > 0 && (
          <Col sm={3}>
            <FieldSelect
              id="subBreed"
              label="Sub breed"
              isInvalid={!!errors.subBreed}
              register={register('subBreed')}
            >
              {subBreeds.map((breed: string) => (
                <option data-testid="option" key={breed} value={breed}>
                  {breed}
                </option>
              ))}
            </FieldSelect>
          </Col>
        )}

        <Col sm={3}>
          <FieldText
            id="quantity"
            type="text"
            label="Number of images"
            defaultValue={3}
            isInvalid={!!errors.quantity}
            register={register('quantity', {
              required: true,
              pattern: /^\d+$/,
              min: 1,
              max: 50,
            })}
          />
        </Col>

        <Col>
          <Button data-testid="button" disabled={loading} type="submit">
            {loading ? 'Loading...' : 'View images'}
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

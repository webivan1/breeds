import React, { FC, HTMLInputTypeAttribute } from 'react'
import { Form } from 'react-bootstrap'
import { UseFormRegisterReturn } from 'react-hook-form'

type PropType = {
  id: string
  type: HTMLInputTypeAttribute
  label: string
  isInvalid?: boolean
  register: UseFormRegisterReturn
  defaultValue?: string | number
}

export const FieldText: FC<PropType> = ({
  id,
  type,
  label,
  isInvalid = false,
  register,
  defaultValue = '',
}) => (
  <Form.Group className="mb-3 mb-sm-0">
    <Form.Label htmlFor={id}>{label}</Form.Label>
    <Form.Control
      data-testid={id}
      type={type}
      id={id}
      defaultValue={defaultValue}
      isInvalid={isInvalid}
      {...register}
    />
  </Form.Group>
)

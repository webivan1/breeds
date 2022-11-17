import React, { FC, ReactNode } from 'react'
import { Form } from 'react-bootstrap'
import { UseFormRegisterReturn } from 'react-hook-form'

type PropType = {
  id: string
  label: string
  isInvalid?: boolean
  register: UseFormRegisterReturn
  children: ReactNode[] | ReactNode
}

export const FieldSelect: FC<PropType> = ({
  id,
  label,
  isInvalid = false,
  register,
  children,
}) => (
  <Form.Group className="mb-3 mb-sm-0">
    <Form.Label htmlFor={id}>{label}</Form.Label>
    <Form.Select data-testid={id} id={id} isInvalid={isInvalid} {...register}>
      <option value="">Select</option>
      {children}
    </Form.Select>
  </Form.Group>
)

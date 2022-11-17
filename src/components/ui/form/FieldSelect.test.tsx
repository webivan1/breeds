import React from 'react'
import { render, screen } from '@testing-library/react'
import { FieldSelect } from '@/components/ui/form/FieldSelect'
import { UseFormRegisterReturn } from 'react-hook-form'

describe('Components - UI - Form - FieldSelect', () => {
  test('should render select field with label', () => {
    const id = 'test'
    const label = 'This is the label'

    render(
      <FieldSelect id={id} label={label} register={{} as UseFormRegisterReturn}>
        <option>1</option>
        <option>2</option>
      </FieldSelect>
    )

    const field = screen.getByText(label)

    expect(field).toBeInTheDocument()
    expect(field).toHaveAttribute('for', id)

    const input = screen.getByTestId(id)

    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('id', id)
    expect(input).not.toHaveClass('is-invalid')
    expect(input.childElementCount).toBe(3)
  })

  test('should have an error class', () => {
    const id = 'test'

    render(
      <FieldSelect
        id={id}
        label="Label"
        isInvalid={true}
        register={{} as UseFormRegisterReturn}
      >
        <option>1</option>
      </FieldSelect>
    )

    const input = screen.getByTestId(id)

    expect(input).toBeInTheDocument()
    expect(input).toHaveClass('is-invalid')
  })
})

import React from 'react'
import { render, screen } from '@testing-library/react'
import { FieldText } from '@/components/ui/form/FieldText'
import { UseFormRegisterReturn } from 'react-hook-form'

describe('Components - UI - Form - FieldText', () => {
  test('should render text field with label', () => {
    const id = 'test'
    const label = 'This is the label'

    render(
      <FieldText
        id={id}
        type="text"
        label={label}
        register={{} as UseFormRegisterReturn}
      />
    )

    const field = screen.getByText(label)

    expect(field).toBeInTheDocument()
    expect(field).toHaveAttribute('for', id)

    const input = screen.getByTestId(id)

    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('id', id)
    expect(input).toHaveAttribute('type', 'text')
    expect(input).not.toHaveClass('is-invalid')
  })

  test('should have an error class', () => {
    const id = 'test'

    render(
      <FieldText
        id={id}
        type="text"
        label="Test label"
        isInvalid={true}
        register={{} as UseFormRegisterReturn}
      />
    )

    const input = screen.getByTestId(id)

    expect(input).toBeInTheDocument()
    expect(input).toHaveClass('is-invalid')
  })
})

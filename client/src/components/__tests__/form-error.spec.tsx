import React from 'react'
import { render } from '@testing-library/react'
import FormError from '../error/FormError'

it('check render with props', () => {
  const { getByText } = render(<FormError errorMessage={'error!!!'} />)
  getByText('error!!!')
})

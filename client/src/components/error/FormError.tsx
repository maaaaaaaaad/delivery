import React from 'react'

interface IFormErrorProps {
  errorMessage: string
}

const FormError: React.FC<IFormErrorProps> = ({ errorMessage }) => (
  <span>{errorMessage}</span>
)

export default FormError

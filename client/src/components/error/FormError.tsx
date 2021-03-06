import React from 'react'

interface ErrorMessageProp {
  errorMessage: string
}

const FormError: React.FC<ErrorMessageProp> = ({ errorMessage }) => {
  return (
    <div className="text-red-500 font-semibold text-sm center">
      {errorMessage}
    </div>
  )
}

export default FormError

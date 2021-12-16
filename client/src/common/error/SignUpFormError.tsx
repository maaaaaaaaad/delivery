import React from 'react'

interface ErrorMessageProp {
  errorMessage: string
}

const SignUpFormError: React.FC<ErrorMessageProp> = ({ errorMessage }) => {
  return (
    <div className="text-red-800 font-semibold text-sm center">
      {errorMessage}
    </div>
  )
}

export default SignUpFormError

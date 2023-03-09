import React from 'react'

interface ErrorMessageProps {
  error?: string | null
}
const ErrorMessage: React.FC<ErrorMessageProps> = ({ error = '' }) => {
  return <small className="mt-2 block text-red-800">{error}</small>
}

export default ErrorMessage

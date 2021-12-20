import React from 'react'

interface LoadingText {
  title: string
  description: string
  message: string
}

const FormLoading: React.FC<LoadingText> = ({
  title,
  description,
  message,
}) => {
  return (
    <section className="w-full h-screen center bg-black">
      <div className="center flex-col w-1/2 h-1/2 bg-white rounded-2xl">
        <article className="font-bold text-5xl text-green-500 p-5">
          {title}
        </article>
        <article className="font-medium text-2xl tracking-widest p-5">
          Loading...
        </article>
        <article className="font-medium pt-5">{description}</article>
        <article className="font-medium">{message}</article>
      </div>
    </section>
  )
}

export default FormLoading

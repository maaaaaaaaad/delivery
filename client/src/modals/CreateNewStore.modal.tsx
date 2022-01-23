import React from 'react'

const CreateNewStoreModal = () => {
  return (
    <section className="absolute top-0 left-0 w-screen h-screen center bg-black bg-opacity-60 z-50">
      <div className="h-1/2 w-1/2 bg-white rounded-2xl center">
        <div className="w-full h-full">
          <article>CREATE NEW STORE</article>
          <form>
            <input type="text" placeholder="Store name" />
          </form>
        </div>
      </div>
    </section>
  )
}

export default CreateNewStoreModal

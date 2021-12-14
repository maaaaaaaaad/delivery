import React from 'react'
import { render } from '@testing-library/react'
import Header from '../../pages/Header'
import { MockedProvider } from '@apollo/client/testing'

describe('Header', () => {
  it('render test for header', () => {
    render(
      <MockedProvider>
        <Header />
      </MockedProvider>,
    )
  })
})

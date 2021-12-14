import React from 'react'
import { render, RenderResult, wait, waitFor } from '@testing-library/react'
import SignIn from '../../pages/SignIn'
import { ApolloProvider } from '@apollo/client'
import { createMockClient } from 'mock-apollo-client'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'

describe('Sign in', () => {
  let renderResult: RenderResult

  beforeEach(async () => {
    await waitFor(() => {
      const mockClient = createMockClient()
      renderResult = render(
        <BrowserRouter>
          <HelmetProvider>
            <ApolloProvider client={mockClient}>
              <SignIn />
            </ApolloProvider>
          </HelmetProvider>
        </BrowserRouter>,
      )
    })
  })

  it('should render sign in', async () => {
    await waitFor(() => {
      expect(document.title).toBe('Sign In')
    })
  })

  it('display account id validation error', async () => {
    const { getByPlaceholderText, debug } = renderResult
    const accountId = getByPlaceholderText('account id')

    await waitFor(() => {
      userEvent.type(accountId, '1')
    })

    await waitFor(() => {
      userEvent.clear(accountId)
    })
    debug()
  })
})

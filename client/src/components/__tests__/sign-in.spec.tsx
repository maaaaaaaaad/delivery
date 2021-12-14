import React from 'react'
import { render, wait, waitFor } from '@testing-library/react'
import SignIn from '../../pages/SignIn'
import { ApolloProvider } from '@apollo/client'
import { createMockClient } from 'mock-apollo-client'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'

describe('Sign in', () => {
  beforeEach(async () => {
    await waitFor(() => {
      const mockClient = createMockClient()
      render(
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
})

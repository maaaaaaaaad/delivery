import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/App'
import reportWebVitals from './reportWebVitals'
import { HelmetProvider } from 'react-helmet-async'
import { ApolloProvider } from '@apollo/client'
import { client } from './apollo'
import { SnackbarProvider } from 'notistack'

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <HelmetProvider>
        <SnackbarProvider
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <App />
        </SnackbarProvider>
      </HelmetProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)

reportWebVitals()

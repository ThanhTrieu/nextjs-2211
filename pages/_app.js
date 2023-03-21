import { useState, useEffect } from 'react'
import Router from 'next/router'
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import 'antd/dist/reset.css'
import 'nprogress/nprogress.css'
import '@/styles/globals.css'

import NProgress from 'nprogress'

export default function App({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient())

  useEffect(() => {
    Router.events.on('routeChangeStart', (url) => {
      NProgress.start()
    })

    Router.events.on('routeChangeComplete', (url) => {
      NProgress.done(false)
    })

    Router.events.on('routeChangeError', (url) => {
      NProgress.done(false)
    })

  }, [Router])

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </Hydrate>
      <ReactQueryDevtools/>
    </QueryClientProvider>
  )
}
